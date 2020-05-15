/**
 * @module Admin
 */
import { IConfig } from "./interfaces"
import axios, { AxiosResponse } from "axios"

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
    const response: AxiosResponse = await axios.post(`${this.url}/ext/admin`, {
      jsonrpc: "2.0",
      id: 3,
      method: "admin.getNodeID",
      params: {}
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data.result.nodeID
  }
  
  /**
  * Get network ID
  * 
  * @returns networkID
  */
  async getNetworkID(): Promise<number> {
    const response: AxiosResponse = await axios.post(`${this.url}/ext/admin`, {
      jsonrpc: "2.0",
      id: 3,
      method: "admin.getNetworkID",
      params: {}
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data.result.networkID
  }
  
  /**
  * Get peers
  * 
  * @returns peers
  */
  async getPeers(): Promise<string[]> {
    const response: AxiosResponse = await axios.post(`${this.url}/ext/admin`, {
      jsonrpc: "2.0",
      id: 3,
      method: "admin.peers",
      params: {}
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

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
    const response: AxiosResponse = await axios.post(`${this.url}/ext/admin`, {
      jsonrpc: "2.0",
      id: 3,
      method: "admin.getChainAliases",
      params: {
        "ChainID": chainID
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
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
    const response: AxiosResponse = await axios.post(`${this.url}/ext/admin`, {
      jsonrpc: "2.0",
      id: 3,
      method: "admin.startCPUProfiler",
      params: {
        "filename": filename
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.data.result.success
  }
  
  /**
  * Stop CPU Profiler
  * 
  * @returns success
  */
  async stopCPUProfiler(): Promise<boolean> {
    const response: AxiosResponse = await axios.post(`${this.url}/ext/admin`, {
      jsonrpc: "2.0",
      id: 3,
      method: "admin.stopCPUProfiler"
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

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
    const response: AxiosResponse = await axios.post(`${this.url}/ext/admin`, {
      jsonrpc: "2.0",
      id: 3,
      method: "admin.memoryProfile",
      params: {
        "filename": filename
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
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
    const response: AxiosResponse = await axios.post(`${this.url}/ext/admin`, {
      jsonrpc: "2.0",
      id: 3,
      method: "admin.lockProfile",
      params: {
        "filename": filename
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.data.result.success
  }
}