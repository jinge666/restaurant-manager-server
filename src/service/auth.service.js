const connection = require('../app/database')

class authService {
  async isPermission (tableName,id,userId) {
    const statement = `
      SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;
    `
    const result = await connection.execute(statement,[id,userId])
    return result[0].length === 0 ? false : true
  }
}

module.exports = new authService()