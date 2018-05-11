const express = require('express')
const bodyParser = require('body-parser')
const { mock } = require('mockjs')

const {
  crossDomain,
  successRate,
  delayRes,
  jsonRes
} = require('./middlewares')

const commonConfig = {
  timeout: 500,
  rate: 1
}

process.on('message', ({path, port}) => {
  // 清除require缓存，每次都可以获取最新数据
  delete require.cache[path]
  const options = require(path)
  // 获取配置数据
  const {
    common
  } = options
  delete options.common

  let dataType

  const app = express()

  // 解析post body数据
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  app.use(crossDomain());
  app.use(successRate(common.rate))
  app.use(delayRes(common.timeout))
  app.use(jsonRes())

  app.use((req, res, next) => {
    dataType = req.query.callback ? 'jsonp' : 'json'
    next()
  })
  // 路由创建
  Object.keys(options).forEach(path => {
    const data = options[path]
    const middlewares = []

    if (typeof data === 'function') app.use(data)

    app.use(path, (req, res, next) => {
      if (typeof data === 'function' && typeof req.myData !== 'object') {
        throw new Error('自定义中间件mock数据，请将mock数据挂载到req中')
      }
      const rsp = req.myData ? mock(req.myData) : mock(data)
      res.status(200)[dataType](rsp)
    })
  })

  app.use((req, res, next) => {
    res.status(404).json({ status: 0, code: 404, msg: 'Not Found' })
  })

  app.use((err, req, res, next) => {
    res.status(500).json({ status: 0, code: 500, msg: 'Server Error' })
  })
  app.listen(port, _ => {
    console.log(`Mock Express server listening on port ${port}`)
  })

})
