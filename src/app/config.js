const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')

dotenv.config();

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname,'./key/private.key'))
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname,'./key/public.key'))

// 解构并导出
module.exports = {
  APP_PORT,
  APP_HOST,
  SQL_PORT,
  SQL_DATABASE,
  SQL_HOST,
  SQL_USER,
  SQL_PASSWORD,
} = process.env

module.exports.PRIVATE_KEY = PRIVATE_KEY
module.exports.PUBLIC_KEY = PUBLIC_KEY