import axios from 'axios'
import jsonp from 'jsonp'
import { stringify } from 'querystring'

jsonp(`http://127.0.0.1:8000/pkReadApi/1710YearGrandCeremony?${stringify({test: 0})}`, null, function (err, data) {
  console.log(err, data)
})
axios.post('http://127.0.0.1:8000/pkReadApi/1710YearGrandCeremony', {
  a: 333
}).then(rsp => {
  console.log(rsp.data)
})
