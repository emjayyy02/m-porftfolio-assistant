# Marvin Silverio — Portfolio Knowledge

This file contains factual information M may use when answering visitors.

Do not treat every listed technology as expert-level mastery.

Do not invent professional experience, employment, clients, certifications, results, or achievements that are not explicitly documented here.


# Identity

Marvin Silverio goes by Mj.

He is building toward professional work as a:

Tech VA
→ Automation Specialist
→ AI Automation Specialist

His longer-term direction includes:

- automation engineering
- full-stack web development
- software engineering
- systems design

His broader goal is not simply to collect tools.

He wants to become someone who can receive a messy business problem, understand the process, identify what can be automated, understand how data moves, account for failure cases, and build a useful system around it.


# Technical Direction

Mj's work currently sits around three broad areas:

## Build

Creating websites, interfaces, and web applications.

## Connect

Connecting systems using:

- APIs
- webhooks
- automation workflows
- external services
- business integrations

## Think

Building toward:

- AI-assisted workflows
- structured AI outputs
- intelligent routing
- assistants
- eventually more advanced AI automation systems


# Technical Foundation

Technologies and concepts Mj has worked with include:

## Web Development

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

## Development Workflow

- Git
- GitHub
- VS Code
- Chrome DevTools
- project documentation
- README documentation
- environment variables

## APIs and Integration

- Fetch API
- async / await
- REST APIs
- JSON
- HTTP
- webhooks
- API request / response handling

## Automation

- n8n
- Google Sheets integrations
- Gmail integrations
- HTTP integrations
- conditional routing
- validation
- transformation
- duplicate detection
- retry systems
- failure logging
- workflow error handling

## AI-Assisted Systems

- structured AI outputs
- AI classification
- output validation
- deterministic routing
- human-review routing
- AI-assisted draft generation

Do not describe every item above as an expert-level skill.

Some represent working knowledge and project experience rather than professional mastery.


# Education and Technical Background

Mj is currently studying Bachelor of Science in Information Systems.

His earlier technical education included TVL-ICT with programming in Java.

His technical background also includes exposure to:

- programming
- web development
- information systems
- basic computer troubleshooting
- computer setup and maintenance
- software and hardware support

He has completed ICT-related practical/OJT work involving computer troubleshooting, setup, maintenance, and IT records.


# Projects


## Personal Developer Portfolio

This is the portfolio the visitor is currently using.

It is built with React and TypeScript and presents Mj's:

- projects
- technical skills
- education
- certifications
- professional direction
- contact information

The portfolio also includes M, the AI portfolio assistant.


### M — Portfolio Assistant

M is a custom AI assistant built into the portfolio.

Architecture:

Portfolio React frontend
→ Cloudflare Worker API
→ Cloudflare Workers AI
→ streamed response back to the interface

The assistant uses:

- React
- TypeScript
- Cloudflare Workers
- Workers AI
- Fetch API
- Server-Sent Events style streaming
- ReadableStream
- TextDecoder
- recent conversation history
- backend-owned system instructions
- backend-owned portfolio knowledge

Reliability and security controls include:

- runtime request validation
- body-size limits
- message-count limits
- message-length limits
- role validation
- CORS allowlisting
- Content Security Policy configuration
- per-visitor rate limiting
- broader chatbot rate limiting
- request timeouts
- retry UX
- partial-stream preservation
- error handling

System instructions and portfolio knowledge remain on the Worker rather than being placed in the browser frontend.

The project demonstrates the combination of frontend development, API design, streaming responses, AI integration, validation, security boundaries, and reliability thinking.


## Automation Agency Landing Page

A responsive landing-page project created around an automation-focused business concept.

It helped develop Mj's frontend foundation and ability to create clean, responsive interfaces for a business use case.

It is primarily a web/frontend project rather than a workflow automation system.


## Workflow Operations Manager

A JavaScript operations application focused on managing operational information.

It includes functionality such as:

- CRUD operations
- project management
- task management
- filtering
- reports
- calendar-related information
- Local Storage persistence
- modular JavaScript architecture

The project demonstrates:

- JavaScript application architecture
- DOM-driven interfaces
- application state
- CRUD logic
- data filtering
- local persistence
- modular frontend organization

Compared with Mj's automation projects, this project is more frontend/application-logic focused.


## Invoice Collections Automation

An n8n workflow designed around invoice collection operations.

Its workflow roughly follows:

Invoice event
→ validation
→ duplicate prevention
→ collection scoring
→ priority assignment
→ persistence
→ routing
→ finance notification / delivery
→ HTTP delivery
→ success or failure detection
→ retries for temporary failures
→ final failure handling
→ technical error logging

### Integrations

The project uses:

- n8n
- webhooks
- Google Sheets
- Gmail
- HTTP APIs

### Data Validation

Incoming invoice events are validated before being accepted.

Invalid business input is separated from valid invoice records.

### Duplicate Prevention

Existing invoices are checked so the same event is not processed repeatedly.

This demonstrates idempotency-related thinking in automation workflows.

### Collection Priority

Valid invoices receive a collection score based on business rules.

Factors include:

- invoice amount
- account tier
- payment terms

The resulting score determines:

- LOW
- MEDIUM
- HIGH

collection priority.

### Routing

Different priority levels can follow different operational paths.

Higher-priority cases can receive stronger finance attention or alerts.

### Persistence and Delivery

Invoice persistence and external delivery are treated as separate concerns.

A valid invoice can remain an accepted business record even when a downstream external delivery later fails.

This was an intentional architectural decision rather than treating persistence and delivery as the same operation.

### Retry System

Temporary HTTP failures can enter a bounded retry path.

The retry system checks whether a retry succeeded before continuing.

Retries are limited so the workflow cannot loop forever.

### Failure Handling

The system distinguishes between:

- rejected business input
- accepted invoice data
- technical/integration errors

Technical failures are logged separately from invalid invoice records.

### What This Project Demonstrates

The Invoice Collections Automation is one of Mj's stronger automation-focused projects because it combines:

- validation
- duplicate prevention
- business rules
- routing
- persistence
- external integrations
- retry logic
- failure handling
- operational logging

It demonstrates thinking beyond a simple trigger → action automation.


## Support Ticket Router & Draft Reply

An AI-assisted support workflow designed to process incoming customer support tickets.

The system combines AI interpretation with deterministic validation and routing logic.

### AI Classification

Incoming support messages can be classified into categories such as:

- billing
- technical
- account
- sales
- other

Structured AI output includes information such as:

- category
- summary
- requested action
- urgency
- whether human review may be needed

### Structured Output Validation

AI-generated output is validated before downstream workflow logic trusts it.

Validation checks include:

- correct data shape
- allowed category
- required fields
- valid urgency
- boolean review state

This prevents malformed AI output from silently entering later automation steps.

### Human Review Router

Sensitive situations can be routed for human review using deterministic rules.

Examples include:

- explicit AI uncertainty
- refund-related requests
- account-security concerns

Sensitive policy decisions are intentionally kept outside the AI prompt when deterministic logic is more reliable.

### Queue Assignment

Valid tickets can be routed toward the appropriate support queue according to their classification.

### Draft Reply Generation

The system can generate a draft customer response using the processed ticket context.

The drafting rules prevent the model from:

- claiming actions were completed when they were not
- inventing policies
- inventing prices
- inventing timelines
- exposing internal routing logic

### What This Project Demonstrates

This system demonstrates:

- AI-assisted automation
- structured outputs
- deterministic validation
- hybrid AI + rules architecture
- human-review controls
- routing
- defensive handling of untrusted customer input


# Comparing Major Projects

When visitors ask which project demonstrates what, use these distinctions.


## Workflow Operations Manager

Best example of:

- JavaScript application architecture
- CRUD
- frontend state
- modular JS
- local persistence


## Invoice Collections Automation

Best example of:

- n8n automation
- business rules
- workflow reliability
- validation
- duplicate prevention
- retries
- external integrations


## Support Ticket Router

Best example of:

- AI-assisted automation
- structured AI outputs
- deterministic validation
- human-review routing
- hybrid AI + rule-based design


## M / Portfolio Assistant

Best example of:

- React + TypeScript integration
- Cloudflare Workers
- AI API architecture
- streamed AI responses
- conversational context
- public API hardening
- frontend/backend separation


# Professional Direction

Mj's immediate career strategy is income-first.

His current focus is becoming employable for work involving:

- Tech VA tasks
- workflow automation
- API integrations
- business systems
- automation support
- AI-assisted workflows

Longer term, he intends to continue developing toward deeper:

- automation engineering
- software engineering
- full-stack development
- systems architecture

Learning does not stop once employment begins.

The goal is to earn while continuing to become technically stronger.


# How To Evaluate Mj's Work

Do not claim Mj is an expert simply because he has used a technology.

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

Simply explain that the detail is not currently available.
