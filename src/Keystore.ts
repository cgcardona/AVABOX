/**
 * @module Keystore
 */
import { IConfig } from "./interfaces"
import axios, { AxiosResponse } from "axios"

export class Keystore {
  config: IConfig
  url: string

  /**
  * Creates a new Keystore instance.
  * 
  * @param config Configuration object with 
  *   * networkId
  *   * fullNodeHost
  *   * fullNodePort
  *   * fullNodeProtocol
  */
  constructor(config: IConfig = {
    networkId: 12345,
    fullNodeHost: "localhost",
    fullNodePort: 9650,
    fullNodeProtocol: "http"
  }) {
    this.config = config
    this.url = `${this.config.fullNodeProtocol}://${this.config.fullNodeHost}:${this.config.fullNodePort}`
  }
  
  /**
  * Creates a user in the node's database.
  * 
  * @param username Name of the user to create
  * @param password Password for the user
  * 
  * @returns Promise for a boolean with true on success
  */
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