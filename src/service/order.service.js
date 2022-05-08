const connection = require('../app/database')

class orderService {
  // 创建order
  async createOrder(userId, restaurantId, shopPrice, mealNumber, note) {
    mealNumber = mealNumber ? mealNumber : null
    note = note ? node : null
    shopPrice = Number(shopPrice)
    const statement = 'INSERT INTO `order` (user_id,restaurant_id,shop_price,meal_number,note) VALUES (?,?,?,?,?)'
    const [result] = await connection.execute(statement, [userId, restaurantId, shopPrice, mealNumber, note])
    return result
  }
  // 创建相关联的菜品
  async createFood(name, foodId, number, price, orderId) {
    const statement = `
      INSERT INTO order_food (name,food_id,number,price,order_id) VALUES (?,?,?,?,?)
    `
    const [result] = await connection.execute(statement, [name, foodId, number, price, orderId])
    return result
  }
  // 查询所有订单
  async getAllOrder(userId, limit, offset) {
    const statement =
      'SELECT' +
      ' o.id id, o.note note,o.createAt createTime, o.shop_price price, o.meal_number number, o.status status, o.dregg dregg' +
      ' FROM `order` o' +
      ' WHERE user_id = ?' +
      ' ORDER BY o.createAt DESC' +
      ' LIMIT ? OFFSET ?'
    const [result] = await connection.execute(statement, [userId, limit, offset])
    return result
  }
  // 查询单个状态的订单
  async getOrder(userId, status, limit, offset) {
    const statement =
      'SELECT' +
      ' o.id id, o.note note,o.createAt createTime, o.shop_price price, o.meal_number number, o.status status, o.dregg dregg' +
      ' FROM `order` o' +
      ' WHERE user_id = ? AND status = ?' +
      ' ORDER BY o.createAt DESC' +
      ' LIMIT ? OFFSET ?'
    const [result] = await connection.execute(statement, [userId, status, limit, offset])
    return result
  }
  // 修改订单状态及其他信息
  async changeOrderStatus(orderId, status, number, note) {
    const statement = 'UPDATE `order` SET status = ?,note= ?,meal_number= ? WHERE id = ?'
    const [result] = await connection.execute(statement, [status, note, number, orderId])
    return result
  }
  // 将订单状态修改
  async changeOrderStatus2(orderId, status) {
    const statement = 'UPDATE `order` SET status = ? WHERE id = ?'
    const [result] = await connection.execute(statement, [status, orderId])
    return result
  }
  // 获取shopList
  async getShopList(orderId) {
    const statement = `
      SELECT od.id id,od.name name,od.number number,od.price price,od.evaluation evaluation FROM order_food od WHERE order_id = ?
    `
    const [result] = await connection.execute(statement, [orderId])
    return result
  }
  // 商家获取订单
  async getMerchantList(limit, status, offset) {
    const statement =
      'SELECT' +
      ' o.id id, o.note note,o.createAt createTime, o.shop_price price, o.meal_number number, o.status status' +
      ' FROM `order` o' +
      ' WHERE status = ?' +
      ' ORDER BY o.createAt DESC' +
      ' LIMIT ? OFFSET ?'
    const [result] = await connection.execute(statement, [status, limit, offset])
    return result
  }
  // 商家获取所有订单
  async getAllMerchantList(limit, offset) {
    const statement =
      'SELECT' +
      ' o.id id, o.note note,o.createAt createTime, o.shop_price price, o.meal_number number, o.status status' +
      ' FROM `order` o' +
      ' ORDER BY o.createAt DESC' +
      ' LIMIT ? OFFSET ?'
    const [result] = await connection.execute(statement, [limit, offset])
    return result
  }
  // 将评论和评分更新到order表
  async updateOrder(orderId, dregg, comments) {
    const statement = 'UPDATE `order` SET dregg = ?,comments = ? WHERE id = ?'
    const [result] = await connection.execute(statement, [dregg, comments, orderId])
    return result
  }
  // 将评论图片插入picture_evaluation表
  async createEvaPic(orderId, url) {
    const statement = `
      INSERT INTO picture_evaluation (order_id,url) VALUES (?,?)
    `
    const [result] = await connection.execute(statement, [orderId, url])
    return result
  }
  // 将evaluation插入order_food表
  async updateEvaluation(foodId, evaluation) {
    const statement = `
      UPDATE order_food SET evaluation = ? WHERE id = ?
    `
    const [result] = await connection.execute(statement, [evaluation, foodId])
    return result
  }
  // 获取评论信息
  async getComment(orderId) {
    const statement = 'SELECT o.id id,o.comments `comment`,o.dregg dregg,o.createAt createTime,JSON_ARRAYAGG(pe.url) pictureList FROM `order` o LEFT JOIN picture_evaluation pe ON o.id = pe.order_id WHERE o.id = ?;'
    const [result] = await connection.execute(statement, [orderId])
    return result[0]
  }
  // 获取所有的评论信息
  async getAllComment(limit, offset) {
    const statement =
      'SELECT' +
      ' JSON_OBJECT("id",o.id,"createTime",o.createAt,"comment",o.comments,"dregg",o.dregg,"pictureList",(' +
      ' SELECT JSON_ARRAYAGG(pe.url) FROM picture_evaluation pe WHERE o.id = pe.order_id' +
      ')) commentInfo,' +
      'JSON_OBJECT("avatarUrl",u.avatarUrl,"nickName",u.nickName) userInfo' +
      ' FROM `order` o ' +
      ' LEFT JOIN user u ON o.user_id = u.id' +
      ' WHERE o.comments IS NOT NULL' +
      ' ORDER BY o.createAt DESC' +
      ' LIMIT ? OFFSET ?'
    const [result] = await connection.execute(statement, [limit, offset])
    return result
  }
}

module.exports = new orderService()