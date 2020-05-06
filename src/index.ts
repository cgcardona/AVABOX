import config from './config'

export default function add(x: number, y: number, z: number): number {
  return x + y + z;
}

let getBalance = async(): Promise<any> => {
  console.log(`---------------------------getBalance, ${config.networkId}`)
}

getBalance()