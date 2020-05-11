import { AVABOX } from "../src/AVABOX"

const main = async (): Promise<any> => {
    const config = {
    fullNodeHost: "ip.address.of.node",
    fullNodePort: 9650,
    fullNodeProtocol: "http",
    networkId: 2

  }
  const avabox: AVABOX = new AVABOX(config)
  const Wallet = avabox.Wallet
  const avm = Wallet.avm
  const txid: string =  '2BKo2z3qnMhUNFdD2nkMMGT4iV5QCZwRuBeegyXejbhG1JCp8j'
  const  status = await avm.getTxStatus(txid);
  // returns one of: "Accepted", "Processing", "Unknown", and "Rejected"
  console.log(`STATUS: ${status}`)
}

main()

