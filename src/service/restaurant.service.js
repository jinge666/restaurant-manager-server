const connection = require('../app/database')

class restaurantService {
  // 创建餐厅
  async createRestaurant (name,introduction,address,pictureList,beginDate,endDate) {
    const statement = `
      INSERT INTO restaurant (name,introduction,address,picture,beginDate,endDate) VALUES (?,?,?,?,?,?)
    `
    const [result] = await connection.execute(statement,[name,introduction,address,pictureList[0].url,beginDate,endDate])
    return result
  }
  // 创建navcategory
  async createNavCategory (name,restaurantId) {
    const statement = `
      INSERT INTO nav_category (name,restaurant_id) VALUES (?,?)
    `
    const [restlt] = await connection.execute(statement,[name,restaurantId])
    return restlt
  }
  // 创建food
  async createFood (foodName,foodPicture,price,restaurantId,navCategoryId) {
    price = price ? Number(price) : null
    const statement = `
      INSERT INTO food (food_name,food_picture,price,restaurant_id,nav_category_id) VALUES (?,?,?,?,?)
    `
    const [result] = await connection.execute(statement,[foodName,foodPicture,price,restaurantId,navCategoryId])
    return result
  }
  // 获取餐厅信息
  async getRestaurant () {
    const statement = `
    SELECT 
      r.id id, r.name name,r.introduction introduction,r.address address,r.picture pictureList,
      r.beginDate beginDate,r.endDate endDate
    FROM restaurant r
    `
    const [result] = await connection.execute(statement)
    return result[0]
  }
  // 获取navCategory信息
  async getNavCategory () {
    const statement = `
      SELECT
        JSON_ARRAYAGG(
          JSON_OBJECT('id',n.id,'name',n.name,'food',
            (SELECT JSON_ARRAYAGG(JSON_OBJECT('id',f.id,'foodName',f.food_name,'price',f.price,'foodPicture',f.food_picture))
            FROM food f WHERE f.nav_category_id = n.id)
        )) navCategory
      FROM nav_category n
    `
    const [result] = await connection.execute(statement)
    return result[0]
  }
  // 删除NavCagetory
  async delNavCagetoryById(id) {
    const statement = `
    DELETE FROM nav_category WHERE id = ?;
    `
    const [result] = await connection.execute(statement,[id])
    return result
  }
  // 删除food
  async delFoodById(id) {
    const statement = `
    DELETE FROM food WHERE id = ?;
    `
    const [result] = await connection.execute(statement,[id])
    return result
  }
  // 修改餐厅
  async updateRestuarant (name,introduction,address,pictureList,beginDate,endDate,id) {
    const statement = `
      UPDATE restaurant SET name=?,introduction=?,address=?,picture=?,beginDate=?,endDate=? WHERE id = ?
    `
    const [result] =await connection.execute(statement,[name,introduction,address,pictureList,beginDate,endDate,id])
    return result
  }
  // 修改navCagetory
  async updateNavCagetory (name,navCagetoryId) {
    const statement = `
      UPDATE nav_category SET name= ? WHERE id = ?
    `
    const [restlt] = await connection.execute(statement,[name,navCagetoryId])
    return restlt
  }
  // 修改 food
  async updateFood (foodName,foodPicture,price,foodId) {
    price = price ? Number(price) : null
    const statement = `
      UPDATE food SET food_name= ?,food_picture=?,price=? WHERE id = ?
    `
    const [restlt] = await connection.execute(statement,[foodName,foodPicture,price,foodId])
    return restlt
  }
}

module.exports = new restaurantService()