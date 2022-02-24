const Multer = require('koa-multer')
const {PICTURE_PATH} = require('../constants/file-path')

const pictureUpload = Multer({
  dest:PICTURE_PATH
})
const pictureHandler = pictureUpload.single('file')

module.exports = {
  pictureHandler
}