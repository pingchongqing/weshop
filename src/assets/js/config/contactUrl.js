/*
* 获取请求链接方法
* 参数{method: 'getSome', data:{}}
*/
import md5 from 'js-md5'
export function getCsjUrl (options) {
  let method = options.method || ''
  let appkey = '6'
  let appSecret = 'csj_6'
  let uri = 'http://apitest.csjscm.com/api?'
  // let uri = 'http://192.168.2.130:8080/api?'
  let data = options.data || {}
  // let ticket = options.ticket || ''
  let query = `appkey=${appkey}&method=${method}&timestamp=${Math.floor(new Date().getTime() / 1000)}&nonce=${parseInt(Math.random().toString().substring(2)) + new Date().getTime()}`
  let str = `${appSecret}${query}&body=${JSON.stringify(data)}${appSecret}`
  query += '&sign=' + md5(str)
  return uri + query
}
