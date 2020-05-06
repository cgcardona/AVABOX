import { AVABOX } from "./AVABOX"

const avabox: AVABOX = new AVABOX()

let main= (): any => {
  let balance: Promise<number> = avabox.getBalance();
  console.log(balance)
}

main()