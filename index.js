const path = require('path')
const childProcess = require('child_process')
const chokidar = require('chokidar')
const portfinder = require('portfinder')
const EventEmitter = require('events').EventEmitter
const event = new EventEmitter()


function EasyConfigMock (options) {
  if (!(this instanceof EasyConfigMock)) {
    return new EasyConfigMock(options)
  }
  if (!options.path) throw new Error('请指定mock配置文件的路径')
  this.path = options.path
  this.port = 8018
  this.init()
}

EasyConfigMock.prototype = {
  constructor: EasyConfigMock,
  init () {
    const options = require(this.path)
    if (options.common) {
      if (options.common.mock !== undefined && !options.common.mock) {
        console.log('options mock is false, stop the mock server...')
        return
      }
    }
    this.port = (options.common && options.common.port) || this.port
    portfinder.basePort = this.port
    portfinder.getPort((err, port) => {
      if (err) {
        throw new Error(err)
      }
      this.port = port
      this.setUpWatcher()
    })

  },
  setUpWatcher () {
    this.forkChild()
    chokidar.watch(this.path, {
      persistent: true
    }).on('change', _ => {
      event.emit('killChild')
      setTimeout(_ => {
        this.forkChild()
      }, 30)
    })
  },
  forkChild () {
    const child = childProcess.fork(path.join(__dirname, 'server.js'), [], {
      encoding: 'utf8',
      execArgv: process.execArgv
    })
    child.on('error', (data) => {
      console.log(`Express server exited with error ${data.toString()}`)
    })

    child.on('exit', (code) => {
      console.log(`Express server exited with code ${code || 0}`)
    })

    event.on('killChild', _ => {
      child.kill('SIGKILL')
      event.removeAllListeners()
    })
    // 给子进程传递数据
    child.send({
      path: this.path,
      port: this.port
    })
    return child
  }
}

module.exports = EasyConfigMock
