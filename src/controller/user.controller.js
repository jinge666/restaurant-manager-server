const fs = require('fs')

const userService = require('../service/user.service')
const fileService = require('../service/file.service')
const {AVATAR_PATH} = require('../constants/file-path')

class UserController {
  async create(ctx,next) {
    // 获取参数
    const query = ctx.request.body
    // 操作数据库
    const result = await userService.create(query)
    // 返回结果
    result.code = 200
    ctx.body = result
  }
}

module.exports = {
  create
} = new UserController