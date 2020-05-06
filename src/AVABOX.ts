import config from './config'

export class AVABOX {
  constructor() {
  }

  async getBalance(): Promise<any> {
    return config.networkId
  }
}