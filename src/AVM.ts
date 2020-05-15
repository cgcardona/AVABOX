import { IConfig } from './interfaces'
import axios, { AxiosResponse } from 'axios'

export class AVM {
  config: IConfig
  url: string

  constructor(config: IConfig = {
    networkId: 12345,
    fullNodeHost: 'localhost',
    fullNodePort: 9650,
    fullNodeProtocol: 'http'
  }) {
    this.config = config
    this.url = `${this.config.fullNodeProtocol}://${this.config.fullNodeHost}:${this.config.fullNodePort}`
  }
  
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