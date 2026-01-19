# Quiet Tools

Privacy-first utilities that run entirely in the browser. No logins, no tracking, no cookies.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Create a `.env.local` file (or set environment variables) with:

```bash
NEXT_PUBLIC_SITE_URL=https://xxxx.re
```

## Build

```bash
npm run build
npm run start
```

## Add a new tool

1) Add metadata in `src/data/tools.ts`.
   - Include `slug`, `title`, `description`, `category`, `keywords`, `howItWorks`, `faq`, and `related`.
2) Create the tool UI in `src/components/tools/<slug>.tsx`.
   - Mark the component with `"use client"`.
   - Keep parsing safe and add helpful error messages.
3) Register the tool in `src/components/tools/registry.tsx`.
4) (Optional) Add it as related to other tools.

The new tool page will be generated automatically at `/tools/<slug>` and included in the sitemap.

## SEO configuration

Set `NEXT_PUBLIC_SITE_URL` in your environment for correct canonical URLs and sitemaps.
See `.env.example` for the expected format.

## Deploy

### Vercel

1) Push the repo to GitHub.
2) Import the project in Vercel.
3) Set `NEXT_PUBLIC_SITE_URL` in Project Settings > Environment Variables.
4) Deploy.

### Cloudflare Pages

1) Push the repo to GitHub.
2) Create a new Pages project and select the repo.
3) Build command: `npm run build`
4) Output directory: `.next`
5) Set `NEXT_PUBLIC_SITE_URL` in the Pages project environment variables.
6) Deploy.
