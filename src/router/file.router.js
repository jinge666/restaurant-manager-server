const Router = require('koa-router')

const { verifyAuth } = require('../middleware/login.middleware')
const { pictureHandler } = require('../middleware/file.middleware')
const { savePictureInfo, getFileByName, deleteFile } = require('../controller/file.controller')

const fileRouter = new Router()

// 上传图片文件
// verifyAuth
fileRouter.post('/upload/picture', pictureHandler, savePictureInfo)
// 访问图片文件
fileRouter.get('/picture/:filename', getFileByName)
// 删除图片文件
// verifyAuth
fileRouter.delete('/picture/:filename', deleteFile)

module.exports = fileRouter