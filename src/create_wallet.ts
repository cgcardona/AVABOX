import * as fs from "fs";
import * as slopes from "slopes";
import config from "./config";

let output_str: string = "";
let output_obj: {} = {};

const AVA: slopes.Slopes = new slopes.Slopes(
  config.fullNodeHost,
  config.fullNodePort,
  config.fullNodeProtocol,
  config.networkId
);

const AVM : slopes.AVM= AVA.AVM();

// Generate a keychain/wallet.
const my_keychain: slopes.AVMKeyChain = AVM.keyChain();

// Generate a new keypair
const new_address = my_keychain.makeKey();
const keyPair: slopes.AVMKeyPair = my_keychain.getKey(new_address);

// Get the private key for the keypair
const private_key: string = keyPair.getPrivateKeyString();
output_str = `private key: ${private_key}\n`;

// Get the public key for the keypair
const public_key: string = keyPair.getPublicKeyString();
output_str += `public key: ${public_key}\n`;

// Get the X-Chain address for this keypair
const chain_address: string = keyPair.getAddressString();
output_str += `chain address: ${chain_address}`;

output_obj = { private_key, public_key, chain_address };

fs.writeFile("wallet.json", JSON.stringify(output_obj, null, 2), err => {
  if (err) return console.error(err);
  console.log("wallet.json written successfully.");
});
