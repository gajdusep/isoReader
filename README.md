# isoReader

A coding challenge for castLabs

## How to run

In the root of the project run:

```bash
npm install
npx nx run iso-reader-demo:dev
```

Go to the localhost listed in the output.

## How to test

In the root of the project run:

```bash
npx nx test iso-reader
```

## Reasoning behind my solution

As iso reader is a reusable library, I started by creating a package. I wanted to import that package into a simple demo app. I wanted to go as simple as possible, so started with Express server and simple HTML page, howerever, I was runnning into problems with serving the local JS files. 

Eventually, not to lose too much time, I went with NX monorepo, that on one hand has a lot of boilerplate code, but on the other hand provides import/export functionality out of the box.
