const mysql = require('mysql2')
const {
  SQL_PORT,
  SQL_DATABASE,
  SQL_HOST,
  SQL_USER,
  SQL_PASSWORD,
} = require('./config')

const connection = mysql.createPool({
  port:SQL_PORT,
  database:SQL_DATABASE,
  host:SQL_HOST,
  user:SQL_USER,
  password:SQL_PASSWORD
})

connection.getConnection((err,conn) => {
  conn.connect((err) => {
    if(err) {
      console.log('数据库连接失败',err);
    }else{
      console.log('数据库连接成功~');
    }
  })
})

module.exports = connection.promise()