# isoReader

A coding challenge for castLabs

## How to run

In the root of the project run:

```bash
npm install
npx nx run iso-reader-demo:dev
```

Go to the localhost listed in the console output.

## How to test

In the root of the project run:

```bash
npx nx test iso-reader
```

## Reasoning behind my solution

### NX

As iso reader is a reusable library, I started by creating a package. I wanted to go as simple as possible with the demo app, so I started with Express server and simple HTML page, howerever, I was runnning into problems with serving the local JS files. 

Eventually, not to lose too much time, I went with NX monorepo, which on one hand has a lot of boilerplate code, but on the other hand provides import/export functionality out of the box.

**Note:** I know the NX monorepo is a horendous overkill (it takes a few hundred MBs after npm install). I went for it after some frustration with simpler options.

### ISO reader

The ISO reader works on the "first in, last out" principle. It pushes the box information to the stack and then tries to split it into smaller boxes if possible. It pushes just the offset and length, not the actual contents of the boxes.

- See the algorithm here: [isoReader.ts](./libs/iso-reader/src/isoReader.ts)
- And demo app page here: [page.tsx](./apps/iso-reader-demo/src/app/page.tsx)

Edge cases and code style details that I considered but decided not to implement for sake of simplicity:

- more MDAT sections - currently returning only the last one (in cases there would be another one)
- exceptions - I'm currently throwing Errors but custom exceptions might be more appropriate
- I'm not testing the validity of the tree - if a box was inside a wrong box, the code is fine with that

### Images

I was curious what was in the images. The fastest way was to parse it with regex. 
This wouldn't be sustainable long-term: for example, the format might change or the file might be too large. It would be better to use some xml parsing library.

**Note**: the `parseImage` method is not very robust, since it expects the images to be in a specific format. I decided to not test this method, since the format would need to be specified.
