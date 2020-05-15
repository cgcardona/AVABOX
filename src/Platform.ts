/**
 * @module Platform
 */
import { IConfig } from "./interfaces"
import axios, { AxiosResponse } from "axios"

export class Platform {
  config: IConfig
  url: string

  /**
  * Creates a new Platform instance.
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
  
  async createAccount(username: string, password: string): Promise<string> {
    const response: AxiosResponse = await axios.post(`${this.url}/ext/P`, {
      jsonrpc: "2.0",
      id: 1,
      method: "platform.createAccount",
      params: {
        "username": username,
        "password": password
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.data.result.address
  }
  
  async importAVA(to: string, amount: number, payerNonce: number, username: string, password: string): Promise<object> {
    const response: AxiosResponse = await axios.post(`${this.url}/ext/P`, {
      jsonrpc: "2.0",
      id: 1,
      method: "platform.importAVA",
      params: {
        "to": to,
        "amount": amount,
        "payerNonce": payerNonce,
        "username": username,
        "password": password
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.data.result.validators
  }
  
  async issueTx(tx: string): Promise<string> {
    const response: AxiosResponse = await axios.post(`${this.url}/ext/P`, {
      jsonrpc: "2.0",
      id: 1,
      method: "platform.issueTx",
      params: {
        "tx": tx
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.data.result.txID
  }

  async getAccount(address: string, assetID: string): Promise<any> {
    const response: AxiosResponse = await axios.post(`${this.url}/ext/P`, {
      jsonrpc: "2.0",
      id: 1,
      method: "platform.getAccount",
      params: {
        "address": address,
        "assetID": assetID
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.data.result
  }

  async addDefaultSubnetValidator(id: string, destination: string, stakeAmount: number, startTime: number, endTime: number, payerNonce: number): Promise<string> {
    const response: AxiosResponse = await axios.post(`${this.url}/ext/P`, {
      jsonrpc: "2.0",
      id: 1,
      method: "platform.addDefaultSubnetValidator",
      params: {
        "id": id,
        "destination": destination,
        "stakeAmount": stakeAmount,
        "startTime": startTime,
        "endTime": endTime,
        "payerNonce": payerNonce
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.data.result.unsignedTx
  }

  async sign(tx: string, signer: string, username: string, password: string): Promise<string> {
    const response: AxiosResponse = await axios.post(`${this.url}/ext/P`, {
      jsonrpc: "2.0",
      id: 1,
      method: "platform.sign",
      params: {
        "tx": tx,
        "signer": signer,
        "username": username,
        "password": password
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.data.result.tx
  }

  async getPendingValidators(): Promise<object[]> {
    const response: AxiosResponse = await axios.post(`${this.url}/ext/P`, {
      jsonrpc: "2.0",
      id: 1,
      method: "platform.getPendingValidators"
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.data.result.validators
  }

  async getCurrentValidators(): Promise<object[]> {
    const response: AxiosResponse = await axios.post(`${this.url}/ext/P`, {
      jsonrpc: "2.0",
      id: 1,
      method: "platform.getCurrentValidators"
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.data.result.validators
  }
}