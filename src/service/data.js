import DB from './base'

// data = {
//   'id': Number,
//   '1': Number,
//   '2': Number,
//   '3': Number,
//   '4': Number,
//   '5': Number,
//   '6': Number,
//   '7': Number,
//   '8': Number,
//   '9': Number,
//   '10': Number
// }

export default {
  // 插入数据
  insertData (data) {
    return new Promise((resolve, reject) => {
      DB.insert(data, (err, newDoc) => {
        if (!err) {
          resolve({ code: 200 })
        } else {
          reject(new Error({
            error: err,
            data
          }))
        }
      })
    })
  },
  // 批量插入数据
  insertBatchData (datas) {
    return new Promise((resolve, reject) => {
      DB.insert(datas, (err, newDoc) => {
        if (!err) {
          resolve({ code: 200 })
        } else {
          reject(new Error({
            error: err,
            data: newDoc
          }))
        }
      })
    })
  },
  // 删除指定ID
  removeData (id) {
    return new Promise((resolve, reject) => {
      DB.remove({ id }, {}, (err, newDoc) => {
        if (!err) {
          resolve({ code: 200 })
        } else {
          reject(new Error({
            error: err,
            data: newDoc
          }))
        }
      })
    })
  },
  // 删除所有
  removeAll () {
    return new Promise((resolve, reject) => {
      DB.remove({}, { multi: true }, (err, newDoc) => {
        if (!err) {
          resolve({ code: 200 })
        } else {
          reject(new Error({
            error: err,
            data: newDoc
          }))
        }
      })
    })
  },
  // 更新数据
  updateData (id, updateData) {
    return new Promise((resolve, reject) => {
      DB.update({ id }, { updateData }, {}, function(err, numberReplace) {
        if (err) {
          reject(err)
        } else {
          resolve({ code: 200, count: numberReplace })
        }
      })
    })
  },
  // 查所有
  findAllData () {
    return new Promise((resolve, reject) => {
      DB.find({}, function(err, docs) {
        if (err) {
          reject(err)
        } else {
          resolve({ code: 200 })
        }
      })
    })
  }
}
