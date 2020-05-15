import { IConfig } from "./interfaces"
import axios from 'axios';

export class XChain {
  config: IConfig
  url: string

  constructor(config: IConfig = {
    networkId: 12345,
    fullNodeHost: "localhost",
    fullNodePort: 9650,
    fullNodeProtocol: "http"
  }) {
    this.config = config
    this.url = `${this.config.fullNodeProtocol}://${this.config.fullNodeHost}:${this.config.fullNodePort}`
  }

  async getBalance(address: string, assetID: string = 'AVA') {
    const response = await axios.post(`${this.url}/ext/bc/X`, {
      jsonrpc: "2.0",
      id: 3,
      method: "avm.getBalance",
      params: {
        address: address,
        assetID: assetID
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.data.result.balance
  }
}