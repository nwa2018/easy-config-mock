# easy-config-mock

easyConfigMock只需一些简单的配置就可以轻松mock数据，并且`支持自定义中间件`，而且很容易整合到现有的脚手架或者工作流中。easyConfigMock很容易使用，只需要写一些配置，并且服务是会自动重启

> 在demo目录下有一个例子, 运行该例子需要将node版本更新到8.x+

### 安装
--------
```
npm i easy-config-mock
or
yarn add easy-config-mock
```

### 使用
--------
``` javascript
const path = require('path')
const easyConfigMock = require('easy-config-mock')

new easyConfigMock({
  // 请传递完整的配置文件路径进去，服务是会自动刷新
  path: path.resolve(__dirname, 'xxxx.js')
})
```
`配置文件的例子`
``` javascript
// xxxx.js
module.exports = {
  // common选项不是必须, 内置的配置如下，当然你也可以更改
  common: {
    // mock服务的默认端口，如果端口被占用，会换一个
    port: 8018,
    // 如果你想看一下ajax的loading效果，该配置项可以设置接口的返回延迟
    timeout: 500,
    // 如果你想看一下接口请求失败的效果，将rate设置成0就可以了，rate取值范围0~1，代表成功的概率
    rate: 1,
    // mock属性为false的话可以关闭掉mock服务
    mock: true
  },
  // api...
  '/pkApi/getList': {
    code: 0,
    'data|5': [{
      'uid|1000-99999': 999,
      'name': '@cname'
    }],
    result: true
  },
  '/pkApi/getPerson': {
    code: 0,
    'data|5': [{
      'name': '@cname'
    }],
    result: true
  },
  '/pkApi/getOther': {
    code: 0,
    'data|5': [{
      'name': '@cname'
    }],
    result: true
  }
}
```
服务启动后，打开`http://127.0.0.1:8018/pkApi/getPerson`就可以看到mock的数据了！

### Q&A
--------
##### 1 怎么去mock jsonp
在链接后面传`callback`参数就好了
##### 2 怎么去mock数据
参考[mock rule](http://mockjs.com/examples.html)
##### 3 怎么去处理更复杂的场景，我想要自定义数据返回
可以看下面的例子，`api`即可以是对象，也可以是函数，该函数是标准的express中间件，你可以在里面写返回逻辑，最后，`不要忘记将你的返回挂载在req.myData上`
``` javascript
module.exports = {
  ...
  ['/pkApi/getOther'] (req, res, next) {
    const id = req.query.id
    req.myData = {   // 重要! 将数据挂载在req.myData
      0: {
        code: 0,
        'test|1-100': 100
      },
      1: {
        code: 1,
        'number|+1': 202
      },
      2:{
        code: 2,
        'name': '@cname'
      },
      ...
    }[id]
    next()  // 最后不要忘记手动调用一下next，不然不会有返回
  }
  ...
}
```
`get`类型的请求可以通过`req.query`去获取参数

`post`类型的请求可以通过`req.body`去获取参数

### issues
-----------
[issue list](https://github.com/nwa2018/easy-config-mock/issues)
