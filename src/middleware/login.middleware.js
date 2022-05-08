const errorTypes = require('../constants/error-types')
const jwt = require('jsonwebtoken')
const { PUBLIC_KEY } = require('../app/config')

const { md5password } = require('../utils/password-handle')
const { getUserByPhone } = require('../service/user.service')

const verifyLogin = async (ctx, next) => {
  // 获取用户名密码
  const { phone, password } = ctx.request.body
  // 判断用户名和密码不能为空
  if (!phone || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }
  // 判断用户是否存在
  const result = await getUserByPhone(ctx.request.body)
  if (!result[0]) {
    const error = new Error(errorTypes.NAME_IS_NOT_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }
  // 判断密码是否正确
  if (md5password(password) !== result[0].password) {
    const error = new Error(errorTypes.PASSWORD_IS_ERROR)
    return ctx.app.emit('error', error, ctx)
  }
  // 将用户数据存入ctx对象
  ctx.user = result[0]
  await next()
}

const verifyAuth = async (ctx, next) => {
  // 验证
  const authorization = ctx.header.authorization
  if (!authorization) {
    const error = new Error(errorTypes.NOTLOGIN)
    return ctx.app.emit('error', error, ctx)
  }
  const token = authorization.replace('Bearer ', '')  // Bearer后面需要带空格，否则会提示token无效
  try {
    const result = jwt.verify(token, PUBLIC_KEY)
    ctx.user = result
    // ctx.body = '授权成功~'
    await next()
  } catch (err) {
    console.log(err);
    const error = new Error(errorTypes.UNAUTHORIZATION)
    ctx.app.emit('error', error, ctx)
  }
}
module.exports = {
  verifyLogin,
  verifyAuth
}