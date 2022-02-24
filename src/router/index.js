const fs = require('fs')
const path = require('path')

const useRouter = (app) => {
  fs.readdirSync(path.resolve(__dirname)).forEach(file => {
    if(file === 'index.js') return
    const route = require(`./${file}`)
    app.use(route.routes())
    app.use(route.allowedMethods())
  })
}

module.exports = useRouter