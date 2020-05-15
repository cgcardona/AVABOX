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
  * @param username Name of the user to create the address under
  * @param password Password to unlock the user and encrypt the private key
  * 
  * @returns True on success, false on failure
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
  * Gets the balance of a particular asset on a blockchain.
  * 
  * @param address The address to pull the asset balance from
  * @param assetID The assetID to pull the balance from
  * 
  * @returns Promise with the balance of the assetID as a {@link https://github.com/indutny/bn.js/|BN} on the provided address for the blockchain.
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
  * Send AVA from the X-Chain to an account on the P-Chain.
  * 
  * After calling this method, you must call the P-Chain’s importAVA method to complete the transfer.
  * 
  * @param to The acount on the P-Chain to send the AVA to. Do not include P- in the address
  * @param amount Amount of AVA to export as a {@link https://github.com/indutny/bn.js/|BN}
  * @param username The Keystore user that controls the P-Chain account specified in `to`
  * @param password The password of the Keystore user
  * 
  * @returns Promise for an unsigned transaction to be signed by the account the the AVA is sent from and pays the transaction fee.
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
  * Returns the status of a provided transaction ID by calling the node's `getTxStatus` method.
  * 
  * @param txid The string representation of the transaction ID
  * 
  * @returns Returns a Promise<string> containing the status retrieved from the node
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