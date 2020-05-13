import api from '../../api/index.js'

const getUserList = async() => {
  await api.getUserList()
}
export default {
  getUserList
}
