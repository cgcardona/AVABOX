import config from './config'
import * as slopes from "slopes";

export class Wallet {
  public ava: slopes.Slopes
  public avm: slopes.AVM

  constructor(config) {
    this.ava = new slopes.Slopes(
      config.fullNodeHost,
      config.fullNodePort,
      config.fullNodeProtocol,
      config.networkId
    );
  
    this.avm = this.ava.AVM();
  }

  keychain(): slopes.AVMKeyChain {
    return this.avm.keyChain();
  }

  getFullNodeHost(): string {
    return config.fullNodeHost
  }

  getFullNodePort(): number {
    return config.fullNodePort
  }

  getFullNodeProtocol(): string {
    return config.fullNodeProtocol
  }
}