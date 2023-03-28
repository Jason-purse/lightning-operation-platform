const OSS = require('ali-oss')

const client = new OSS({
  bucket: 'jasonj-first-oss',
  // region以杭州为例（oss-cn-hangzhou），其他region按实际情况填写。
  region: 'oss-cn-shanghai',
  // 阿里云主账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM账号进行API访问或日常运维，请登录RAM控制台创建RAM账号。
  accessKeyId: '111',
  accessKeySecret: 'xxxx',
});
export default client
