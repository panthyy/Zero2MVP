# Zero to MVP

A starter template for building modern web applications with Next.js, Emotion, Mantine, TRPC, and more.

Designed to be a fast way to get started from zero to having a Minimum Viable Product.

## Technologies

- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [TRPC](https://trpc.io/) - end-to-end typesafe RPC over HTTP/JSON'
- [Zod](https://zod.dev/) - Type-safe schemas and validations   
- [React Query](https://tanstack.com/query/latest/) - Data fetching and caching
- [Mantine](https://mantine.dev/) - React components and hooks
- [Emotion](https://emotion.sh/) - CSS-in-JS
- [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm) - Database migrations and more
- [Next.js](https://nextjs.org/) - React meta framework
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [Planetscale](https://planetscale.com/) - Database

## Installation
To use this template, you can clone the repository and install dependencies with Yarn:

```bash
git clone git@github.com:panthyy/Zero2MVP.git
cd Zero2MVP
yarn install # or npm install
```

## Configuration

#### Environment Variables
copy `.env.example` to `.env.local` and fill in the values.

### Database
This template uses Drizzle ORM to manage database migrations and more. It is configured to use mysql specifically Planetscale's vitess.

#### Database Migrations
To create a new migration, run the following command:

```bash
yarn db:gen
```

To push migrations to the database, run the following command:

```bash
yarn db:push
```

## Building and Running
To run the development server, run the following command:

```bash
yarn dev
```

To build the application, run the following command:

```bash
yarn build
```
