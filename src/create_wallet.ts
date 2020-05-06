import * as fs from 'fs';

let outObj: {} = {}
console.log('yo earth')

fs.writeFile('wallet.json',JSON.stringify(outObj, null, 2), (err) => {
  if (err) return console.error(err)
  console.log('wallet.json written successfully.')
})