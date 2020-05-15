/**
 * @module Admin
 */
import { IConfig } from "./interfaces"
import axios, { AxiosResponse } from "axios"
import { httpRequest } from "./AVM"

export class Admin {
  config: IConfig
  url: string
 
  /**
  * Creates a new Admin instance.
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
  * Get node ID
  * 
  * @returns nodeID
  */
  async getNodeID(): Promise<string> {
    const response: AxiosResponse = await httpRequest(`${this.url}/ext/admin`, 'admin.getNodeID', {})

    return response.data.result.nodeID
  }
  
  /**
  * Get network ID
  * 
  * @returns networkID
  */
  async getNetworkID(): Promise<number> {
    const response: AxiosResponse = await httpRequest(`${this.url}/ext/admin`, 'admin.getNetworkID', {})

    return response.data.result.networkID
  }
  
  /**
  * Get peers
  * 
  * @returns peers
  */
  async getPeers(): Promise<string[]> {
    const response: AxiosResponse = await httpRequest(`${this.url}/ext/admin`, 'admin.peers', {})

    return response.data.result.peers
  }
  
  /**
  * Get chain aliases
  * 
  * @param chainID the chain ID
  * 
  * @returns Aliases 
  */
  async getChainAliases(chainID: string): Promise<string[]> {
    const response: AxiosResponse = await httpRequest(`${this.url}/ext/admin`, 'admin.getChainAliases', {
      ChainID: chainID
    })

    return response.data.result.Aliases
  }

  /**
  * Start CPU Profiler
  * 
  * @param filename the filename
  * 
  * @returns success
  */
  async startCPUProfiler(filename: string): Promise<boolean> {
    const response: AxiosResponse = await httpRequest(`${this.url}/ext/admin`, 'admin.startCPUProfiler', {
      filename: filename
    })

    return response.data.result.success
  }
  
  /**
  * Stop CPU Profiler
  * 
  * @returns success
  */
  async stopCPUProfiler(): Promise<boolean> {
    const response: AxiosResponse = await httpRequest(`${this.url}/ext/admin`, 'admin.stopCPUProfiler', {})

    return response.data.result.success
  }
  
  /**
  * Memory Profile
  * 
  * @param filename the filename
  * 
  * @returns success
  */
  async memoryProfile(filename: string): Promise<boolean> {
    const response: AxiosResponse = await httpRequest(`${this.url}/ext/admin`, 'admin.memoryProfile', {
      filename: filename
    })

    return response.data.result.success
  }
  
  /**
  * Lock Profile
  * 
  * @param filename the filename
  * 
  * @returns success
  */
  async lockProfile(filename: string): Promise<boolean> {
    const response: AxiosResponse = await httpRequest(`${this.url}/ext/admin`, 'admin.lockProfile', {
      filename: filename
    })

    return response.data.result.success
  }
}