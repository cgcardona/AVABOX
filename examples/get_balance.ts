import { AVABOX } from "../src/AVABOX"

const main = async (): Promise<any> => {
  const config = {
    fullNodeHost: "ip.address.of.node",
    fullNodePort: 9650,
    fullNodeProtocol: "http",
    networkId: 12345

  }
  const avabox: AVABOX = new AVABOX(config)
  const XChain = avabox.XChain
  const address: string =  "X-GMQasdep6PraTrSfSbggcZFKJ3WsHYT17"
  const balance: Promise<number> = await XChain.getBalance(address)
  console.log(balance)
}

main()

