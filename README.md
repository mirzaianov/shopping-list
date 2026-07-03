# Shopping List App

![MasterHead](./head.gif)

## Description

### The app allows you to organize your shopping list in a simple and convenient way

### Features

- Compelling UI & Solid UX
- Major browser compatibility
- Next.js full-stack app
- Email & Password Authentication
- Neon PostgreSQL persistence

### Dependencies

- `Next.js`
- `React` • `TypeScript`
- `Better Auth`
- `Neon` • `Drizzle`
- `CSS Modules`
- `Varlock`

## Installation & Execution

### Install

```bash
  git clone https://github.com/mirzaianov/shopping-list.git
  cd shopping-list
  pnpm install
```

### Configure environment

Add local KeePassXC connection values in `.env.local`:

```env
KP_DB_PATH=C:\path\to\database.kdbx
KP_PASSWORD=<keepass-database-password>
```

Then encrypt the local password:

```bash
  pnpm exec varlock encrypt --file .env.local
```

Neon and Better Auth values are resolved from the `shopping-list/*` KeePass group defined in `.env.schema`.

Add:

```text
shopping-list/DATABASE_URL
shopping-list/BETTER_AUTH_SECRET
```

### Run in the development mode

```bash
  pnpm dev
```

Next.js will start on [http://localhost:3000/](http://localhost:3000/)

To expose the dev server on your local network for device testing:

```bash
  pnpm dev:lan
```

### Or open the deployed site

[https://shopping-mirzaianov.vercel.app/](https://shopping-mirzaianov.vercel.app/)

## Building and Running for Production

```bash
  pnpm build
  pnpm start
```

Next.js will start on [http://localhost:3000/](http://localhost:3000/)

## License

### MIT license

You can use the code, but I ask you do not copy this site without giving me credit.
