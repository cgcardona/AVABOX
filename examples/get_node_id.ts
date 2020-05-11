import { AVABOX } from "../src/AVABOX"

const main = async (): Promise<any> => {
  const config = {
    fullNodeHost: "ip.address.of.node",
    fullNodePort: 9650,
    fullNodeProtocol: "http",
    networkId: 12345

  }
  const avabox: AVABOX = new AVABOX(config)
  const Admin = avabox.Admin
  const nodeId: Promise<string> = await Admin.getNodeID()
  console.log(nodeId)
}

main()

