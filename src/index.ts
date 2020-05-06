import config from './config'
import { AVABOX } from "./AVABOX"
import { Wallet } from "./Wallet"

const avabox: AVABOX = new AVABOX()

let main= (): any => {
  console.log(avabox.Wallet)
  // let wallet: Wallet = avabox.Wallet

  // let networkId: number = avabox.getNetworkId();
  // console.log(networkId);

  // let fullNodeHost: string = avabox.getFullNodeHost();
  // console.log(fullNodeHost);

  // let fullNodePort: number = avabox.getFullNodePort();
  // console.log(fullNodePort);

  // let fullNodeProtocol: string = avabox.getFullNodeProtocol();
  // console.log(fullNodeProtocol);
}

main()