/**
 * Type definitions for the LLM chat application.
 */

export interface Env {
	/**
	 * Binding for the Workers AI API.
	 */
	AI: Ai;

	/**
	 * Binding for static assets.
	 */
	ASSETS: {
		fetch: (request: Request) => Promise<Response>;
	};

	/**
	 * Rate limiter for individual visitors.
	 */
	CHAT_CLIENT_RATE_LIMITER: RateLimit;

	/**
	 * Broader rate limiter for the portfolio chatbot.
	 */
	CHAT_GLOBAL_RATE_LIMITER: RateLimit;
}

/**
 * Represents a chat message.
 */
export interface ChatMessage {
	role: "system" | "user" | "assistant";
	content: string;
}
