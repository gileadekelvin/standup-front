# Standup Front

This is a standup meeting application.

We use:

- Next.js
- Relay
- Material UI

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

To get started you should have `yarn` installed and follow the instructions:

0. **This app uses an API that can be configured here [standup-api](https://github.com/gileadekelvin/standup-api)**


1. Install dependencies:

```sh
yarn
```

2. Create a `.env` file and fill with variables that are listed in the `.env.sample` file

```sh
cp .env.sample .env
```

3. Then run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Useful commands

1. Build js and types

```sh
yarn build
```

2. Generate the relay files (including types). You should execute this every time that you do a relay query or fragment change.

```sh
yarn relay
```

3. Lint code

```sh
yarn lint
```
