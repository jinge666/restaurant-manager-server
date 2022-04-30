const Router = require('koa-router')

const { verifyAuth } = require('../middleware/login.middleware')
const { create, getRestaurant, saveRestaurant, delNavCagetory, delFood, uploadSwiper, deleteSwiper, getSwiper } = require('../controller/restaurant.controller')

const restaurantRouter = new Router({ prefix: '/restaurant' })

// 创建餐厅
restaurantRouter.post('/', verifyAuth, create)
// 获取餐厅相关信息
restaurantRouter.get('/', getRestaurant)
// 更改餐厅信息
restaurantRouter.post('/save', verifyAuth, saveRestaurant)
// 删除navCategory
restaurantRouter.delete('/delNavCagetory/:id', verifyAuth, delNavCagetory)
// 删除food
restaurantRouter.delete('/delFood/:id', verifyAuth, delFood)
// 上传餐厅轮播图
// verifyAuth
restaurantRouter.post('/swiper', uploadSwiper)
// 删除餐厅轮播图
restaurantRouter.delete('/delSwiper/:id', deleteSwiper)
// 获取所有轮播图
restaurantRouter.get('/swiper', getSwiper)

module.exports = restaurantRouter