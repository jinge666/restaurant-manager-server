const connection = require('../app/database')

class fileService {
  async createFile(filename, mimetype, size) {
    const statement = `INSERT INTO file (filename, mimetype, size) VALUES (?, ?, ?)`;
    const [result] = await connection.execute(statement, [filename, mimetype, size]);
    return result;
  }
  // 查询数据库文件相关
  async getFileInfoByFilename(filename) {
    let statement = `
      SELECT * FROM file WHERE filename = ? ;
    `
    const [result] =await connection.execute(statement,[filename])
    return result[0]
  }
  // 删除数据库文件相关
  async deleteFileByFilename (filename) {
    let statement = `
      DELETE FROM file WHERE filename=?;
    `
    const [result] = await connection.execute(statement,[filename])
    return result[0]
  }
}

module.exports = new fileService()