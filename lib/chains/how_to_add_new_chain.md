# How to add a new chain

The main source of information for the entire application is the [`chains.ts`](./chains.ts) file.

To support a new chain you have to follow the following steps:

## Add new chain inside chains array

You have to provide all neccessery information for new chain:

```ts
    name: "Polygon",
    chainId: 137,
    url: "https://api.polygonscan.com",
    token: "MATIC",
```

## You have to create a specific API_KEY

You have to create a specific API_KEY for that network, and add inside `.env.local` and also it inside Vercel environment variables. Also it's very important to follow naming convetion by addind new environment variable:

```ts
NEXT_PUBLIC_${chain.name}_API_KEY
```

So it's pretty important to use the same name inside environment variable as you wrote inside the new chain object.

## How to use?

Once when you finish above steps, the app should automatically handle new network inside all hooks and components.
