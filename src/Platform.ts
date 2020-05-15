/**
 * @module Platform
 */
import { IConfig } from "./interfaces"
import { AxiosResponse } from "axios"
import { httpRequest } from "./AVM"

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
    const response: AxiosResponse = await httpRequest(`${this.url}/ext/P`, 'platform.createBlockchain', {
      vmID: vmID,
      name: name,
      payerNonce: payerNonce,
      genesisData: genesis,
      subnetID: subnetID
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
    const response: AxiosResponse = await httpRequest(`${this.url}/ext/P`, 'platform.getBlockchainStatus', {
      blockchainID: blockchainID
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
  async createAccount(username: string, password: string, privateKey: string): Promise<string> {
    const response: AxiosResponse = await httpRequest(`${this.url}/ext/P`, 'platform.createAccount', {
      username: username,
      password: password,
      privateKey: privateKey
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
    const response: AxiosResponse = await httpRequest(`${this.url}/ext/P`, 'platform.importAVA', {
      to: to,
      amount: amount,
      payerNonce: payerNonce,
      username: username,
      password: password
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
    const response: AxiosResponse = await httpRequest(`${this.url}/ext/P`, 'platform.issueTx', {
      tx: tx
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
    const response: AxiosResponse = await httpRequest(`${this.url}/ext/P`, 'platform.getAccount', {
      address: address,
      assetID: assetID
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
    const response: AxiosResponse = await httpRequest(`${this.url}/ext/P`, 'platform.listAccounts', {
      username: username,
      password: password
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
    const response: AxiosResponse = await httpRequest(`${this.url}/ext/P`, 'platform.addDefaultSubnetValidator', {
      id: id,
      destination: destination,
      stakeAmount: stakeAmount,
      startTime: startTime,
      endTime: endTime,
      payerNonce: payerNonce
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
    const response: AxiosResponse = await httpRequest(`${this.url}/ext/P`, 'platform.addNonDefaultSubnetValidator', {
      id: id,
      subnet: subnetID,
      startTime: startTime.getTime()/1000,
      endTime: endTime.getTime()/1000,
      weight: weight,
      payerNonce: Math.floor(payerNonce),
      subnetID: subnetID
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
    const response: AxiosResponse = await httpRequest(`${this.url}/ext/P`, 'platform.sign', {
      tx: tx,
      signer: signer,
      username: username,
      password: password
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
    const response: AxiosResponse = await httpRequest(`${this.url}/ext/P`, 'platform.getPendingValidators', {})

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
    const response: AxiosResponse = await httpRequest(`${this.url}/ext/P`, 'platform.sampleValidators', {
      size: size,
      subnetID: subnetID
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
    const response: AxiosResponse = await httpRequest(`${this.url}/ext/P`, 'platform.getCurrentValidators', {})

    return response.data.result.validators
  }
}