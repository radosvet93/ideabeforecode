## Setup

`pnpm install`
`pnpm dev`

### Environment variables
- DATABASE_URL - Neon DB
- OPENAI_API_KEY - Open AI

### DB

`pnpm db:generate` - Generate the migrations 
`pnpm db:migrate` - Apply the changes to DB
`pnpm db:push` - Directly apply changes to DB without migration