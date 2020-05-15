import { AVABOX } from '../../src/AVABOX'
import { Admin } from '../../src/Admin'
import { Config } from '../../src/interfaces/config_interface'

const main = async (): Promise<any> => {
  const config: Config = {
    fullNodeHost: 'ip.of.full.node',
    fullNodePort: 9650,
    fullNodeProtocol: 'http',
    networkId: 12345
  }

  const avabox: AVABOX = new AVABOX(config)
  const Admin: Admin = avabox.Admin
  const nodeId: string = await Admin.getNodeID()
  console.log(nodeId)
}

main()
