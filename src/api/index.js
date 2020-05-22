import login from './loginAPI'
import product from './productAPI'
import person from './workbenchAPI'
import common from './commonAPI'
import orderIn from './orderInAPI'

export default {
  ...login,
  ...product,
  ...common,
  ...person,
  ...orderIn
}
