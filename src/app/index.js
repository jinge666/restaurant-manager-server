const Koa = require('koa')
const sslify = require('koa-sslify').default
const bodyParser = require('koa-bodyparser')

const errorHandle = require('./error-handle')
const useRouter = require('../router')

const app = new Koa();
app.use(sslify())  //使用ssl

// json参数解析
app.use(bodyParser())
// 路由
useRouter(app)
// 错误处理函数
app.on('error', errorHandle)
module.exports = app