/**
 * @module Keystore
 */
import { IConfig } from "./interfaces"
import { AxiosResponse } from "axios"
import { httpRequest } from "./AVM"

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
  * Create a user
  * 
  * @param username
  * @param password
  * 
  * @returns success
  */
  async createUser(username: string, password: string): Promise<boolean> {
    const response: AxiosResponse = await httpRequest(`${this.url}/ext/keystore`, 'keystore.createUser', {
      username: username,
      password: password
    })

    return response.data.result.success
  }

  /**
  * Export a user
  * 
  * @param username
  * @param password
  * 
  * @returns user
  */
  async exportUser(username: string, password: string): Promise<string> {
    const response: AxiosResponse = await httpRequest(`${this.url}/ext/keystore`, 'keystore.exportUser', {
      username: username,
      password: password
    })

    return response.data.result.user
  }

  /**
  * Imports a user file into the node's user database and assigns it to a username.
  * 
  * @param username
  * @param password
  * @param user
  * 
  * @returns success.
  */
  async importUser(username: string ,password: string, user: string): Promise<boolean> {
    const response: AxiosResponse = await httpRequest(`${this.url}/ext/keystore`, 'keystore.importUser', {
      username: username,
      password: password,
      user: user
    })

    return response.data.result.success
  }

  /**
  * List users
  * 
  * @returns users
  */
  async listUsers(): Promise<string[]> {
    const response: AxiosResponse = await httpRequest(`${this.url}/ext/keystore`, 'keystore.listUsers', {})

    return response.data.result.users
  }
}