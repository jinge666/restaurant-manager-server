const orderService = require('../service/order.service')

class orderController {
  async create(ctx,next) {
    // 获取参数
    const {shopList,shopPrice,orderOther,restaurantId} = ctx.request.body
    // 先创建order,获取orderId
    const result = await orderService.createOrder(ctx.user.id,restaurantId,shopPrice,orderOther.number,orderOther.note)
    let orderId = result.insertId
    // 创建关联food
    // 创建taskList存储任务
    const taskList = []
    shopList.forEach(item => {
      taskList.push(orderService.createFood(item.name,item.id,item.number,item.price,orderId))
    })
    await Promise.all(taskList)
    let resData = {
      message:'订单提交成功',
      orderId
    }
    ctx.body = resData
  }
  async getOrder(ctx,next) {
    // 获取参数
    const userId = ctx.user.id
    const detail = ctx.query
    let result = null
    if(detail.status == 0 || !detail.status) {
      // 查询所有状态
      result = await orderService.getAllOrder(userId,detail.limit,detail.offset)
    }else{
      // 查询单个状态
      result = await orderService.getOrder(userId,detail.status,detail.limit,detail.offset)
    }
    ctx.body = result
  }
  async changeOrder(ctx,next) {
    // 获取参数
    const {orderId,status,orderOther} = ctx.request.body
    let result = null
    if(orderOther) {
      result = await orderService.changeOrderStatus(orderId,status,orderOther.number,orderOther.note)
    }else{
      result = await orderService.changeOrderStatus2(orderId,status)
    }
    ctx.body = '成功更改订单状态'
  }
  async getShopList(ctx,next) {
    const {orderId} = ctx.query
    const result = await orderService.getShopList(orderId)
    ctx.body = result
  }
  async getMerchantList(ctx,next) {
    const {limit,status,offset} = ctx.query
    let result = null
    if(status == 0 || !status) {
      result = await orderService.getAllMerchantList(limit,offset)
    }else{
      result = await orderService.getMerchantList(limit,status,offset)
    }
    ctx.body = result
  }
  async createComment(ctx,next) {
    const {orderId,dregg,comments,fileList,shopList} = ctx.request.body
    const taskList = []
    // 将评论和评分更新到order表
    taskList.push(orderService.updateOrder(orderId,dregg,comments))
    // 将评论图片插入picture_evaluation表
    fileList.forEach(item => {
      taskList.push(orderService.createEvaPic(orderId,item))
    })
    // 将evaluation插入order_food表
    shopList.forEach(item => {
      taskList.push(orderService.updateEvaluation(item.foodId,item.evaluation))
    })
    await Promise.all(taskList)
    ctx.body = '评论成功'
  }
  async getComment(ctx,next) {
    // 获取参数
    const {orderId} = ctx.query
    // 获取评论信息
    const result = await orderService.getComment(orderId)
    // 返回信息
    ctx.body = result
  }
  async getAllComment(ctx,next) {
    // 获取参数
    const {limit,offset} = ctx.query
    const result = await orderService.getAllComment(limit,offset)
    ctx.body = result
  }
}

module.exports = new orderController()