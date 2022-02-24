const app = require('./src/app')

const {APP_PORT} = require('./src/app/config')


app.listen(APP_PORT,() => {
  console.log(`服务器以${APP_PORT}端口启动成功~`);
})