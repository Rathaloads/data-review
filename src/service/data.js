const store = require('./store')

console.log('store:', store)

export default {
  // 拿所有的图
  getCharts () {
    return store.get('charts')
  },
  // 拿所有的用户
  getUsers () {
    return store.get('users')
  },
  // 拿所有的录入数据
  getFucks () {
    return store.get('fucks')
  }
}
