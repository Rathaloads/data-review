'use strict'

import { app, protocol, BrowserWindow, Menu, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import path from 'path'
import dataOptions from './service/data-options'

const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])

function createWindow () {
  // createMenu()

  // 注册通信
  /**
   * 获取用户数据
   */
  ipcMain.on('getLocalUser', (event) => {
    dataOptions.getUserList().then((data) => {
      event.reply('replayLocalUser', { data, type: 'user' })
    })
  })

  /**
   * 获取表格数据
   */
  ipcMain.on('getLocalData', (event) => {
    dataOptions.getDataList().then((data) => {
      event.reply('replayLocalData', { data, type: 'data' })
    })
  })

  /**
   * 更新用户数据
   */
  ipcMain.on('updateLocalUser', (event, { data }) => {
    dataOptions.updateUser(data).then((res) => {
      event.reply('replayUpdateUser', res)
    })
  })

  /**
   * 更新表格数据
   */
  ipcMain.on('updateLocalData', (event, { data }) => {
    dataOptions.updateData(data).then((res) => {
      event.reply('replayUpdateData', res)
    })
  })
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })
}

/**
 * 创建菜单栏
 */
function createMenu () {
  if (process.platform === 'darwin') {
    const template = [
      {
        label: 'App Demo',
        submenu: [
          {
            role: 'about'
          },
          {
            role: 'quit'
          }
        ]
      }
    ]
    let menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
  } else {
    Menu.setApplicationMenu(null)
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      // await installVueDevtools()
      // 打开DevTool
      BrowserWindow.addDevToolsExtension(path.resolve(__dirname, '../chrome'))
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
