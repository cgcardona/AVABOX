import config from './config'
import { Wallet } from "./Wallet"

export class AVABOX {
  public Wallet: Wallet

  constructor() {
    this.Wallet = new Wallet(config)
  }
}