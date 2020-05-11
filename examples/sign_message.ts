import { AVABOX } from '../src/AVABOX'
import { Wallet } from '../src/Wallet'
import { Buffer } from 'buffer/'
import AVMAPI from 'slopes/typings/src/apis/avm/api'
import { AVMKeyChain, AVMKeyPair } from 'slopes'

let main = (): any => {
  let config = {
    fullNodeHost: 'ip.of.full.node',
    fullNodePort: 9650,
    fullNodeProtocol: 'http',
    networkId: 12345

  }
  const avabox: AVABOX = new AVABOX(config)
  const Wallet: Wallet = avabox.Wallet
  const avm: AVMAPI = Wallet.avm
  const keychain: AVMKeyChain = avm.keyChain();
  const address: Buffer = keychain.makeKey();
  const keypair: AVMKeyPair = keychain.getKey(address);
  const xAddress: string = keypair.getAddressString()
  console.log(`xAddress: ${xAddress}`)
  // Example output:
  // xAddress: X-6WYWcTCf3GRgQZH6gYLiu7hxWVEjvYVdC

  const msg: string = `Hello AVA from address ${xAddress}`
  const message: Buffer = Buffer.from(msg);
  console.log(`Message: ${msg}`)
  // Example output:
  // Message: Hello AVA from address X-6WYWcTCf3GRgQZH6gYLiu7hxWVEjvYVdC

  const signature: Buffer = keypair.sign(message);
  const signerPubk: Buffer = keypair.recover(message, signature);
  const isValid: boolean = keypair.verify(message, signature);
  console.log(`isValid: ${isValid}`)
  // Example output:
  // true
}

main()

