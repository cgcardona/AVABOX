import { AVABOX } from '../../src/AVABOX'
import { Config } from '../../src/interfaces/config_interface'

const main = async (): Promise<any> => {
  const config: Config = {
    fullNodeHost: 'ip.of.full.node',
    fullNodePort: 9650,
    fullNodeProtocol: 'http',
    networkId: 12345

  }
  const avabox: AVABOX = new AVABOX(config)
  const Admin = avabox.Admin
  const peers: string[] = await Admin.getPeers()
  console.log(peers)
}

main()
