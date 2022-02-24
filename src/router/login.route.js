const Router = require('koa-router')

const {loginController} = require('../controller/login.controller')
const {verifyLogin} = require('../middleware/login.middleware')

const loginRouter = new Router({prefix:'/login'})

loginRouter.post('/',verifyLogin,loginController)

module.exports = loginRouter

