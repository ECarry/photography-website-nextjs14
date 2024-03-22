## Introduction

This repository is a full-stack photo blog website template built with Next.js. It provides features such as photo upload with EXIF extraction, built-in authentication, and light/dark mode support.

Home page from https://vercel.com/templates/next.js/photo-blog

## Installation

To get started, clone this repository locally and follow these steps:

Clone & create this repo locally with the following command:

```bash
git clone -b dev https://github.com/ECarry/photography-website-nextjs14-full-stack.git
```

1. Install dependencies using npm:

```sh
npm i
```

2. Next, copy .env.example to .env and update the variables:

```sh
cp .env.example .env
```

3. Fill in the necessary environment variables, including NEXTAUTH_SECRET which is crucial for security. You can generate a random value for it using:

```sh
openssl rand -base64 32
```

or use a tool like https://generate-secret.vercel.app/32.

## Tech Stack + Features

- Photo upload with EXIF extraction
- Built-in auth
- Light/dark mode

## Database Setup

This project uses Mongo database on [Mongodb cloud](https://cloud.mongodb.com/). To setup a DB for your local dev:

1. Create a free account and a [new Database](https://cloud.mongodb.com/)
2. From the dashboard, create a branch and click "Connect" button.
3. Hit `Create password` and select `Prisma` in `Connect with` dropdown
4. Copy the url to `.env` `DATABASE_URL` file
5. run `npx prisma generate` && `npx prisma db push` to create the tables

## Initialize User

You can set up the initial user credentials in the .env file:

```
# init user
USER_EMAIL = test@test.com
USERNAME = test
USER_PASSWORD = test
in the .env.example file
```

Access /login to log in with these credentials.

## Upload images

After logging in, navigate to http://localhost:3000/dashboard, select the gallery, and upload your images.

### Frameworks

- 💪🏼[Next.js](https://nextjs.org/)(using App Directory and React Server Components) – React framework for building performant apps with the best developer experience
- 🔒[Auth.js](https://authjs.dev/) – Handle user authentication with ease with providers like Google, Twitter, GitHub, etc.
- 📀[Prisma](https://www.prisma.io/) – Typescript-first ORM for Node.js

### Platforms

- [Vercel](https://vercel.com/) – Easily preview & deploy changes with git
- [PlanetScale](https://planetscale.com/) – A cutting-edge database platform for seamless, scalable data management
- [Uploadthing](https://uploadthing.com/) - File Uploads For Next.js Developers

### UI

- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework for rapid UI development
- [Shadcn/ui](https://ui.shadcn.com/) – Re-usable components built using Radix UI and Tailwind CSS
- [Framer Motion](https://framer.com/motion) – Motion library for React to animate components with ease
- [Lucide](https://lucide.dev/) – Beautifully simple, pixel-perfect icons
- [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) – Optimize custom fonts and remove external network requests for improved performance
- [`ImageResponse`](https://nextjs.org/docs/app/api-reference/functions/image-response) – Generate dynamic Open Graph images at the edge
