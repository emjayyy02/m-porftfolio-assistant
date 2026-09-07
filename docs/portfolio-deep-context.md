# Marvin Silverio — Deeper Portfolio Context

This file contains approved technical context M may use when a visitor asks for deeper explanations, comparisons, architecture, or project reasoning.

Current public facts such as project titles, summaries, technologies, certifications, education, and professional role come from the generated portfolio knowledge file.

Do not invent experience, employment, clients, metrics, revenue, results, or personal information not documented in approved portfolio knowledge.

# Personal Developer Portfolio and M

The portfolio includes M, a custom AI portfolio assistant.

M's architecture:

Portfolio React frontend → Cloudflare Worker API → Cloudflare Workers AI → streamed response back to the interface.

Important architecture:
- The React frontend sends chat requests to a Cloudflare Worker API.
- The Worker owns the system instructions and portfolio knowledge.
- Visitors cannot provide or override the system role.
- Recent conversation history is included so follow-up questions retain context.
- Responses stream back to the frontend rather than waiting for one complete response.
- Runtime validation limits request body size, conversation length, message length, and allowed roles.
- CORS uses an allowlist rather than allowing arbitrary origins.
- Per-visitor and broader chatbot rate limiting protect the endpoint from excessive use.
- The frontend supports request timeouts, retry UX, partial-stream preservation, and error handling.
- Internal instructions and portfolio knowledge stay on the Worker instead of being exposed in browser code.

Best evidence:
- modern web and AI integration
- frontend/backend separation
- streamed AI responses
- API hardening
- reliability-focused implementation

# NovaTech Solutions

This is a fictional frontend and business-presentation project.

Important context:
- The project practices complete marketing-page structure rather than only a hero section.
- The layout is responsive and designed around a clear conversion path.
- The page includes service positioning, process explanation, pricing comparison, FAQs, testimonials, and contact interaction.
- Testimonials, pricing, companies, and business claims belong to the fictional exercise and are not evidence of real customers or commercial results.
- The contact experience is frontend-only and does not represent a production lead-processing system.

Best evidence:
- responsive frontend fundamentals
- business-oriented web presentation
- conversion-focused page structure
- interaction design

# Workflow Operations Manager

Important architecture:
- Projects and their nested tasks form the application's primary data model.
- Project progress, task totals, overdue state, dashboard values, calendar entries, and reports are derived from shared underlying data instead of being maintained as separate competing values.
- CRUD operations update the shared application state and dependent views.
- Search, filtering, and sorting operate on display copies instead of mutating the source data.
- Local Storage persists application data and user preferences across sessions.
- The application uses modular JavaScript rather than one large script.
- Calendar and reporting views are projections of operational data, not separate datastores.
- Keyboard workflows include guarded shortcuts so normal text input is not hijacked.

Best evidence:
- JavaScript application architecture
- shared application state
- CRUD logic
- derived state
- DOM-driven interfaces
- local persistence
- modular frontend organization

This project is more focused on frontend application logic than workflow automation.

# Invoice Collections Automation

Core flow:

Invoice event → normalization → validation → duplicate prevention → collection scoring → priority assignment → persistence → routing → notifications → HTTP delivery → success/failure detection → bounded retry → final failure handling → technical error logging.

Important architecture:
- Incoming invoice data is normalized and validated before downstream business logic runs.
- Invalid business input is separated from accepted invoice records.
- Existing invoice IDs are checked before side effects to reduce duplicate processing.
- Valid invoices receive a deterministic collection score based on business fields such as amount, account tier, and payment terms.
- Scores determine LOW, MEDIUM, or HIGH collection priority.
- Priority affects finance routing and notification behavior.
- Accepted invoice data is persisted before external HTTP delivery.
- Persistence and delivery are separate concerns, so a downstream outage does not erase an already accepted invoice.
- Temporary HTTP failures can enter a bounded retry path.
- Retry behavior includes eligibility checks, delay, success exit, retry counting, and a hard limit.
- Non-retryable failures and exhausted retries enter final failure handling.
- Technical and integration failures are logged separately from invalid business input.

Best evidence:
- workflow validation
- deterministic business rules
- idempotency
- priority routing
- persistence
- bounded retries
- failure handling
- API and business-tool integrations

# AI Support Operations Triage System

Core flow:

Classify → Validate → Review → Route → Draft

Important architecture:
- Customer messages are treated as untrusted input.
- The AI interprets language but does not own consequential workflow decisions.
- Classification produces structured fields such as category, summary, requested action, urgency, and interpretation-level review state.
- Structured output is validated again with deterministic logic before business routing trusts it.
- Invalid or malformed AI output enters a separate fallback path instead of continuing into normal routing.
- AI uncertainty and business-required human review are treated as separate concepts.
- Deterministic review rules can require human review even when the classifier considers the request clear.
- Examples include refund-related requests, account-security concerns, high urgency, ambiguity, and unsupported categories.
- Sensitive policy decisions stay outside the AI prompt when deterministic rules provide stronger control.
- Valid tickets are routed to an appropriate operational queue.
- Draft replies use processed ticket context but are constrained from claiming unverified actions.
- Drafting rules prevent invented refunds, investigations, fixes, escalations, prices, policies, timelines, or internal routing details.
- Prompt-injection and adversarial ticket cases are included in evaluation.
- Fixed benchmark testing is used to compare classifier behavior instead of judging only convincing individual examples.

Best evidence:
- AI-assisted automation
- structured model outputs
- deterministic validation
- hybrid AI and rules architecture
- human-review policy
- defensive handling of untrusted input
- evaluation and failure-path thinking

# Project Selection Guide

If a visitor asks what to inspect first:

- JavaScript application architecture: Workflow Operations Manager
- n8n automation and workflow reliability: Invoice Collections Automation
- AI-assisted automation and deterministic controls: AI Support Operations Triage System
- modern web plus AI integration: M / Personal Developer Portfolio

# Evidence Boundaries

Prefer evidence-based descriptions.

Good:
"He's used n8n in workflows involving validation, routing, retries, and integrations."

Avoid:
"He's an expert n8n engineer."

Good:
"Invoice Collections Automation is one of his stronger automation projects because it goes beyond basic trigger-action logic."

Avoid:
"It's an enterprise-grade financial platform."

Good:
"His projects show growing systems thinking."

Avoid:
"He has years of professional systems-engineering experience."

When discussing benchmark results, prototypes, fictional projects, or portfolio-scale systems, preserve those boundaries instead of presenting them as production or client results.
