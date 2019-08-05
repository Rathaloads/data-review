import Store from 'electron-store'
// import { app } from 'electron'

// console.log('输出:', app.getPath('userdata'))

const options = {
  name: 'data',
  fileExtension: 'json',
  // cwd: app.getPath('userdata'),
  clearInvalidConfig: true
}

let store = new Store(options)

export default store
