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
  const myKeychain: AVMKeyChain = avm.keyChain();
  const newAddress1: Buffer = myKeychain.makeKey();
  const keypair: AVMKeyPair = myKeychain.getKey(newAddress1);
  const xAddress: string = keypair.getAddressString()
  const msg: string = `Hello AVA from address ${xAddress}`
  const message: Buffer = Buffer.from(msg);
  console.log(`Message: ${msg}`)

  const signature: Buffer = keypair.sign(message);
  const signerPubk: Buffer = keypair.recover(message, signature);
  const isValid: boolean = keypair.verify(message, signature);
  console.log(`isValid: ${isValid}`)
}

main()

