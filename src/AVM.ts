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
    const response: AxiosResponse = await httpRequest(`${this.url}/ext/X`, 'avm.createAddress', {
      username: username,
      password: password
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
  async getBalance(address: string, assetID: string = 'AVA'): Promise<number> {
    const response: AxiosResponse = await httpRequest(`${this.url}/ext/X`, 'avm.getBalance', {
      address: address,
      assetID: assetID
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
    const response: AxiosResponse = await httpRequest(`${this.url}/ext/X`, 'avm.exportAVA', {
      to: to,
      amount: amount,
      username: username,
      password: password
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
    const response: AxiosResponse = await httpRequest(`${this.url}/ext/X`, 'avm.getTxStatus', {
      txID: txID
    })

    return response.data.result.status
  }
}

/**
* 
* @ignore
* 
*/
export const httpRequest = async (url: string, method: string, params: object): Promise<any> => {
  const response: AxiosResponse = await axios.post(url, {
    jsonrpc: '2.0',
    id: 1,
    method: method,
    params: params
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response
}