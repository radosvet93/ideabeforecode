# IdeaBeforeCode

A lightweight outreach and lead-tracking tool for founders and early-stage teams.
It combines AI-generated outreach emails with a simple drag-and-drop pipeline so you can track conversations and validate ideas quickly.

## Features

- Creating projects
- Creating leads per projects
- Drag and drop pipeline for leads
- Generating emails per lead

## Tech Stack

Frontend: Vite, React, TypeScript, Lexical
Backend: Express, TypeScript, Drizzle ORM, Neon Postgres

## Setup

- Client

```
cd client
pnpm install
```

- Server
```
cd server
pnpm install
```

On root
`pnpm start` - to start both server and client

## Roadmap

- have a brutal opinion LLM when creating a project
- Send email from the app nodemail or something else
- Creating inboxes per project
- LLM find leads
- Batch send emails to leads
