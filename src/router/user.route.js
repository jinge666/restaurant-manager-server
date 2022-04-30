const Router = require('koa-router')

const {verifyUser,handlePassword,} = require('../middleware/user.middleware')
const {create,becomeVip,getUserByIdentity,changeIndetity} = require('../controller/user.controller')
const {verifyAuth} = require('../middleware/login.middleware')

const userRouter = new Router({prefix:'/users'})

// 创建user
userRouter.post('/',verifyUser,handlePassword,create)
// 升级为vip
userRouter.post('/vip',verifyAuth,becomeVip)
// 获取用户列表
// verifyAuth
userRouter.get('/list',getUserByIdentity)
// 改变身份
userRouter.post('/change',changeIndetity)

module.exports = userRouter