# easy-config-mock
[中文readme](https://github.com/nwa2018/easy-config-mock/blob/master/README-ZH.md)

easy mock data with easy config, `support customize middleware`. And it's easy integrated to your cli or workflow, what you have to do is just to `write some config`, and it can be `reload automatic`

> you can see a demo in the demo directory, please update your node to the 8.x version to run the demo

### install
--------
```
npm i easy-config-mock
or
yarn add easy-config-mock
```

### use
--------
``` javascript
const path = require('path')
const easyConfigMock = require('easy-config-mock')

new easyConfigMock({
  // just pass config file path to easyConfigMock, the server will watch this file and reload dynamic
  path: path.resolve(__dirname, 'xxxx.js')
})
```
`the config file example:`
``` javascript
// xxxx.js
module.exports = {
  // the common options is not neccessary, the default config is at bellow
  common: {
    // mock server default port, you can change the port, if the port is used, it will be changed automatic
    port: 8018,
    // maybe you want to see the ajax loading effect, you can set the request delay
    timeout: 500,
    // maybe you want to see what happen when the request fail, you can set the rate to 0, rate range between 0~1, mean the success rate
    rate: 1
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
open `http://127.0.0.1:8018/pkApi/getPerson` to see the mock data

### Q&A
--------
##### 1 how to mock jsonp
just pass the `callback` param in the request url
##### 2 how to mock data
you can reference the [mock rule](http://mockjs.com/examples.html)
##### 3 how to suit complex situation, I want to customize the response
please see the below demo, `api` can be object and can be function too, the function is a standard express middleware, you can write your logic, and `don't forget to mount your response in req.myData`
``` javascript
module.exports = {
  ...
  ['/pkApi/getOther'] (req, res, next) {
    const id = req.query.id
    req.myData = {   // this is important! mount your response in req.myData
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
    next()  // don't forget to call next in the last
  }
  ...
}
```
you can obtain the param in `req.query` in `get` request, and you can obtain the param in `req.body` in `post` request

### issues
-----------
feel free to open an issue when you encounter problems, [issue list](https://github.com/nwa2018/easy-config-mock/issues)
