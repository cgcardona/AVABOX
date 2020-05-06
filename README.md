# AVABOX

AVA is an open-source platform for launching highly decentralized applications, financial primitives, and interoperable blockchains.

AVABOX repo is a playground for exploring the AVA platform including the [slopes](https://github.com/ava-labs/slopes) lib.

## Usage

You can drop AVABOX in to your app via `npm` or `yarn` or you can clone the repo and run it locally.

### NPM or Yarn

AVABOX is available as a [package on npm](https://www.npmjs.com/package/avabox). You can drop it in to your app with npm or yarn.

With `npm`

```bash
npm install avabox --save
```

With `yarn`

```bash
yarn add avabox
```

### Localhost

First clone the repo

```bash
git clone https://github.com/cgcardona/AVABOX.git
cd AVABOX
```

Create a wallet. This creates an AVA wallet located at `./wallet.json`.

```bash
ts-node src/create_wallet.ts
wallet.json written successfully.

cat wallet.json
{
  "private_key": "2sVnjPaFRZoYy5NF4UJoGsDNKyTK2MPGDCvFSfgHghbdiVzS1E",
  "public_key": "8h3duPX9UBqHK5Xo3DnA5xB2DTnfzNddHMctDqM3BaGsHWYW9r",
  "chain_address": "X-ErsdCatjgehBa8Ao1LVuZW11WKEL2FeJV"
}
```

## More Info

- Learn more at [https://www.avalabs.org](https://www.avalabs.org).
- [AvaLabs Official Twitter account](https://twitter.com/avalabsofficial)

## Credits

The ever amazing [Chris @Trout Troutner](https://twitter.com/christroutner) inspired me to do a deep dive on AVA. His [ava-examples](https://github.com/christroutner/ava-examples) repo was the inpiration for this work.

## License

AVABOX is licensed under the [MIT Open Source License](./LICENSE)
