const crypto = require('crypto')

const md5password = (password) => {
  const md5 = crypto.createHash('md5')
  console.log('password',password);
  try{
    const result = md5.update(password).digest('hex');
    console.log('result',result);
    return result
  }catch(error){
    console.log('我出错了',error);
  }
}

md5password('123456')