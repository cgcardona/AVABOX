/**
 * @module AVM
 */
import { IConfig } from './interfaces'
import axios, { AxiosResponse } from 'axios'

export class AVM {
  config: IConfig
  url: string

  /**
  * Creates a new AVM instance.
  * 
  * @param config Configuration object with 
  *   * networkId
  *   * fullNodeHost
  *   * fullNodePort
  *   * fullNodeProtocol
  */
  constructor(config: IConfig = {
    networkId: 12345,
    fullNodeHost: 'localhost',
    fullNodePort: 9650,
    fullNodeProtocol: 'http'
  }) {
    this.config = config
    this.url = `${this.config.fullNodeProtocol}://${this.config.fullNodeHost}:${this.config.fullNodePort}`
  }
  
  /**
  * Create X Address
  * 
  * @param username
  * @param password
  * 
  * @returns address
  */
  async createAddress(username: string, password: string): Promise<string> {
    const response: AxiosResponse = await axios.post(`${this.url}/ext/bc/X`, {
      jsonrpc: '2.0',
      id: 1,
      method: 'avm.createAddress',
      params: {
        'username': username,
        'password': password
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.data.result.address
  }
  
  /**
  * Get the balance for an address by assetID
  * 
  * @param address
  * @param assetID
  * 
  * @returns balance
  */
  async getBalance(address: string, assetID: string = 'AVA'): Promise<string> {
    const response: AxiosResponse = await axios.post(`${this.url}/ext/bc/X`, {
      jsonrpc: '2.0',
      id: 1,
      method: 'avm.getBalance',
      params: {
        'address': address,
        'assetID': assetID
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.data.result.balance
  }
  
  /**
  * After calling this method, you must call the P-Chain’s importAVA method to complete the transfer.
  * 
  * @param to
  * @param amount
  * @param username
  * @param password
  * 
  * @returns txID
  */
  async exportAVA(to: string, amount: string = 'AVA', username: string, password: string): Promise<string> {
    const response: AxiosResponse = await axios.post(`${this.url}/ext/bc/X`, {
      jsonrpc: '2.0',
      id: 1,
      method: 'avm.exportAVA',
      params: {
        'to': to,
        'amount': amount,
        'username': username,
        'password': password
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.data.result.txID
  }
  
  /**
  * Get transactions status by ID 
  * 
  * @param txid 
  * 
  * @returns status
  */
  async getTxStatus(txID: string): Promise<string> {
    const response: AxiosResponse = await axios.post(`${this.url}/ext/bc/X`, {
      jsonrpc: '2.0',
      id: 1,
      method: 'avm.getTxStatus',
      params: {
        'txID': txID
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.data.result.status
  }
}