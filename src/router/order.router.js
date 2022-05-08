const Router = require('koa-router')

const { verifyAuth } = require('../middleware/login.middleware')
const { create, getOrder, changeOrder, getShopList, getMerchantList, createComment, getComment, getAllComment } = require('../controller/order.controller')

const orderRouter = new Router({ prefix: '/order' })

// 创建订单
orderRouter.post('/', verifyAuth, create)
// 查询订单
orderRouter.get('/', verifyAuth, getOrder)
// 更改订单状态
// verifyAuth
orderRouter.post('/change', changeOrder)
// 查询订单购物记录shopList
orderRouter.get('/shopList', verifyAuth, getShopList)
// 商家获取订单
orderRouter.get('/merchantList', verifyAuth, getMerchantList)
// 给订单创建评论
orderRouter.post('/comment', verifyAuth, createComment)
// 获取单条评论信息
orderRouter.get('/comment', verifyAuth, getComment)
// 获取所有评论
orderRouter.get('/allComment', getAllComment)

module.exports = orderRouter
