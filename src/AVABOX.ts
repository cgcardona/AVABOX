/**
 * @module AVABOX
 */
import { Wallet } from "./Wallet"
import { XChain } from "./XChain"
import { PChain } from "./PChain"
import { CChain } from "./CChain"
import { Admin } from "./Admin"
import { IConfig } from "./interfaces"

export class AVABOX {
  public Wallet: Wallet
  public XChain: XChain
  public PChain: PChain
  public CChain: CChain
  public Admin: Admin

  /**
  * Creates a new AVABOX instance.
  * 
  * @param config Configuration object with 
  *   * networkId
  *   * fullNodeHost
  *   * fullNodePort
  *   * fullNodeProtocol
  */
  constructor(config: IConfig = {
    networkId: 12345,
    fullNodeHost: "localhost",
    fullNodePort: 9650,
    fullNodeProtocol: "http"
  }) {
    this.Wallet = new Wallet(config)
    this.XChain = new XChain(config)
    this.PChain = new PChain(config)
    this.CChain = new CChain(config)
    this.Admin = new Admin(config)
  }
}