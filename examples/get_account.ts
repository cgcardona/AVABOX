import { AVABOX } from "../src/AVABOX"

const main = async (): Promise<any> => {
  const config = {
    fullNodeHost: "ip.address.of.node",
    fullNodePort: 9650,
    fullNodeProtocol: "http",
    networkId: 12345

  }
  const avabox: AVABOX = new AVABOX(config)
  const PChain = avabox.PChain
  const address: string =  "Bg6e45gxCUTLXcfUuoy3go2U6V3bRZ5jH"
  const account: Promise<number> = await PChain.getAccount(address)
  console.log(account)
}

main()

