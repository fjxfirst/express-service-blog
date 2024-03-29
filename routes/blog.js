const express = require('express')
const router = express.Router()
const {getList, getDetail, newBlog, updateBlog, deletBlog} = require('../controller/blog')
const {SuccessModel, ErrorModel} = require('../model/resMode')
const loginCheck = require('../middleware/loginCheck')
router.get('/list', (req, res, next) => {
  let author = req.query.author || ''
  const keyword = req.query.keyword || ''
  if (req.query.isadmin) {
    //管理员界面
    if (req.session.username == null) {
      //未登录
      res.json(
        new ErrorModel('未登录')
      )
      return
    }
    //强制查询自己的博客
    author = req.session.username
  }
  const result = getList(author, keyword)
  return result.then(listData => {
    res.json(new SuccessModel(listData))
  })

})
router.get('/detail', (req, res, next) => {
  const result = getDetail(req.query.id)
  return result.then(detailData => {
    res.json(new SuccessModel(detailData))
  })
})
router.post('/new', loginCheck, (req, res, next) => {
  req.body.author = req.session.username
  const result = newBlog(req.body)
  return result.then(data => {
     res.json(new SuccessModel(data))
  })
})
router.post('/update', loginCheck, (req, res, next) => {
  const result = updateBlog(req.query.id , req.body)
  return result.then(val => {
    if(val){
      res.json(new SuccessModel())
    }else{
      res.json(new ErrorModel('更新博客失败'))
    }
  })
})
router.post('/del',loginCheck,(req,res,next)=>{
  const author=req.session.username
  const result = deletBlog(req.query.id, author)
  return result.then(val => {
    if(val){
      res.json(new SuccessModel())
    }else{
      res.json(new ErrorModel('删除博客失败'))
    }
  })
})
module.exports = router