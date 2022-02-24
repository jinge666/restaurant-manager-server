const Router = require('koa-router')

const {verifyAuth} = require('../middleware/login.middleware')
const {create,getRestaurant,saveRestaurant,delNavCagetory,delFood} = require('../controller/restaurant.controller')

const restaurantRouter = new Router({prefix:'/restaurant'})

// 创建餐厅
restaurantRouter.post('/',verifyAuth,create)
// 获取餐厅相关信息
restaurantRouter.get('/',getRestaurant)
// 更改餐厅信息
// verifyAuth
restaurantRouter.post('/save',saveRestaurant)
// 删除navCategory
restaurantRouter.delete('/delNavCagetory/:id',verifyAuth,delNavCagetory)
// 删除food
restaurantRouter.delete('/delFood/:id',verifyAuth,delFood)

module.exports = restaurantRouter