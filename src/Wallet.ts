import config from './config'
import * as slopes from "slopes";
import { IConfig } from "./interfaces"

export class Wallet {
  public ava: slopes.Slopes
  public avm: slopes.AVM

  constructor(config: IConfig) {
    this.ava = new slopes.Slopes(
      config.fullNodeHost,
      config.fullNodePort,
      config.fullNodeProtocol,
      config.networkId
    );
  
    this.avm = this.ava.AVM();
  }

  public getKeychain(): slopes.AVMKeyChain {
    return this.avm.keyChain();
  }

  public getFullNodeHost(): string {
    return config.fullNodeHost
  }

  public getFullNodePort(): number {
    return config.fullNodePort
  }

  public getFullNodeProtocol(): string {
    return config.fullNodeProtocol
  }
}