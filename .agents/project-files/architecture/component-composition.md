# Component Composition

This diagram shows the current Next.js App Router component composition and marks the React Server Component and Client Component boundaries.

```mermaid
flowchart TD
  Root["RootLayout<br/>src/app/layout.tsx<br/>Server"]:::server

  Root --> HomeRoute["/ page<br/>src/app/page.tsx<br/>Server<br/>checks Better Auth session"]:::server
  Root --> LoginRoute["/login page<br/>src/app/login/page.tsx<br/>Server<br/>redirects signed-in users"]:::server
  Root --> AuthRoute["/api/auth/[...all]<br/>Route Handler<br/>Server"]:::server

  HomeRoute --> AuthServer["auth.api.getSession<br/>src/lib/auth.ts<br/>Server"]:::server
  HomeRoute --> ListQuery["listShoppingItems<br/>src/db/queries.ts<br/>Server"]:::data
  HomeRoute --> Home["Home<br/>src/features/home/home.tsx<br/>Server"]:::server

  Home --> SignOutButton["SignOutButton<br/>Client island"]:::client
  Home --> ShoppingItemForm["ShoppingItemForm<br/>Client island<br/>RHF + Zod + Zustand"]:::client
  Home --> ShoppingList["ShoppingList<br/>Server"]:::server

  ShoppingItemForm --> Store["useShoppingListStore<br/>Zustand<br/>Client"]:::client
  ShoppingItemForm --> ItemActions["shopping-list-actions.ts<br/>Server actions<br/>create/update"]:::action

  ShoppingList --> TodoEditButton["TodoEditButton<br/>Client island"]:::client
  ShoppingList --> DeleteForm["delete form<br/>Server action submit"]:::action
  DeleteForm --> ItemActions
  TodoEditButton --> Store

  ItemActions --> AuthServer
  ItemActions --> Queries["create/update/delete/list queries<br/>src/db/queries.ts"]:::data
  ListQuery --> DbClient["Drizzle client<br/>src/db/client.ts"]:::data
  Queries --> DbClient
  AuthServer --> DbClient
  AuthRoute --> AuthServer

  DbClient --> Schema["Drizzle schema<br/>user / account / session / shopping_items"]:::data
  Schema --> Neon["Neon PostgreSQL"]:::external

  LoginRoute --> AuthServer
  LoginRoute --> LoginClient["LoginClient<br/>Client island<br/>RHF + Zod + view switch"]:::client
  LoginClient --> SignInView["SignInView<br/>Client descendant"]:::client
  LoginClient --> SignUpView["SignUpView<br/>Client descendant"]:::client
  LoginClient --> AuthClient["authClient<br/>better-auth/react<br/>Client"]:::client

  SignInView --> Button["Button<br/>Client descendant"]:::client
  SignUpView --> Button
  SignOutButton --> AuthClient
  AuthClient --> AuthRoute

  classDef server fill:#e8f4ff,stroke:#2166ac,color:#111
  classDef client fill:#fff4e5,stroke:#b45f06,color:#111
  classDef action fill:#eef8ea,stroke:#4f7f22,color:#111
  classDef data fill:#f6edff,stroke:#6a329f,color:#111
  classDef external fill:#f5f5f5,stroke:#666,color:#111
```

Notes:

- `SignInView`, `SignUpView`, and `Button` do not declare `'use client'`, but they are imported by `LoginClient`, so they belong to that client subtree.
- `ShoppingList` stays server-rendered; `TodoEditButton` is the client island that writes the transient edit selection to Zustand.
- Shopping-list mutations run through server actions, then Drizzle writes to Neon PostgreSQL.
