import { IConfig } from "./interfaces"
import axios from 'axios';

export class PChain {
  config: IConfig

  constructor(config: IConfig = {
    networkId: 12345,
    fullNodeHost: "localhost",
    fullNodePort: 9650,
    fullNodeProtocol: "http"
  }) {
    this.config = config
  }
  
  async getAccount(address: string) {
    const response = await axios.post(`${this.config.fullNodeProtocol}://${this.config.fullNodeHost}:${this.config.fullNodePort}/ext/bc/P`, {
      jsonrpc: "2.0",
      id: 3,
      method: "platform.getAccount",
      params: {
        address: address
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.data.result
  }
}