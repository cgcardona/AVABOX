import { AVABOX } from "./AVABOX"

let main = async (): Promise<any> => {
  let config = {
    fullNodeHost: "ip.address.of.node",
    fullNodePort: 9650,
    fullNodeProtocol: "http",
    networkId: 12345

  }
  const avabox: AVABOX = new AVABOX(config)
  const Admin = avabox.Admin
  let nodeId: Promise<string> = await Admin.getNodeID()
  console.log(nodeId)
}

main()

