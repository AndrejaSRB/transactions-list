# How to add a new chain

The main source of information for the entire application is the [`chains.ts`](./chains.ts) file.

To support a new chain you have to follow the following steps:

## Add new chain inside chains array

You have to provide all neccessery information for new chain:

```ts
    name: "BNB",
    chainId: 56,
    url: "https://api.bscscan.com",
    token: "BNB",
```

## You have to create a specific API_KEY

You have to create a specific API_KEY for that network, and add inside `.env.local` and also it inside Vercel environment variables. Also it's very important to follow naming convetion by addind new environment variable:

```ts
NEXT_PUBLIC_${chain.name}_API_KEY
```

Our Example:

```ts
NEXT_PUBLIC_BNB_API_KEY=
```

So it's pretty important to use the same name inside environment variable as you wrote inside the new chain object.

## You have to add newly created environment variable inside env.ts

Once when you create a new environment variable its important to add it inside [`env.ts`](../env.ts), together with other environment variables.

## import the chain from wagmi

The final step should be inside [`wagmi.tsx`](../wagmi.tsx). You will need to find and import you new chain from wagmi library and add inside list of chains. In our example that would be `bsc`

```ts
export const config = createConfig({
  chains: [mainnet, polygon, bsc],
  transports,
});
```

## How to use?

Once when you finish above steps, the app should automatically handle new network inside all hooks and components.
