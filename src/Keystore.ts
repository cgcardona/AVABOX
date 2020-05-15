import { IConfig } from "./interfaces"
import axios, { AxiosResponse } from "axios"

export class Keystore {
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
  
  async createUser(username: string, password: string): Promise<boolean> {
    const response: AxiosResponse = await axios.post(`${this.url}/ext/keystore`, {
      jsonrpc: "2.0",
      id: 1,
      method: "keystore.createUser",
      params: {
        "username": username,
        "password": password
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.data.result.success
  }
}