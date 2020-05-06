import * as slopes from "slopes";
import { IConfig } from "./interfaces"
import axios from 'axios';

export class XChain {
  config: IConfig

  constructor(config: IConfig = {
    networkId: 12345,
    fullNodeHost: "localhost",
    fullNodePort: 9650,
    fullNodeProtocol: "http"
  }) {
    this.config = config
  }

  async getBalance(address: string) {
    const response = await axios.post(`${this.config.fullNodeProtocol}://${this.config.fullNodeHost}:${this.config.fullNodePort}/ext/bc/X`, {
      jsonrpc: "2.0",
      id: 3,
      method: "avm.getBalance",
      params: {
        address: address,
        assetID: "AVA"
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.data.result.balance
  }
}