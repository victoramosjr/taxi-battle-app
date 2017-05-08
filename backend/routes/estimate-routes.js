const router = require('express').Router();
const $ = require('jquery');

function fetchLyftEstimate(token) {
  $.ajax({
    url: `https://api.lyft.com/v1/cost?start_lat=${req.params.currentLatitude}&start_lng=${req.params.currentLongitude}&end_lat=${req.params.destinationLatitude}&end_lng=${req.params.destinationLongitude}`,
    headers: {
      Authorization: 'Bearer ' + token
    },
    success: function(data) {
      console.log(data)
    }
  })
}

$.ajax({
  url: 'https://api.lyft.com/oauth/token',
  method: 'POST',
  data: {"grant_type": "client_credentials", "scope": "public"},
  headers: {
    Authorization: 'Basic bEFmcmVMVHZXS1J4OnJ2TC00U3BuQXBwdHkzR2JyRDhnV0xkX0k5ZF9CQ1ZQ'
  },
  username: 'lAfreLTvWKRx',
  password: 'rvL-4SpnAppty3GbrD8gWLd_I9d_BCVP',
  success: function(data) {
    console.log(data.access_token)
    getCost(data.access_token)
  },
  error: function(xhr, status, msg) {
    console.log(xhr, status, msg);
  }
});

router.route('/lyft/:currentLatitude/:currentLongitude/:destinationLatitude/:destinationLongitude')
  .get(fetchLyftEstimate);

router.route('/uber')
  .get(fetchUberEstimate);

module.exports = router;
