# ALL NEW WEBSITE COMING SOON

<img src="https://github.com/ECarry/photography-website-nextjs14-full-stack/blob/main/screen/home.png?raw=true" alt="page">
<img src="https://github.com/ECarry/photography-website-nextjs14-full-stack/blob/main/screen/home-photo.png?raw=true" alt="page">
<img src="https://github.com/ECarry/photography-website-nextjs14-full-stack/blob/main/screen/dashboard.png?raw=true" alt="page">
<img src="https://github.com/ECarry/photography-website-nextjs14-full-stack/blob/main/screen/dashboard-photos.png?raw=true" alt="page">
<img src="https://github.com/ECarry/photography-website-nextjs14-full-stack/blob/main/screen/dashboard-photo.png?raw=true" alt="page">

## Deploy

I recommend using [Vercel](https://vercel.com/) to deploy your app.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FECarry%2Fphotography-website-nextjs14&project-name=photography-website&repository-name=photography-website&demo-url=https%3A%2F%2Fp.ecarry.me&demo-image=https%3A%2F%2Fgithub.com%2FECarry%2Fphotography-website-nextjs14-full-stack%2Fblob%2Fmain%2Fscreen%2Fdashboard-photos.png)

## DB

I recommend using [Vercel Storage](https://vercel.com/) for your database. It's free and easy to setup. Once you have your database setup, you will need to add the connection string to your `.env.local` file.

```.env.local
AUTH_DRIZZLE_URL="postgres://"
POSTGRES_URL="postgres://"
```

### Generate the migration

```sh
bun run db:generate
```

This will generate a migration SQL file: `drizzle/migrations/0000_migration.sql`

### Run the migrations

```sh
bun run db:migrate
```

## Init User

### Add env variables

```.env.local
USER_EMAIL=
USERNAME=
USER_PASSWORD=
```

```sh
bun run db:seed
```

## Mapbox

### Mapbox Tokens

To get a Mapbox token, you will need to register on [their website](https://www.mapbox.com/). The token will be used to identify you and start serving up map tiles. The service is free until a certain level of traffic is exceeded.

```.env.local
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=
```

### Securing Mapbox Token

Because Mapbox tokens are required for the client application to make requests to Mapbox servers, you have to distribute it with your app. It is not possible to stop a visitor to your site from scraping the token. The practice outlined below can help you protect your token from being abused.

- Create separate tokens for development (often times on `http://localhost`), public code snippet (Gist, Codepen etc.) and production (deployed to `https://mycompany.com`). The public token should be rotated regularly. The production token should have strict [scope and URL restrictions](https://docs.mapbox.com/help/troubleshooting/how-to-use-mapbox-securely/#access-tokens) that only allows it to be used on a domain that you own.

## Uploadthing

<!-- https://uploadthing.com/dashboard -->

### Add env variables

```.env.local
UPLOADTHING_TOKEN=
```

If you don't already have a uploadthing secret key, [sign up](https://uploadthing.com/sign-in) and create one from the [dashboard](https://uploadthing.com/dashboard)!

## Auth.js

### Setup Environment

The only environment variable that is mandatory is the `AUTH_SECRET`. This is a random value used by the library to encrypt tokens and email verification hashes. (See [Deployment](https://authjs.dev/getting-started/deployment) to learn more). You can generate one via running:

```sh
npx auth secret
```

Alternatively, you can use the following `openssl` command, which should be available on all Linux / Mac OS X systems.

```sh
openssl rand -base64 33
```

Then add it to your `.env.local` file:

```.env.local
AUTH_SECRET=secret
```

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=ECarry/photography-website-nextjs14&type=Date)](https://star-history.com/#ECarry/photography-website-nextjs14&Date)
