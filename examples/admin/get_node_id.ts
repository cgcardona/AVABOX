import { Admin } from '../../src/Admin'
import { Config } from '../../src/interfaces/config_interface'

const main = async (): Promise<any> => {
  const config: Config = {
    fullNodeHost: 'ip.of.full.node',
    fullNodePort: 9650,
    fullNodeProtocol: 'http',
    networkId: 12345
  }

  const admin = new Admin(config)
  const nodeId: string = await admin.getNodeID()
  console.log(nodeId)
}

main()
