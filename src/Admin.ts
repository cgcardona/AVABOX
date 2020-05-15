import { IConfig } from "./interfaces"
import axios, { AxiosResponse } from "axios"


export class Admin {
  config: IConfig
  url: string

  constructor(config: IConfig = {
    networkId: 12345,
    fullNodeHost: "localhost",
    fullNodePort: 9650,
    fullNodeProtocol: "http"
  }) {
    this.config = config
    this.url = `${this.config.fullNodeProtocol}://${this.config.fullNodeHost}:${this.config.fullNodePort}`
  }
  
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