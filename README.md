# Photography Blog 📸

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ECarry/photography-website)

A modern, open-source photography blog platform built with the latest web technologies. Share your photography journey with style and efficiency.

## ✨ Features

- 📱 Responsive design for all devices
- 🖼️ Automatic EXIF data extraction from photos
- 🔐 Secure authentication with Auth.js
- ☁️ Cloud storage with Cloudflare R2
- 🎨 Beautiful UI with Shadcn/ui components
- 🚀 Lightning-fast performance
- 📍 Location-based photo organization
- 🌐 SEO optimized
- 🎯 API powered by Hono.js

## 📸 Screenshots

<img src="https://github.com/ECarry/photography-website/blob/main/screen/home.png?raw=true" alt="page">
<img src="https://github.com/ECarry/photography-website/blob/main/screen/travel.png?raw=true" alt="page">
<img src="https://github.com/ECarry/photography-website/blob/main/screen/discover.png?raw=true" alt="page">
<img src="https://github.com/ECarry/photography-website/blob/main/screen/about.png?raw=true" alt="page">

## 🌈 Support Theme

- 🌈 Dark
- 🌈 Light

<img src="https://github.com/ECarry/photography-website/blob/main/screen/theme.jpg?raw=true" alt="page">

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/)
- **Database:** [Neon](https://neon.tech/) (Serverless Postgres)
- **ORM:** [Drizzle](https://orm.drizzle.team/)
- **Authentication:** [Auth.js](https://authjs.dev/)
- **UI Components:** [Shadcn/ui](https://ui.shadcn.com/)
- **API Layer:** [Hono.js](https://hono.dev/)
- **Storage:** [Cloudflare R2](https://www.cloudflare.com/products/r2/)
- **Deployment:** [Vercel](https://vercel.com)

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- bun (recommended) or npm
- Neon Database
- Cloudflare R2 Account

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Database
DATABASE_URL=your_neon_database_url

# Auth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
AUTH_SECRET=your_auth_secret

# Cloudflare R2
R2_ACCOUNT_ID=your_cloudflare_account_id
R2_ACCESS_KEY_ID=your_r2_access_key
R2_SECRET_ACCESS_KEY=your_r2_secret_key
R2_BUCKET_NAME=your_bucket_name
```

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/photography-website.git
cd photography-website
```

2. Install dependencies:

```bash
bun install
```

3. Set up the database:

```bash
bun db:push
```

4. Start the development server:

```bash
bun run dev
```

Visit `http://localhost:3000` to see your application.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues and pull requests.

## 💖 Support

If you find this project helpful, please give it a ⭐️ on GitHub!

## ⭐️ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=ECarry/photography-website&type=Date)](https://star-history.com/#ECarry/photography-website&Date)
