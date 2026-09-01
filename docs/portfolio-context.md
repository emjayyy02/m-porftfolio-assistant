# Marvin Silverio — Portfolio Knowledge

This file contains public, professional facts M may use when answering visitors.
Do not treat every listed technology as expert-level mastery.
Do not invent experience, employment, clients, certifications, metrics, revenue, or results that are not explicitly documented here.

# Identity and Direction

Marvin Silverio goes by Mj.

He is currently studying Bachelor of Science in Information Systems.
His earlier technical education included TVL-ICT with programming in Java.
He also completed ICT-related practical/OJT work involving computer troubleshooting, setup, maintenance, and IT records.

His current professional direction is:
Tech VA → Automation Specialist → AI Automation Specialist.

Longer term, he wants to grow deeper into:
- automation engineering
- full-stack web development
- software engineering
- systems design

His goal is not simply to collect tools. He wants to understand business processes, data flow, automation opportunities, failure cases, and how to build useful systems around them.

# Technical Foundation

Mj has working project experience or exposure with:

Web development:
- HTML
- CSS
- responsive web design
- JavaScript
- DOM manipulation
- forms and validation
- application state
- Local Storage
- modular JavaScript
- React
- TypeScript

Development workflow:
- Git
- GitHub
- VS Code
- Chrome DevTools
- project documentation
- README documentation
- environment variables

APIs and integration:
- Fetch API
- async / await
- REST APIs
- JSON
- HTTP
- webhooks
- API request and response handling

Automation:
- n8n
- Google Sheets integrations
- Gmail integrations
- HTTP integrations
- conditional routing
- validation and transformation
- duplicate detection
- retry systems
- failure logging
- workflow error handling

AI-assisted systems:
- structured AI outputs
- AI classification
- output validation
- deterministic routing
- human-review routing
- AI-assisted draft generation

Do not describe every item above as expert-level mastery. Some represent working knowledge and project experience.

# Projects

## Personal Developer Portfolio and M

The portfolio is a React and TypeScript web application presenting Mj's projects, technical skills, education, professional direction, and public contact information.

It includes M, a custom AI portfolio assistant.

M's architecture:
Portfolio React frontend → Cloudflare Worker API → Cloudflare Workers AI → streamed response back to the interface.

M uses or demonstrates:
- React and TypeScript
- Cloudflare Workers and Workers AI
- Fetch API
- SSE-style streaming
- ReadableStream and TextDecoder
- recent conversation history
- backend-owned system instructions and portfolio knowledge
- runtime request validation
- body, message-count, and message-length limits
- role validation
- CORS allowlisting
- Content Security Policy configuration
- per-visitor and broader chatbot rate limiting
- request timeouts
- retry UX
- partial-stream preservation
- error handling

System instructions and portfolio knowledge stay on the Worker rather than in the browser frontend.

Best evidence: modern web + AI integration, frontend/backend separation, streaming AI responses, API hardening, and reliability thinking.

## Automation Agency Landing Page

A responsive landing-page project built around an automation-focused business concept.

Best evidence: frontend fundamentals, responsive layout, and business-oriented web presentation.

This is primarily a web/frontend project rather than a workflow automation system.

## Workflow Operations Manager

A JavaScript operations application for managing operational information.

Main capabilities:
- CRUD operations
- project management
- task management
- filtering
- reports
- calendar-related information
- Local Storage persistence
- modular JavaScript architecture

Best evidence: JavaScript application architecture, DOM-driven interfaces, application state, CRUD logic, local persistence, and modular frontend organization.

This project is more frontend/application-logic focused than Mj's automation projects.

## Invoice Collections Automation

An n8n workflow designed around invoice collection operations.

Core flow:
Invoice event → validation → duplicate prevention → collection scoring → priority assignment → persistence → routing → finance notification/delivery → HTTP delivery → success/failure detection → bounded retries for temporary failures → final failure handling → technical error logging.

Integrations:
- n8n
- webhooks
- Google Sheets
- Gmail
- HTTP APIs

Important architecture:
- Incoming invoice data is validated before acceptance.
- Invalid business input is separated from accepted invoice records.
- Existing invoices are checked to reduce duplicate processing.
- Valid invoices receive a collection score based on invoice amount, account tier, and payment terms.
- Scores determine LOW, MEDIUM, or HIGH collection priority.
- Priority affects routing and the level of finance attention or alerts.
- Persistence and external delivery are separate concerns, so a valid invoice can remain accepted even if downstream delivery later fails.
- Temporary HTTP failures can enter a bounded retry path.
- Each retry checks whether delivery succeeded before another attempt is allowed.
- Technical/integration errors are logged separately from invalid business input.

Best evidence: n8n automation, validation, business rules, routing, persistence, duplicate prevention, retries, integrations, and failure handling beyond a basic trigger-action workflow.

## Support Ticket Router & Draft Reply

An AI-assisted support workflow that processes customer support tickets using AI interpretation plus deterministic validation and routing.

AI classification can produce structured fields such as:
- category
- summary
- requested action
- urgency
- whether human review is needed

Categories include:
- billing
- technical
- account
- sales
- other

Important architecture:
- AI output is validated before downstream workflow logic trusts it.
- Validation checks data shape, allowed categories, required fields, urgency, and review state.
- Sensitive situations can be routed to human review using deterministic rules.
- Examples include AI uncertainty, refund-related requests, and account-security concerns.
- Sensitive policy decisions are kept outside the AI prompt when deterministic rules are more reliable.
- Valid tickets can be assigned to an appropriate support queue.
- Draft replies are generated from processed ticket context.
- Drafting rules prevent claims that actions were completed when they were not and prevent invented policies, prices, timelines, or exposed internal routing logic.

Best evidence: AI-assisted automation, structured outputs, deterministic validation, hybrid AI + rules architecture, human review, routing, and defensive handling of untrusted input.

# Project Selection Guide

If a visitor asks what to inspect first:
- JavaScript application architecture: Workflow Operations Manager
- n8n automation and workflow reliability: Invoice Collections Automation
- AI-assisted automation and deterministic controls: Support Ticket Router
- modern web plus AI integration: M / Personal Portfolio

# Professional Direction

Mj's immediate career strategy is income-first.

He is becoming employable for work involving:
- Tech VA tasks
- workflow automation
- API integrations
- business systems
- automation support
- AI-assisted workflows

Longer term, he intends to deepen his skills in automation engineering, software engineering, full-stack development, and systems architecture while earning and gaining real professional experience.

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

# Unknown Information

If a visitor asks about something not documented here:
- do not guess
- do not infer employment
- do not invent client work
- do not invent metrics
- do not invent income
- do not invent certifications
- do not invent project results

Say naturally that the detail is not currently available.
