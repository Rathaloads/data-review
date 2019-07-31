/**
 * 数据操作类
 */
const fs = require('fs')
const path = require('path')

/**
 * 读取数据
 */
function readFile (fileName) {
  return new Promise((resolve, reject) => {
    console.log('新路径:', path.dirname(process.execPath))
    let baseUrl = path.resolve(__dirname, '../data')
    let url = `${baseUrl}/${fileName}`

    if (fs.existsSync(url)) {
      fs.readFile(url, 'utf-8', (err, data) => {
        if (!err) {
          let dataBase = JSON.parse(data)
          resolve(dataBase)
        } else {
          reject(err)
        }
      })
    } else {
      fs.mkdirSync(url)
      resolve(null)
    }
  })
}

/**
 * 写入数据
 */
function writeFile (fileName, data) {
  return new Promise((resolve, reject) => {
    let baseUrl = path.resolve(__dirname, '../data')
    let url = `${baseUrl}/${fileName}`
    if (fs.existsSync(url)) {
      // 文件存在的操作
      let dataStr = JSON.stringify(data)
      fs.writeFile(url, dataStr, 'utf-8', (err) => {
        if (err) {
          reject(new Error('文件写入失败'))
        } else {
          resolve({
            code: 200
          })
        }
      })
    } else {
      reject(new Error('文件不存在'))
    }
  })
}

export default {
  /**
   * 获取所有的用户列表
   */
  getUserList () {
    return readFile('user.json')
  },

  /**
   * 获取所有的数据列表
   */
  getDataList () {
    return readFile('data.json')
  },

  /**
   * 更新数据
   */
  updateData (data) {
    return writeFile('data.json', data)
  },

  /**
   * 更新用户
   */
  updateUser(data) {
    return writeFile('user.json', data)
  }
}
