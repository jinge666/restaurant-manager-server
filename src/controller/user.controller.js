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
  async becomeVip(ctx,next) {
    // 获取userid
    const {userId} = ctx.request.body
    // 操作数据库
    const result = await userService.becomeVip(userId)
    ctx.body = '恭喜您，成为本店vip'
  }
  async getUserByIdentity(ctx,next) {
    // 获取参数
    const {identity,limit,offset} = ctx.query
    const result = await userService.getUserByIdentity(identity,limit,offset)
    ctx.body = result
  }
  async changeIndetity(ctx,next) {
    const {userId,identity} = ctx.request.body
    const result = await userService.changeIndetity(userId,identity)
    ctx.body = '成功修改个人权限'
  }
}

module.exports = {
  create
} = new UserController