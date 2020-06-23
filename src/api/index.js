import login from './loginAPI'
import rank from './rankAPI'
import person from './workbenchAPI'
import common from './commonAPI'
import material from './material'
import pk from './pkAPI'
import orderIn from './orderInAPI'
import statisics from './statisticsAPI'
import finance from './financeAPI'
import customer from './customerAPI'

export default {
  ...login,
  ...rank,
  ...common,
  ...person,
  ...orderIn,
  ...material,
  ...pk,
  ...statisics,
  ...finance,
  ...customer
}
