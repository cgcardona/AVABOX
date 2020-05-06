import { AVABOX } from "./AVABOX"

const avabox: AVABOX = new AVABOX()

let main= (): any => {
  let networkId: number = avabox.getNetworkId();
  console.log(networkId);

  let fullNodeHost: string = avabox.getFullNodeHost();
  console.log(fullNodeHost);

  let fullNodePort: number = avabox.getFullNodePort();
  console.log(fullNodePort);

  let fullNodeProtocol: string = avabox.getFullNodeProtocol();
  console.log(fullNodeProtocol);
}

main()