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

  /**
  * Exports a user. The user can be imported to another node with keystore.importUser .
  * 
  * @param username The name of the user to export
  * @param password The password of the user to export
  * 
  * @returns Promise with a string importable using importUser
  */
  async exportUser(username: string, password: string): Promise<string> {
    const response: AxiosResponse = await axios.post(`${this.url}/ext/keystore`, {
      jsonrpc: "2.0",
      id: 1,
      method: "keystore.exportUser",
      params: {
        "username": username,
        "password": password
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.data.result.user
  }

  /**
  * Imports a user file into the node's user database and assigns it to a username.
  * 
  * @param username The name the user file should be imported into
  * @param user AVA serialized string represetning a user's data
  * @param password The user's password
  * 
  * @returns A promise with a true-value on success.
  */
  async importUser(username: string, user: string ,password: string): Promise<boolean> {
    const response: AxiosResponse = await axios.post(`${this.url}/ext/keystore`, {
      jsonrpc: "2.0",
      id: 1,
      method: "keystore.importUser",
      params: {
        "username": username,
        "user": user,
        "password": password
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.data.result.success
  }

  /**
  * Lists the names of all users on the node.
  * 
  * @returns Promise of an array with all user names.
  */
  async listUsers(): Promise<string[]> {
    const response: AxiosResponse = await axios.post(`${this.url}/ext/keystore`, {
      jsonrpc: "2.0",
      id: 1,
      method: "keystore.listUsers",
      params: {}
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.data.result.users
  }
}