const path = require('path')
const fs = require('fs')

const Jimp = require('jimp')


const pictureDispose = async(filename,fPath,params) =>{
  const filePath = path.resolve(fPath,filename)
  const destPath = path.resolve(fPath)
  let width = params.split('x')[0] ? Number(params.split('x')[0]) : ''
  let height = params.split('x')[1] ? Number(params.split('x')[1]) : ''
  if(width && height) {
    let dispose =`-${width}x${height}`
    if(fs.existsSync(`${destPath}/${filename}${dispose}`)){
      return `${destPath}/${filename}${dispose}`
    }
    const image = await Jimp.read(filePath)
    await image.resize(width,height).write(`${destPath}/${filename}${dispose}`)
    return `${destPath}/${filename}${dispose}`
  }else if(width) {
    let dispose = `-${width}`
    if(fs.existsSync(`${destPath}/${filename}${dispose}`)){
      return `${destPath}/${filename}${dispose}`
    }
    const image = await Jimp.read(filePath)
     // Jimp.AUTO自适应
    await image.resize(width,Jimp.AUTO).write(`${destPath}/${filename}${dispose}`)
    return `${destPath}/${filename}${dispose}`
  }else {
    return filePath
  }
}

module.exports = {
  pictureDispose
}