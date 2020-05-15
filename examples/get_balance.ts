import { AVM } from '../src/AVM'
import { Config } from '../src/interfaces/config_interface'

const main = async (): Promise<any> => {
  const config: Config = {
    fullNodeHost: 'ip.of.full.node',
    fullNodePort: 9650,
    fullNodeProtocol: 'http',
    networkId: 12345

  }
  const avm: AVM = new AVM(config)
  const address: string =  'X-GzNySBE2zK7cLoGhFGUZoZg57x689L6J7'
  const assetID: string = '2BKo2z3qnMhUNFdD2nkMMGT4iV5QCZwRuBeegyXejbhG1JCp8j'
  const balance: number = await avm.getBalance(address, assetID)
  console.log(balance)
}

main()

