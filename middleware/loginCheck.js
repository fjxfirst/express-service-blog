const {ErrorModel}=require('../model/resMode')

module.exports=(req,res,next)=>{
  if(req.session.username){
    next()
    return
  }
  res.json(
    new ErrorModel('未登录')
  )
}