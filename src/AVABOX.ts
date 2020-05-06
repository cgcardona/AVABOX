import { Wallet } from "./Wallet"
import { XChain } from "./XChain"
import { PChain } from "./PChain"
import { CChain } from "./CChain"
import { IConfig } from "./interfaces"

export class AVABOX {
  public Wallet: Wallet
  public XChain: XChain
  public PChain: PChain
  public CChain: CChain

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
    this.XChain = new XChain(config)
    this.PChain = new PChain(config)
    this.CChain = new CChain(config)
  }
}