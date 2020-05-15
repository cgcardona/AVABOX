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

  /**
  * Creates a blockchain.
  * 
  * @param vmID
  * @param name
  * @param payerNonce
  * @param genesis
  * @param subnetID Optional
  * 
  * @returns blockchainID
  */
  async createBlockchain(vmID: string, name: string, payerNonce: number, genesis: string, subnetID: string = ""): Promise<string> {
    const response: AxiosResponse = await axios.post(`${this.url}/ext/P`, {
      jsonrpc: "2.0",
      id: 1,
      method: "platform.createBlockchain",
      params: {
        "vmID": vmID,
        "name": name,
        "payerNonce": payerNonce,
        "genesisData": genesis,
        "subnetID": subnetID
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.data.result.blockchainID
  }

  /**
  * Get blockchain status
  * 
  * @param blockchainID
  * 
  * @returns status
  */
  async getBlockchainStatus(blockchainID: string): Promise<string> {
    const response: AxiosResponse = await axios.post(`${this.url}/ext/P`, {
      jsonrpc: "2.0",
      id: 1,
      method: "platform.getBlockchainStatus",
      params: {
        "blockchainID": blockchainID
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.data.result.status
  }
  
  /**
  * Create account
  * 
  * @param username
  * @param password
  * @param privateKey
  * 
  * @returns address
  */
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
  
  /**
  * Import AVA
  * 
  * @param to
  * @param payerNonce
  * @param username
  * @param password
  * 
  * @returns txID
  */
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

    return response.data.result.txID
  }
  
  /**
  * Issue transaction
  *  
  * @param tx
  * 
  * @returns txID
  */
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

  /**
  * Get account
  * 
  * @param address
  * 
  * @returns result
  */
  async getAccount(address: string, assetID: string): Promise<object> {
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

  /**
  * List accounts
  * 
  * @param username
  * @param password
  * 
  * @returns accounts
  */
  async listAccounts(username: string, password: string): Promise<object[]> {
    const response: AxiosResponse = await axios.post(`${this.url}/ext/P`, {
      jsonrpc: "2.0",
      id: 1,
      method: "platform.listAccounts",
      params: {
        "username": username,
        "password": password
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.data.accounts
  }

  /**
  * Add a default subnet validator
  * 
  * @param id
  * @param startTime
  * @param endTime
  * @param stakeAmount
  * @param payerNonce
  * @param destination
  * @param delegationFeeRate Optional
  * @param subnetID Optional
  * 
  * @returns unsignedTx
  */
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

  /**
  * Add a non default subnet validator
  * 
  * @param id
  * @param subnetID
  * @param startTime
  * @param endTime
  * @param weight
  * @param payerNonce
  * 
  * @returns unsignedTx
  */
  async addNonDefaultSubnetValidator(id:string, subnetID:Buffer | string, startTime:Date, endTime:Date, weight:number, payerNonce:number): Promise<string> {
    const response: AxiosResponse = await axios.post(`${this.url}/ext/P`, {
      jsonrpc: "2.0",
      id: 1,
      method: "platform.addNonDefaultSubnetValidator",
      params: {
        "id": id,
        "subnet": subnetID,
        "startTime": startTime.getTime()/1000,
        "endTime": endTime.getTime()/1000,
        "weight": weight,
        "payerNonce": Math.floor(payerNonce),
        "subnetID": subnetID
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.data.result.unsignedTx
  }

  /**
  * Sign
  * 
  * @param tx
  * @param signer
  * @param username
  * @param password
  * 
  * @returns tx
  */
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

  /**
  * Get pending validators
  * 
  * @param subnetID Optional
  * 
  * @returns validators
  * 
  */
  async getPendingValidators(): Promise<object[]> {
    const response: AxiosResponse = await axios.post(`${this.url}/ext/P`, {
      jsonrpc: "2.0",
      id: 1,
      method: "platform.getPendingValidators",
      params: {}
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.data.result.validators
  }

  /**
  * Sample validators
  * 
  * @param size
  * @param subnetID Optional
  * 
  * @returns validators
  */
  async sampleValidators(size: number, subnetID: string = ""): Promise<string[]> {
    const response: AxiosResponse = await axios.post(`${this.url}/ext/P`, {
      jsonrpc: "2.0",
      id: 1,
      method: "platform.sampleValidators",
      params: {
        "size": size,
        "subnetID": subnetID
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.data.result.validators
  }

  /**
  * Get current validators
  * 
  * @param subnetID Optional
  * 
  * @returns validators
  * 
  */
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