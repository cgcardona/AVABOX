import { Wallet } from "./Wallet"
import { IConfig } from "./interfaces"

export class AVABOX {
  public Wallet: Wallet

  constructor(config: IConfig = {
    // TODO - Get comment docs working
    /**
    * foo, bar, baz
    * 
    * @param stuff lorem ipsum
    * 
    * @returns dolar set amit
    */
    networkId: 12345,
    fullNodeHost: "localhost",
    fullNodePort: 9650,
    fullNodeProtocol: "http"
  }) {
    this.Wallet = new Wallet(config)
  }
}