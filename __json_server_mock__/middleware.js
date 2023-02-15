module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.url === '/login') {
    if (req.body.username === 'Noah' && req.body.password === '123456') {
      return res.status(200).json({
        user: {
          // 返回token，实现JWT
          token: '123'
        }
      })
    } else {
      return res.status(400).json({ message: '用户名或密码错误' })
    }
  }
  next()
}
