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
  * The P-Chain uses an account model. This method creates a P-Chain account on an existing user in the Keystore.
  * 
  * @param username The username of the Keystore user that controls the new account
  * @param password The password of the Keystore user that controls the new account
  * @param privateKey The private key that controls the account. If omitted, a new private key is generated
  * 
  * @returns Promise for a string of the newly created account address.
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
  * Send AVA from an account on the P-Chain to an address on the X-Chain. This transaction must be signed with the key of the account that the AVA is sent from and which pays the transaction fee. After issuing this transaction, you must call the X-Chain’s importAVA method to complete the transfer.
  * 
  * @param to The ID of the account the AVA is sent to. This must be the same as the to argument in the corresponding call to the X-Chain’s exportAVA
  * @param payerNonce The next unused nonce of the account specified in `to`
  * @param username The Keystore user that controls the account specified in `to`
  * @param password The password of the Keystore user
  * 
  * @returns Promise for a string for the transaction, which should be sent to the network by calling issueTx.
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

    return response.data.result.validators
  }
  
  /**
  * Issue a transaction to the Platform Chain. 
  *  
  * @param tx The base 58 (with checksum) representation of a transaction
  * 
  * @returns Promise for an string of the transaction after being signed.
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
  * The P-Chain uses an account model. An account is identified by an address. This method returns the account with the given address.
  * 
  * @param address The address of the account
  * 
  * @returns Promise for an object containing the address, the nonce, and the balance.
  */
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

  /**
  * Add a validator to the Default Subnet.
  * 
  * @param id The node ID of the validator
  * @param startTime Javascript Date object for the start time to validate 
  * @param endTime Javascript Date object for the end time to validate 
  * @param stakeAmount The amount of nAVA the validator is staking as a {@link https://github.com/indutny/bn.js/|BN}
  * @param payerNonce The next unused nonce of the account that is providing the staked AVA and paying the transaction fee
  * @param destination The P-Chain address of the account that the staked AVA will be returned to, as well as a validation reward if the validator is sufficiently responsive and correct while it validated
  * @param delegationFeeRate Optional. The percent fee this validator charges when others delegate stake to them, multiplied by 10,000 as a {@link https://github.com/indutny/bn.js/|BN}. For example, suppose a validator has delegationFeeRate 300,000 and someone delegates to that validator. When the delegation period is over, if the delegator is entitled to a reward, 30% of the reward (300,000 / 10,000) goes to the validator and 70% goes to the delegator
  * @param subnetID Optional. Either a {@link https://github.com/feross/buffer|Buffer} or an AVA serialized string for the SubnetID or its alias.
  * 
  * @returns Promise for a base58 string of the unsigned transaction.
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
  * Sign an unsigned or partially signed transaction. 
  * 
  * Transactions to add non-default Subnets require signatures from control keys and from the account paying the transaction fee. If `signer` is a control key and the transaction needs more signatures from control keys, `sign` will provide a control signature. Otherwise, `signer` will sign to pay the transaction fee.
  * 
  * @param tx The unsigned/partially signed transaction
  * @param signer The address of the key signing `tx`
  * @param username The Keystore user that controls the key signing `tx`
  * @param password The password of the Keystore user
  * 
  * @returns Promise for an string of the transaction after being signed.
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
  * Lists the set of pending validators.
  * 
  * @param subnetID Optional. Either a {@link https://github.com/feross/buffer|Buffer} or an AVA serialized string for the SubnetID or its alias.
  * 
  * @returns Promise for an array of validators that are pending staking, see: {@link https://docs.ava.network/v1.0/en/api/platform/#platformgetpendingvalidators|platform.getPendingValidators documentation}.
  * 
  */
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

  /**
  * Lists the set of current validators.
  * 
  * @param subnetID Optional. Either a {@link https://github.com/feross/buffer|Buffer} or an AVA serialized string for the SubnetID or its alias.
  * 
  * @returns Promise for an array of validators that are currently staking, see: {@link https://docs.ava.network/v1.0/en/api/platform/#platformgetcurrentvalidators|platform.getCurrentValidators documentation}.
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