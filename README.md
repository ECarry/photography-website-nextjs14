## Introduction

<p align="center">
<img src='https://github.com/ECarry/photography-website-nextjs14-full-stack/blob/main/public/images/dashboard.gif' width='720px'>
</p>

Home page from https://vercel.com/templates/next.js/photo-blog

## Installation

go `dev` [branch](https://github.com/ECarry/photography-website-nextjs14-full-stack/tree/dev)

## Tech Stack + Features

- Photo upload with EXIF extraction
- Built-in auth
- Light/dark mode

## Database

This project uses Mongo database on [Mongodb cloud](https://cloud.mongodb.com/). To setup a DB for your local dev:

1. Create a free account and a [new Database](https://cloud.mongodb.com/)
2. From the dashboard, create a branch and click "Connect" button.
3. Hit `Create password` and select `Prisma` in `Connect with` dropdown
4. Copy the url to `.env` `DATABASE_URL` file
5. run `npx prisma generate` && `npx prisma db push` to create the tables

### Frameworks

- ▲[Next.js](https://nextjs.org/)(using App Directory and React Server Components) – React framework for building performant apps with the best developer experience
- 🔒[Auth.js](https://authjs.dev/) – Handle user authentication with ease with providers like Google, Twitter, GitHub, etc.
- 📀[Prisma](https://www.prisma.io/) – Typescript-first ORM for Node.js

### Platforms

- ▲[Vercel](https://vercel.com/) – Easily preview & deploy changes with git
- 🍃[Mongodb cloud](https://cloud.mongodb.com/) – Build faster. Build smarter.​​
- [Uploadthing](https://uploadthing.com/) - File Uploads For Next.js Developers

### UI

- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework for rapid UI development
- [Shadcn/ui](https://ui.shadcn.com/) – Re-usable components built using Radix UI and Tailwind CSS
- [Framer Motion](https://framer.com/motion) – Motion library for React to animate components with ease
- [Lucide](https://lucide.dev/) – Beautifully simple, pixel-perfect icons
- [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) – Optimize custom fonts and remove external network requests for improved performance
- [`ImageResponse`](https://nextjs.org/docs/app/api-reference/functions/image-response) – Generate dynamic Open Graph images at the edge
