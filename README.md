## Introduction

## Installation

Clone & create this repo locally with the following command:

```bash
git clone https://github.com/ECarry/photography-website-nextjs14-full-stack.git
```

1. Install dependencies using pnpm:

```sh
npm i
```

2. Copy `.env.example` to `.env` and update the variables.

```sh
cp .env.example .env.local
```

3. Input everything you need for the env.

4. Start the development server:

## Tech Stack + Features

## Database

This project uses MySQL database on PlanetScale. To setup a DB for your local dev:

1. Create a free account and a [new Database](https://planetscale.com/docs/tutorials/planetscale-quick-start-guide#create-a-database)
2. From the dashboard, create a branch and click "Connect" button.
3. Hit `Create password` and select `Prisma` in `Connect with` dropdown
4. Copy the url to `.env.local` file
5. run `yarn run prisma:push` (Be mindful prisma migrate won't work because it requires more privileges for the database user).

You can also use `docker-compose` to have a Mysql database locally, instead of relying on PlanetScale:

1. Enter `MYSQL_ROOT_PASSWORD`, `MYSQL_DATABASE`, `MYSQL_USER` and `MYSQL_PASSWORD` values in `.env.local`.
2. run `docker-compose --env-file .env.local up` to start the DB.
3. run `yarn run prisma:push`.

### Frameworks

- ▲[Next.js](https://nextjs.org/)(using App Directory and React Server Components) – React framework for building performant apps with the best developer experience
- 🔒[Auth.js](https://authjs.dev/) – Handle user authentication with ease with providers like Google, Twitter, GitHub, etc.
- 📀[Prisma](https://www.prisma.io/) – Typescript-first ORM for Node.js

### Platforms

- ▲[Vercel](https://vercel.com/) – Easily preview & deploy changes with git
- [PlanetScale](https://planetscale.com/) – A cutting-edge database platform for seamless, scalable data management
- [Uploadthing](https://uploadthing.com/) - File Uploads For Next.js Developers

### UI

- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework for rapid UI development
- [Shadcn/ui](https://ui.shadcn.com/) – Re-usable components built using Radix UI and Tailwind CSS
- [Framer Motion](https://framer.com/motion) – Motion library for React to animate components with ease
- [Lucide](https://lucide.dev/) – Beautifully simple, pixel-perfect icons
- [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) – Optimize custom fonts and remove external network requests for improved performance
- [`ImageResponse`](https://nextjs.org/docs/app/api-reference/functions/image-response) – Generate dynamic Open Graph images at the edge

## Features

- ▲ Framework is Next.js 14 (using App Directory and React Server Components) — a React framework for production-grade apps. Designed to be deployed on Vercel.
- 🤝 Full TypeScript support, including strict mode.
- 📦 React components from shadcn/ui, built on Radix UI, Tailwind CSS and cva.
- 👩‍⚖️ Linting from eslint-config-harmony, which provides a strict set of configuration for ESLint, Prettier and Stylelint.
- 📀 Database uses Prisma as the ORM. Can be connected to any supported database — I recommend PlanetScale.
- 📧 Emails templated by react.email and sent using Resend. Additionally, Loops form for a waitlist.
- 👨‍👩‍👧‍👦 Authentication provided by Next-auth v5.
- 🟢 Log Drain and Status provided by BetterStack.
- 🐞 Error capturing provided by Sentry.
- 💸 Payments provided by Stripe.
- 📈 Analytics provided by Vercel Analytics and Google Analytics.
- 🤖 AI provided by Vercel AI, using OpenAI by default.
- 💬 Feedback through Canny.
- 📝 MDX content through Contentlayer.
- 🔔 Notifications provided by Knock.
- 🔄 Cron jobs provided by Vercel.
