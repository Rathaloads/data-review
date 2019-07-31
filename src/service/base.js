import DataStore from 'nedb'
import path from 'path'

let url = path.dirname(process.execPath) + '/data/data.db'
const db = new DataStore({ filename: url, autoload: true })

export default db
