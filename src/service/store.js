import Store from 'electron-store'
// import { app } from 'electron'

const options = {
  name: 'data',
  fileExtension: 'json',
  // cwd: app.getPath('userdata'),
  clearInvalidConfig: true
}

let store = new Store(options)

export default store
