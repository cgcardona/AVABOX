import { AVABOX } from "./AVABOX"

let main = async (): Promise<any> => {
  let config = {
    fullNodeHost: "ip.address.of.node",
    fullNodePort: 9650,
    fullNodeProtocol: "http",
    networkId: 12345

  }
  const avabox: AVABOX = new AVABOX(config)
  const XChain: XChain = avabox.XChain
  let address: string =  "X-GMQasdep6PraTrSfSbggcZFKJ3WsHYT17"
  let balance: Promise<number> = await XChain.getBalance(address)
  console.log(balance)
}

main()

