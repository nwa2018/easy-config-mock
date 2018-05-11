module.exports = {
  common: {
    port: 8000,
    timeout: 0,
    rate: 1
  },
  ["/pkReadApi/1710YearGrandCeremony"] (req, res, next) {
    req.myData = req.query.test ? {
      code: 0,
      msg: 'your res data must mount in req.myData'
    } : {
      code: 0,
      'data|0': [{
        'uid|1000-99999': 999,
        'sid': '@id',
        'name': '@cname',
        'noble_title_id|100-106': 100,
        'support|1000-9000':8000,
        'asid|1000-9000':8000
      }],
      result: true
    }
    next()
  },
  '/pkReadApi/1710YearGrandCeremony2': {
    code: 0,
    'data|0': [{
      'uid|1000-99999': 999,
      'sid': '@id',
      'name': '@cname',
      'noble_title_id|100-106': 100,
      'support|1000-9000':8000,
      'asid|1000-9000':8000
    }],
    result: true
  }
}
