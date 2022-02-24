const connection = require('../app/database')

class UserService {
  async create (user) {
    const {phone,password,nickName,avatarUrl} = user
    const statement = `
      INSERT INTO user (phone,password,nickName,avatarUrl) VALUES (?,?,?,?);
    `
    const result = await connection.execute(statement,[phone,password,nickName,avatarUrl])
    return result
  }
  async getUserByPhone (user) {
    const {phone} = user
    const statement = `
    SELECT * FROM user WHERE phone = ?
    `
    const result =await connection.execute(statement,[phone])
    return result[0]
  }
}

module.exports = {
  create,
  getUserByName
} = new UserService()