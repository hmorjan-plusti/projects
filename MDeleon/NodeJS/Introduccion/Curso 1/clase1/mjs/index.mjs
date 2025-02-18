// .js > por defecto utiliza CommonJS
// .mjs > por defecto utiliza ES Modules
// .cjs > CommonJS

import { sum, sub, mult } from './sum.mjs'

console.log(sum(1, 2))
console.log(sub(1, 2))
console.log(mult(1, 2))
