const router = require('express').Router();
const axios = require('axios');

const getLyftToken = (req, res, token) => {
  console.log("URL===>", `https://api.lyft.com/v1/cost?start_lat=${req.params.currentLatitude}&start_lng=${req.params.currentLongitude}&end_lat=${req.params.destinationLatitude}&end_lng=${req.params.destinationLongitude}`)
  axios({
    url: `https://api.lyft.com/v1/cost?start_lat=${req.params.currentLatitude}&start_lng=${req.params.currentLongitude}&end_lat=${req.params.destinationLatitude}&end_lng=${req.params.destinationLongitude}`,
    headers: {  
      Authorization: `Bearer ${token}`
    }
  }).then(response => {
    console.log(response.data)
    res.send(response.data)
  }).catch(error => {
    res.send(error)
  })
}

const fetchLyftEstimate = (req, res) => {
  console.log('api in backend')
axios({
  url: 'https://api.lyft.com/oauth/token',
  method: 'POST',
  data: {"grant_type": "client_credentials", "scope": "public"},
  headers: {
    Authorization: 'Basic bEFmcmVMVHZXS1J4OnJ2TC00U3BuQXBwdHkzR2JyRDhnV0xkX0k5ZF9CQ1ZQ'
  },
  auth:{
    username: 'lAfreLTvWKRx',
    password: 'rvL-4SpnAppty3GbrD8gWLd_I9d_BCVP'
  }
  
}).then((response) => {
    console.log(response.data.access_token)
    getLyftToken(req, res, response.data.access_token)

}).catch((error) => {
    res.send(error)
})

}

router.route('/lyft/:currentLatitude/:currentLongitude/:destinationLatitude/:destinationLongitude')
  .get(fetchLyftEstimate);

// router.route('/uber')
//   .get(fetchUberEstimate);

module.exports = router;
