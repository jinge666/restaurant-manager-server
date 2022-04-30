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
  // 改变为vip
  async becomeVip(userId) {
    const statement = `
      UPDATE user SET is_vip = 1 WHERE id = ?;
    `
    const [result] = await connection.execute(statement,[userId])
    return result
  }
  // 获取用户
  async getUserByIdentity(identity,limit,offset) {
    const statement = `
      SELECT u.id id,u.nickName nickName,u.phone phone,u.avatarUrl avatarUrl 
      FROM user u WHERE identity = ?
      LIMIT ? OFFSET ?;
    `
    const [result] = await connection.execute(statement,[identity,limit,offset])
    return result
  }
  // 修改个人身份
  async changeIndetity(userId,identity) {
    const statement = `
      UPDATE user SET identity = ? WHERE id = ?;
    `
    const [result] = await connection.execute(statement,[identity,userId])
    return result
  }
}

module.exports = {
  create,
  getUserByName
} = new UserService()