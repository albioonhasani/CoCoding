# CodePath AI

A modern, accessible foundation for a beginner-friendly AI coding education platform. The repository intentionally contains a small React application and one server-side Groq proxy—no database, authentication, payments, or unnecessary backend.

## Requirements

- Node.js 20 or later
- A Groq API key (only needed when wiring an AI interaction)

## Start locally

```bash
npm install
Copy-Item .env.example .env
# Add your GROQ_API_KEY to .env
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). The Vite development middleware serves server-only AI routes and reads the key only from the server process.

## Test AI routes safely

With the development server running, use a placeholder request first. A missing key deliberately returns `503` without revealing configuration details:

```powershell
Invoke-RestMethod -Method Post -Uri http://127.0.0.1:5173/api/challenge -ContentType 'application/json' -Body '{"language":"javascript","topic":"functions","difficulty":"beginner"}'
```

After adding a valid key to your uncommitted `.env`, the same request returns a validated challenge object. Available endpoints are `POST /api/challenge`, `POST /api/hint`, `POST /api/feedback`, and `POST /api/explain`. Use only the allowed languages (`javascript`, `typescript`, `python`, `java`, `cpp`, `csharp`) and curated, language-appropriate topic values; all other inputs are rejected before calling Groq.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Deployment and security

`api/challenge.ts`, `api/hint.ts`, and `api/feedback.ts` are Vercel serverless functions for production deployments. Configure `GROQ_API_KEY` (and optionally `GROQ_MODEL`) in your host's server environment; do not expose it as a `VITE_` variable. The browser calls only same-origin API endpoints.

The endpoints accept only `POST` requests, enforce JSON and size limits, validate allowed languages/topics/difficulties, bound code submissions, and validate structured AI output before returning it. They also apply a small in-memory server-instance rate limit. For a public production launch, add platform-level distributed rate limiting appropriate to expected traffic.

Challenge checking deliberately does **not** execute learner code. The MVP sends the selected challenge and submitted code to the server-side tutor for structured analysis; no arbitrary code is run on the server. This keeps the Groq API key and infrastructure protected while avoiding an unsafe code-execution service.

## Structure

- `src/pages` — route-level screens
- `src/components` — shared UI (with a `ui` area for primitives)
- `src/layouts` — navigation and page shells
- `src/services` — browser API clients
- `src/hooks`, `src/lib`, `src/types`, `src/data`, `src/utils` — reusable app foundations
- `server` — shared server-only Groq integration and Vite dev middleware
- `api` — production serverless route
