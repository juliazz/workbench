import base from './baseAPI'
import login from './loginAPI'
import product from './productAPI'
import person from './personAPI'
import recommend from './recommendAPI'

export default {
  ...base,
  ...login,
  ...product,
  ...person,
  ...recommend
}
