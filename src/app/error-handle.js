const errorTypes = require('../constants/error-types')

const errorHandle =  (error,ctx) => {
  let status , message
  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400
      message = '用户名或者密码不能为空~'
      break;
    case errorTypes.NAME_ALREADY_EXISTS:
      status = 409
      message = '用户名已经存在~'
      break
    case errorTypes.NAME_IS_NOT_EXISTS:
      status = 400
      message = '用户不存在~'
      break
    case errorTypes.PASSWORD_IS_ERROR:
      status = 400
      message = '密码错误~'
      break
    case errorTypes.UNAUTHORIZATION:
      status = 401
      message = 'token失效~'
      break
    case errorTypes.UNPERMISSION:
      status = 401
      message = '劝限不够~'
      break
    default:
      status = 404
      message = 'NOT FOUND'
  }
  ctx.status = status
  ctx.body = message
}

module.exports = errorHandle