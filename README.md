# BROOD :: POD APP

Proof of Drink Protocol Web Client

## How To

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, create a `.env.local` file and set the variables:

```bash
cp .env.local.example .env.local
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Local Database

### Setup
For testing locally, you can set up a local database instance with docker:

1. Run docker
2. Run `bun db:up` to start the database
3. Run `bun generate` to generate the schemas from drizzle ORM for migrations
4. Run `bun migrate` to apply the migrations

Now you have a local postgres database instance running on `localhost:5432`. To use in the app, set the `DATABASE_URL` environment variable to `postgresql://user:password@localhost:5432/pod?sslmode=disable`.

### Seeding claim codes

The `scripts/upload.ts` file contains a script to upload claim codes to the database. It expects a merkle tree json file that is created by OpenZeppelin's [@openzeppelin/merkle-tree](https://www.npmjs.com/package/@openzeppelin/merkle-tree) package. These JSON files are stored in the `/scripts/codes` directory with the name format `merkle-tree-{tokenId}.json`. To run the script, use the following command:

```bash
bun upload
```

And then you can view the codes in the database with the following command:

```bash
bun view-codes
```

Once these are uploaded, you can start claiming in the app locally.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
