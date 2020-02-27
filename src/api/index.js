import login from './loginAPI'
import product from './productAPI'
import person from './personAPI'
import recommend from './recommendAPI'

export default {
  ...login,
  ...product,
  ...person,
  ...recommend
}
