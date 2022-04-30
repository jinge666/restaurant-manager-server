const restaurantService = require('../service/restaurant.service')

class restaurantController {
  // 创建餐厅
  async create(ctx, next) {
    // 获取参数
    const restDetail = ctx.request.body
    const { name, introduction, address, pictureList, beginDate, endDate, navCategory } = restDetail
    // 创建餐馆
    const restResult = await restaurantService.createRestaurant(name, introduction, address, pictureList, beginDate, endDate)
    // 获取餐馆id
    const restaurantId = restResult.insertId
    // 创建category左侧分类导航栏
    navCategory.forEach(async (item) => {
      // 创建数组存储所有任务队列
      let taskList = []
      const navResult = await restaurantService.createNavCategory(item.name, restaurantId)
      let navCategoryId = navResult.insertId
      item.food.forEach((item1) => {
        // 将创建food加入任务队列
        taskList.push(restaurantService.createFood(item1.foodName, item1.foodPicture[0] ? item1.foodPicture[0].url : null, item1.price, restaurantId, navCategoryId))
      })
      // 执行创建food,使用promise.all,减少用户等待时间
      const foodResult = await Promise.all(taskList)
    })
    ctx.body = '创建成功'
  }
  // 获取餐厅相关信息
  async getRestaurant(ctx, next) {
    const [form, { navCategory }] = await Promise.all([restaurantService.getRestaurant(), restaurantService.getNavCategory()])
    // 对navCategory进行处理
    let result = navCategory.map(item => {
      let food = item.food.map(item1 => {
        let foodPicture = [{
          url: item1.foodPicture
        }]
        return {
          id: item1.id,
          foodName: item1.foodName,
          price: item1.price,
          foodPicture
        }
      })
      return {
        id: item.id,
        name: item.name,
        food
      }
    })
    form.pictureList = [{
      url: form.pictureList
    }]
    form.navCategory = result
    ctx.body = form
  }
  // 保存餐厅信息
  async saveRestaurant(ctx, next) {
    // 获取参数
    const restDetail = ctx.request.body
    const { name, introduction, address, pictureList, beginDate, endDate, id, navCategory } = restDetail
    // 创建数组存储任务队列
    let taskList = []
    // 将更新餐厅加入任务队列
    taskList.push(restaurantService.updateRestuarant(name, introduction, address, pictureList[0] ? pictureList[0].url : null, beginDate, endDate, id))
    // navCategory和food分为原本的更新的以及最新插入两种，以insert来区分
    let oldNavCategory = navCategory.filter(item => {
      return !item.insert
    })
    let newNavCategory = navCategory.filter(item => {
      return item.insert
    })
    // newNavCategory 执行插入操作
    newNavCategory.forEach(async (item) => {
      // 创建数组存储所有任务队列
      let taskList = []
      const navResult = await restaurantService.createNavCategory(item.name, id)
      let navCategoryId = navResult.insertId
      item.food.forEach((item1) => {
        // 将创建food加入任务队列
        taskList.push(restaurantService.createFood(item1.foodName, item1.foodPicture[0] ? item1.foodPicture[0].url : null, item1.price, id, navCategoryId))
      })
      // 执行创建food,使用promise.all,减少用户等待时间
      const foodResult = await Promise.all(taskList)
    })
    // oldNavCategory 执行更新操作，其中又分为oldFood以及newFood
    oldNavCategory.forEach(item => {
      // 将oldCategory的更新操作存入任务队列
      taskList.push(restaurantService.updateNavCagetory(item.name, item.id))
      let oldFood = []
      let newFood = []
      oldFood = item.food.filter(item1 => {
        return !item1.insert
      })
      newFood = item.food.filter(item1 => {
        return item1.insert
      })
      // oldFood执行更新
      oldFood.forEach(item1 => {
        taskList.push(restaurantService.updateFood(item1.foodName, item1.foodPicture[0] ? item1.foodPicture[0].url : null, item1.price, item1.id))
      })
      // newFood执行插入操作
      newFood.forEach(item1 => {
        taskList.push(restaurantService.createFood(item1.foodName, item1.foodPicture[0] ? item1.foodPicture[0].url : null, item1.price, id, item.id))
      })
    })
    // 执行所有的任务
    const result = await Promise.all(taskList)
    ctx.body = '成功保存~'
  }
  // 删除navCogetory
  async delNavCagetory(ctx, next) {
    const { id } = ctx.params
    const result = await restaurantService.delNavCagetoryById(id)
    ctx.body = '删除成功~'
  }
  // 删除food
  async delFood(ctx, next) {
    const { id } = ctx.params
    const result = await restaurantService.delFoodById(id)
    ctx.body = '删除成功~'
  }
  // 上传轮播图
  async uploadSwiper(ctx, next) {
    const { url } = ctx.request.body
    const result = await restaurantService.uploadSwiper(url)
    ctx.body = { id: result.insertId }
  }
  // 删除轮播图
  async deleteSwiper(ctx, next) {
    const { id } = ctx.params
    const result = await restaurantService.deleteSwiper(id)
    ctx.body = '删除轮播图片成功'
  }
  // 获取所有轮播图
  async getSwiper(ctx, next) {
    const result = await restaurantService.getSwiper()
    ctx.body = result
  }
}

module.exports = new restaurantController()