import { AVABOX } from '../src/AVABOX'
import { Wallet } from '../src/Wallet'
import BN from 'bn.js';
import { Buffer } from 'buffer/'
import AVMAPI from 'slopes/typings/src/apis/avm/api'
import { AVMKeyChain, AVMKeyPair } from 'slopes'
import * as slopes from 'slopes'
import { Config } from '../src/interfaces/config_interface'

let main = async (): Promise<any> => {
  let config: Config = {
    fullNodeHost: 'ip.of.full.node',
    fullNodePort: 9650,
    fullNodeProtocol: 'http',
    networkId: 2
  }

  const avabox: AVABOX = new AVABOX(config)
  const Wallet: Wallet = avabox.Wallet
  const avm: AVMAPI = Wallet.avm
  let myKeychain = avm.keyChain();

  let newAddress1: Buffer = myKeychain.makeKey()
  let keypair1 = myKeychain.getKey(newAddress1); //returns the keypair class
  let privkey1 = keypair1.getPrivateKeyString()
  console.log(`privkey1: ${privkey1}`)

  let mypk1 = Buffer.from('rZ3nkMoAGqsJdspptRZajHYXUqCxDBX4KDzxf4ukHWUgFq6aL')
  let successful1 = keypair1.importKey(mypk1)
  console.log(`successful1: ${successful1}`)

  let newAddress2: Buffer = myKeychain.makeKey()
  let keypair2 = myKeychain.getKey(newAddress2); //returns the keypair class
  let privkey2 = keypair2.getPrivateKeyString()
  console.log(`privkey2: ${privkey2}`)
  let mypk2 = Buffer.from('3WZEz4PgsSkTFqwZ5wCGXXekZ4dS2AX3NhUzt49x8RbM7tPbU')
  let successful2 = keypair2.importKey(mypk2)
  console.log(`successful2: ${successful2}`)

  let newAddress3: Buffer = myKeychain.makeKey()
  let keypair3 = myKeychain.getKey(newAddress3); //returns the keypair class
  let privkey3 = keypair3.getPrivateKeyString()
  console.log(`privkey3: ${privkey3}`)
  let mypk3 = Buffer.from('oYBm4wgU43Qxgnqz4u4BfEVSDdr1rmVqbuJYX7F5Sdt71MYhd')
  let successful3 = keypair3.importKey(mypk3)
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
  // console.log(secpbase1)

  // Populate the initialState array
  // The AVM needs to know what type of output is produced. 
  // The constant slopes.AVMConstants.SECPFXID is the correct output.
  // It specifies that we are using a secp256k1 signature scheme for this output.
  let initialState: slopes.InitialStates = new slopes.InitialStates();
  initialState.addOutput(secpbase1, slopes.AVMConstants.SECPFXID);
  initialState.addOutput(secpbase2, slopes.AVMConstants.SECPFXID);
  initialState.addOutput(secpbase3, slopes.AVMConstants.SECPFXID);

  // Fetch the UTXOSet for our addresses
  let utxos = await avm.getUTXOs(addresses);

  // Make an unsigned Create Asset transaction from the data compiled earlier
  let unsigned = await avm.makeCreateAssetTx(utxos, fee, addresses, initialState, name, symbol, denomination);

  let signed = avm.keyChain().signTx(unsigned); //returns a Tx class
  let txid = await avm.issueTx(signed); //returns an AVA serialized string for the TxID
  console.log(`TXID: ${txid}`)
  let status = await avm.getTxStatus(txid);
  console.log(`STATUS: ${status}`)
}

main()

