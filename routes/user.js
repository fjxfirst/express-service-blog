const {login} = require('../controller/user')
const {SuccessModel, ErrorModel} = require('../model/resMode')
const express = require('express')
const router = express.Router()
router.post('/login', (req, res, next) => {
  const {username, password} = req.body
  const result = login(username, password)
  return result.then(data => {
    if (data.username) {
      req.session.username = data.username
      req.session.realname = data.realname
      res.json(new SuccessModel('登录成功'))
      return
    }
    res.json(new ErrorModel('登录失败'))
  })
})
router.get('/logintest', (req, res, next) => {
  console.log(req.session)
  if(req.session.username){
    res.json({
      errno:0,
      msg:'已登录'
    })
    return
  }
  res.json({
    errno:-1,
    msg:'未登录'
  })

})
router.get('/session-test', (req, res, next) => {
  const session=req.session
  if(session.num==null){
    session.num=0
  }
  session.num++
  res.json({
    num:session.num
  })

})
module.exports = router