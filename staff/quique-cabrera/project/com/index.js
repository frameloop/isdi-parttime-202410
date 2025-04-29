// Primero exportamos todo suelto (como ya hacías)
export * from './errors/index.js'
export { default as validate } from './validate.js'

// Ahora creamos el objeto "errors" agrupando todo
import * as errors from './errors/index.js'
export { errors }
