import login from './loginAPI'
import product from './productAPI'
import person from './workbenchAPI'
import orderIn from './orderInAPI'

export default {
  ...login,
  ...product,
  ...person,
  ...orderIn
}
