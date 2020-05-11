import { AVABOX } from '../src/AVABOX'
import { Config } from '../src/interfaces/config_interface'

const main = async (): Promise<any> => {
  const config: Config = {
    fullNodeHost: 'ip.of.full.node',
    fullNodePort: 9650,
    fullNodeProtocol: 'http',
    networkId: 12345

  }
  const avabox: AVABOX = new AVABOX(config)
  const XChain = avabox.XChain
  const address: string =  'X-GzNySBE2zK7cLoGhFGUZoZg57x689L6J7'
  const assetId: string = '2BKo2z3qnMhUNFdD2nkMMGT4iV5QCZwRuBeegyXejbhG1JCp8j'
  const balance: Promise<number> = await XChain.getBalance(address, assetId)
  console.log(balance)
}

main()

