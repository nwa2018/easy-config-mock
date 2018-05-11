exports.successRate = (rate) => (req, res, next) => {
  if (rate > Math.random()) return next()
  return next(500)
}

exports.delayRes = (time) => (req, res, next) => {
  setTimeout(function() { next() }, time)
}

exports.jsonRes = () => (req, res, next) => {
  if (req.method === 'get') {
    res.setHeader('Content-Type', 'application/json')
  }
  next()
}

exports.crossDomain = () => (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === 'OPTIONS') res.status(200)
  next();
}
