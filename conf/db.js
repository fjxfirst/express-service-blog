const env = process.env.NODE_ENV
let MYSQL_CONF
let REDIS_CONF
if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'myblog'
  }
  REDIS_CONF={
    port:6379,
    host:'127.0.0.1'
  }
} else if (env === 'production') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'myblog'
  }
  REDIS_CONF={
    port:6379,
    host:'127.0.0.1'
  }
} else if (env === 'test') {
  MYSQL_CONF = {
    host: '129.28.21.38',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'myblog-test'
  }
  REDIS_CONF={
    port:6379,
    host:'129.28.21.38'
  }
}
module.exports = {MYSQL_CONF,REDIS_CONF}
