import { AVABOX } from "./AVABOX"

let main = async (): Promise<any> => {
  let config = {
    fullNodeHost: "ip.address.of.node",
    fullNodePort: 9650,
    fullNodeProtocol: "http",
    networkId: 12345

  }
  const avabox: AVABOX = new AVABOX(config)
  const PChain = avabox.PChain
  let address: string =  "Bg6e45gxCUTLXcfUuoy3go2U6V3bRZ5jH"
  let account: Promise<number> = await PChain.getAccount(address)
  console.log(account)
}

main()

