import { AVABOX } from '../src/AVABOX'
import { Wallet } from '../src/Wallet'
import BN from 'bn.js';
import { Buffer } from 'buffer/'
import AVMAPI from 'slopes/typings/src/apis/avm/api'
import { AVMKeyChain, AVMKeyPair } from 'slopes'
import * as slopes from 'slopes'
import { Config } from '../src/interfaces/config_interface'

const main = async (): Promise<any> => {
  const config: Config = {
    fullNodeHost: 'ip.of.full.node',
    fullNodePort: 9650,
    fullNodeProtocol: 'http',
    networkId: 2
  }

  const avabox: AVABOX = new AVABOX(config)
  const Wallet: Wallet = avabox.Wallet
  const avm: AVMAPI = Wallet.avm
  const myKeychain: AVMKeyChain = avm.keyChain();

  const newAddress1: Buffer = myKeychain.makeKey()
  const keypair1: AVMKeyPair = myKeychain.getKey(newAddress1); //returns the keypair class
  const privkey1: string = keypair1.getPrivateKeyString()
  console.log(`privkey1: ${privkey1}`)

  const mypk1: Buffer = Buffer.from('')
  const successful1: boolean = keypair1.importKey(mypk1)
  console.log(`successful1: ${successful1}`)

  const newAddress2: Buffer = myKeychain.makeKey()
  const keypair2: AVMKeyPair = myKeychain.getKey(newAddress2); //returns the keypair class
  const privkey2: string = keypair2.getPrivateKeyString()
  console.log(`privkey2: ${privkey2}`)
  const mypk2: Buffer = Buffer.from('')
  const successful2: boolean = keypair2.importKey(mypk2)
  console.log(`successful2: ${successful2}`)

  const newAddress3: Buffer = myKeychain.makeKey()
  const keypair3: AVMKeyPair = myKeychain.getKey(newAddress3); //returns the keypair class
  const privkey3: string = keypair3.getPrivateKeyString()
  console.log(`privkey3: ${privkey3}`)
  const mypk3: Buffer = Buffer.from('')
  const successful3: boolean = keypair3.importKey(mypk3)
  console.log(`successful3: ${successful3}`)
  console.log(avm.keyChain().getAddressStrings())

  const fee: BN = new BN(0)
  const name: string = 'Hello EARTH'
  const symbol: string = 'ERTH'
  const denomination: number = 9

  const addresses: Buffer[] = avm.keyChain().getAddresses();

  // Create outputs for the asset's initial state
  const secpbase1: slopes.SecpOutBase = new slopes.SecpOutBase(new BN(400), addresses);
  const secpbase2: slopes.SecpOutBase = new slopes.SecpOutBase(new BN(500), [addresses[1]]);
  const secpbase3: slopes.SecpOutBase = new slopes.SecpOutBase(new BN(600), [addresses[1], addresses[2]]);

  // Populate the initialState array
  // The AVM needs to know what type of output is produced. 
  // The constant slopes.AVMConstants.SECPFXID is the correct output.
  // It specifies that we are using a secp256k1 signature scheme for this output.
  const initialState: slopes.InitialStates = new slopes.InitialStates();
  initialState.addOutput(secpbase1, slopes.AVMConstants.SECPFXID);
  initialState.addOutput(secpbase2, slopes.AVMConstants.SECPFXID);
  initialState.addOutput(secpbase3, slopes.AVMConstants.SECPFXID);

  // Fetch the UTXOSet for our addresses
  const utxos: slopes.UTXOSet = await avm.getUTXOs(addresses);

  // Make an unsigned Create Asset transaction from the data compiled earlier
  const unsigned: slopes.TxCreateAsset = await avm.makeCreateAssetTx(utxos, fee, addresses, initialState, name, symbol, denomination);

  const signed: slopes.Tx = avm.keyChain().signTx(unsigned); //returns a Tx class
  const txid: string = await avm.issueTx(signed); //returns an AVA serialized string for the TxID
  console.log(`TXID: ${txid}`)
  const status: string = await avm.getTxStatus(txid);
  console.log(`STATUS: ${status}`)
}

main()

