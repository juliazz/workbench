import login from './loginAPI'
import product from './productAPI'
import person from './workbenchAPI'
import common from './commonAPI'
import material from './material'
import pk from './pkAPI'
import orderIn from './orderInAPI'
import statisics from './statisticsAPI'
import finance from './financeAPI'

export default {
  ...login,
  ...product,
  ...common,
  ...person,
  ...orderIn,
  ...material,
  ...pk,
  ...statisics,
  ...finance
}
