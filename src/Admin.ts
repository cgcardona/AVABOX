import { IConfig } from "./interfaces"
import axios from "axios"


export class Admin {
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
  
  async getNodeID(): Promise<string> {
    const response = await axios.post(`${this.url}/ext/admin`, {
      jsonrpc: "2.0",
      id: 3,
      method: "admin.getNodeID",
      params: {}
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data.result.nodeID
  }
  
  async getPeers(): Promise<string[]> {
    const response = await axios.post(`${this.url}/ext/admin`, {
      jsonrpc: "2.0",
      id: 3,
      method: "admin.peers",
      params: {}
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.data.result.peers
  }
}