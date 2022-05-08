const fs = require('fs')

const fileService = require('../service/file.service')
const { PICTURE_PATH } = require('../constants/file-path')
const { APP_HOST, APP_PORT, APP_PORTS } = require('../app/config')

class fileController {
  async savePictureInfo(ctx, next) {
    // 1.获取文件信息
    const file = ctx.req.file;
    // 2.将所有的文件信息保存到数据库中
    const { filename, mimetype, size } = file;
    await fileService.createFile(filename, mimetype, size);
    let url = `http://${APP_HOST}:${APP_PORT}/picture/${filename}`
    ctx.body = url
  }
  async getFileByName(ctx, next) {
    // 获取文件filename
    let { filename } = ctx.params
    filename = filename.split('.')[0]
    const fileDetail = await fileService.getFileInfoByFilename(filename)
    ctx.response.set('content-type', fileDetail.mimetype)
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${fileDetail.filename}`)
  }
  async deleteFile(ctx, next) {
    // 获取filename
    const { filename } = ctx.params
    // 删除本地文件
    fs.unlinkSync(`${PICTURE_PATH}/${filename}`);
    // 删除数据库相关
    await fileService.deleteFileByFilename(filename)
    ctx.body = '成功删除图片'
  }
}

module.exports = new fileController()