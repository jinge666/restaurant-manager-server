const http = require('http')
const https = require('https')
const fs = require('fs')
const path = require('path')


const app = require('./src/app')

const { APP_PORT, APP_PORTS } = require('./src/app/config')


const httpsOption = {
  key: fs.readFileSync('./src/app/key/7406003_www.jinge.site.key'),
  cert: fs.readFileSync('./src/app/key/7406003_www.jinge.site.pem')
}

app.listen(APP_PORT, () => {
  console.log(`服务器以${APP_PORT}端口启动成功~`);
})
https.createServer(httpsOption, app.callback()).listen(APP_PORTS, () => {
  console.log(`https服务器以${APP_PORTS}端口启动成功~`);
})