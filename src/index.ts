/**
 * LLM Chat Application Template
 *
 * Portfolio assistant using Cloudflare Workers AI.
 *
 * @license MIT
 */

import { Env, ChatMessage } from "./types";

import assistantRules from "../docs/assistant-rules.md";
import portfolioContext from "../docs/portfolio-context.md";

// --------------------------------------------------
// CONFIGURATION
// --------------------------------------------------

const MODEL_ID = "@cf/meta/llama-3.1-8b-instruct-fp8";

const MAX_BODY_SIZE = 12_000;
const MAX_MESSAGES = 10;
const MAX_MESSAGE_LENGTH = 750;

const ALLOWED_ORIGINS = [
	"https://marvinsilverio.vercel.app",

	// Local development
	"http://localhost:5173",
	"http://127.0.0.1:5173",
];


// --------------------------------------------------
// ASSISTANT PROMPT
// --------------------------------------------------


const FULL_SYSTEM_PROMPT = `
${assistantRules}

PORTFOLIO KNOWLEDGE:

${portfolioContext}
`;


// --------------------------------------------------
// MAIN WORKER
// --------------------------------------------------

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext,
	): Promise<Response> {

		const url = new URL(request.url);


		// ----------------------------------------------
		// STATIC FRONTEND
		// ----------------------------------------------

		if (
			url.pathname === "/" ||
			!url.pathname.startsWith("/api/")
		) {
			return env.ASSETS.fetch(request);
		}


		// ----------------------------------------------
		// CHAT API
		// ----------------------------------------------

		if (url.pathname === "/api/chat") {

			// CORS preflight
			if (request.method === "OPTIONS") {

				if (!isOriginAllowed(request)) {
					return new Response(null, {
						status: 403,
					});
				}

				return new Response(null, {
					status: 204,
					headers: getCorsHeaders(request),
				});
			}


			// Actual chat request
			if (request.method === "POST") {

				if (!isOriginAllowed(request)) {
					return jsonError(
						"Origin not allowed.",
						403,
						request,
					);
				}

				/*
					Rate limiting is intentionally NOT performed here.

					We first validate the request inside
					handleChatRequest() so malformed requests do not
					consume rate-limit counters.
				*/
				return handleChatRequest(request, env);
			}


			// Everything except POST / OPTIONS
			return new Response(
				"Method not allowed",
				{
					status: 405,
					headers: getCorsHeaders(request),
				},
			);
		}


		// Unknown API route
		return new Response(
			"Not found",
			{
				status: 404,
			},
		);
	},

} satisfies ExportedHandler<Env>;


// --------------------------------------------------
// CHAT REQUEST HANDLER
// --------------------------------------------------

async function handleChatRequest(
	request: Request,
	env: Env,
): Promise<Response> {

	// ----------------------------------------------
	// 1. CONTENT TYPE
	// ----------------------------------------------

	const contentType =
		request.headers.get("Content-Type") ?? "";

	if (
		!contentType
			.toLowerCase()
			.startsWith("application/json")
	) {
		return jsonError(
			"Content-Type must be application/json.",
			415,
			request,
		);
	}


	try {

		// ----------------------------------------------
		// 2. READ RAW BODY
		// ----------------------------------------------

		let rawBody: string;

		try {
			rawBody = await request.text();
		} catch {
			return jsonError(
				"Unable to read request body.",
				400,
				request,
			);
		}


		// ----------------------------------------------
		// 3. BODY SIZE LIMIT
		// ----------------------------------------------

		const bodySize =
			new TextEncoder().encode(rawBody).length;

		if (bodySize > MAX_BODY_SIZE) {
			return jsonError(
				`Request body cannot exceed ${MAX_BODY_SIZE} bytes.`,
				413,
				request,
			);
		}


		// ----------------------------------------------
		// 4. PARSE JSON
		// ----------------------------------------------

		let body: unknown;

		try {
			body = JSON.parse(rawBody);
		} catch {
			return jsonError(
				"Request body must contain valid JSON.",
				400,
				request,
			);
		}


		// ----------------------------------------------
		// 5. VALIDATE TOP-LEVEL BODY
		// ----------------------------------------------

		if (
			typeof body !== "object" ||
			body === null ||
			!("messages" in body)
		) {
			return jsonError(
				"Request body must contain a messages array.",
				400,
				request,
			);
		}


		const { messages } = body as {
			messages: unknown;
		};


		// ----------------------------------------------
		// 6. VALIDATE MESSAGES ARRAY
		// ----------------------------------------------

		if (!Array.isArray(messages)) {
			return jsonError(
				"messages must be an array.",
				400,
				request,
			);
		}


		if (messages.length === 0) {
			return jsonError(
				"messages cannot be empty.",
				400,
				request,
			);
		}


		if (messages.length > MAX_MESSAGES) {
			return jsonError(
				`Conversation cannot exceed ${MAX_MESSAGES} messages.`,
				400,
				request,
			);
		}


		// ----------------------------------------------
		// 7. VALIDATE INDIVIDUAL MESSAGES
		// ----------------------------------------------

		const safeMessages: ChatMessage[] = [];

		for (const message of messages) {

			if (
				typeof message !== "object" ||
				message === null
			) {
				return jsonError(
					"Each message must be an object.",
					400,
					request,
				);
			}


			const { role, content } = message as {
				role?: unknown;
				content?: unknown;
			};


			/*
				Client may only send user/assistant roles.

				System prompts are owned exclusively by the Worker.
			*/
			if (
				role !== "user" &&
				role !== "assistant"
			) {
				return jsonError(
					"Message role must be user or assistant.",
					400,
					request,
				);
			}


			if (typeof content !== "string") {
				return jsonError(
					"Message content must be a string.",
					400,
					request,
				);
			}


			const trimmedContent = content.trim();


			if (trimmedContent.length === 0) {
				return jsonError(
					"Message content cannot be empty.",
					400,
					request,
				);
			}


			if (
				trimmedContent.length >
				MAX_MESSAGE_LENGTH
			) {
				return jsonError(
					`Each message cannot exceed ${MAX_MESSAGE_LENGTH} characters.`,
					400,
					request,
				);
			}


			safeMessages.push({
				role,
				content: trimmedContent,
			});
		}


		// ----------------------------------------------
		// 8. RATE LIMIT
		// ----------------------------------------------

		/*
			Important:

			Only valid chat requests reach the rate limiter.

			This prevents malformed JSON, invalid roles,
			empty messages, etc. from unnecessarily consuming
			the AI abuse-protection quota.
		*/

		const rateLimitResponse =
			await checkChatRateLimit(request, env);

		if (rateLimitResponse) {
			return rateLimitResponse;
		}


		// ----------------------------------------------
		// 9. BACKEND-OWNED SYSTEM PROMPT
		// ----------------------------------------------

		safeMessages.unshift({
			role: "system",
			content: FULL_SYSTEM_PROMPT,
		});


		// ----------------------------------------------
		// 10. PREPARE AI INPUT
		// ----------------------------------------------

		const inputs = {
			messages: safeMessages,
			max_tokens: 256,
			stream: true,
		} satisfies AiTextGenerationInput & {
			stream: true;
		};


		// ----------------------------------------------
		// 11. CALL WORKERS AI
		// ----------------------------------------------

		const stream =
			await env.AI.run<typeof MODEL_ID>(
				MODEL_ID,
				inputs,
			);


		// ----------------------------------------------
		// 12. RETURN SSE STREAM
		// ----------------------------------------------

		return new Response(stream, {
			headers: {
				"content-type":
					"text/event-stream; charset=utf-8",

				"cache-control": "no-cache",

				connection: "keep-alive",

				...getCorsHeaders(request),
			},
		});


	} catch (error) {

		console.error(
			"Error processing chat request:",
			error,
		);

		return jsonError(
			"Failed to process request.",
			500,
			request,
		);
	}
}


// --------------------------------------------------
// RATE LIMITING
// --------------------------------------------------

async function checkChatRateLimit(
	request: Request,
	env: Env,
): Promise<Response | null> {

	/*
		Cloudflare provides the visitor IP when running
		through its network.

		The fallback is mainly useful during local/manual
		development environments where the Cloudflare
		header may not exist.
	*/
	const clientIp =
		request.headers.get("CF-Connecting-IP") ??
		"local-development";


	// ----------------------------------------------
	// PER-CLIENT LIMIT
	// ----------------------------------------------

	const clientResult =
		await env.CHAT_CLIENT_RATE_LIMITER.limit({
			key: `chat-client:${clientIp}`,
		});


	if (!clientResult.success) {
		return jsonError(
			"Too many requests. Please wait a moment and try again.",
			429,
			request,
		);
	}


	// ----------------------------------------------
	// BROADER CHATBOT LIMIT
	// ----------------------------------------------

	const globalResult =
		await env.CHAT_GLOBAL_RATE_LIMITER.limit({
			key: "portfolio-chat",
		});


	if (!globalResult.success) {
		return jsonError(
			"M is a little busy right now. Please try again shortly.",
			429,
			request,
		);
	}


	return null;
}


// --------------------------------------------------
// JSON ERROR HELPER
// --------------------------------------------------

function jsonError(
	message: string,
	status: number,
	request?: Request,
): Response {

	return new Response(
		JSON.stringify({
			error: message,
		}),
		{
			status,

			headers: {
				"content-type": "application/json",

				...(request
					? getCorsHeaders(request)
					: {}),
			},
		},
	);
}


// --------------------------------------------------
// CORS
// --------------------------------------------------

function getCorsHeaders(
	request: Request,
): Record<string, string> {

	const origin =
		request.headers.get("Origin");


	if (!origin) {
		return {};
	}


	const workerOrigin =
		new URL(request.url).origin;


	const allowed =
		origin === workerOrigin ||
		ALLOWED_ORIGINS.includes(origin);


	if (!allowed) {
		return {};
	}


	return {
		"Access-Control-Allow-Origin": origin,

		"Access-Control-Allow-Methods":
			"POST, OPTIONS",

		"Access-Control-Allow-Headers":
			"Content-Type",

		"Vary": "Origin",
	};
}


// --------------------------------------------------
// ORIGIN VALIDATION
// --------------------------------------------------

function isOriginAllowed(
	request: Request,
): boolean {

	const origin =
		request.headers.get("Origin");


	/*
		Requests without an Origin header may come from:

		- curl
		- server-to-server clients
		- API testing tools

		CORS is a browser security mechanism, so those requests
		are allowed through this specific check.
	*/
	if (!origin) {
		return true;
	}


	const workerOrigin =
		new URL(request.url).origin;


	return (
		origin === workerOrigin ||
		ALLOWED_ORIGINS.includes(origin)
	);
}
