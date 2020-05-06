import config from './config'

export class AVABOX {
  constructor() {
  }

  getNetworkId(): number {
    return config.networkId
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