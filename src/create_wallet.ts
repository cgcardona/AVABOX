import * as fs from "fs";
import * as slopes from "slopes";
import { AVABOX } from "./AVABOX"
import { Wallet } from "./Wallet"

let main= (): any => {
  const avabox: AVABOX = new AVABOX()
  const wallet: Wallet = avabox.Wallet
  const avm = wallet.avm

  let output_str: string = "";
  let output_obj: {
    private_key: string 
    public_key: string 
    chain_address: string
  } = {
    private_key: "",
    public_key:  "",
    chain_address: "",
  };

  // Generate a keychain/wallet.
  const my_keychain: slopes.AVMKeyChain = avm.keyChain();

  // Generate a new keypair
  const new_address: any = my_keychain.makeKey();
  const key_pair: slopes.AVMKeyPair = my_keychain.getKey(new_address);

  // Get the private key for the keypair
  const private_key: string = key_pair.getPrivateKeyString();
  output_str = `private key: ${private_key}\n`;

  // Get the public key for the keypair
  const public_key: string = key_pair.getPublicKeyString();
  output_str += `public key: ${public_key}\n`;

  // Get the X-Chain address for this keypair
  const chain_address: string = key_pair.getAddressString();
  output_str += `chain address: ${chain_address}`;

  output_obj = { private_key, public_key, chain_address };

  fs.writeFile("wallet.json", JSON.stringify(output_obj, null, 2), err => {
    if (err) return console.error(err);
    console.log("wallet.json written successfully.");
  });
}

main()

