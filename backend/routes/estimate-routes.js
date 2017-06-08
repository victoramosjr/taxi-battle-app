const router = require('express').Router();
const axios = require('axios');

const getLyftToken = (req, res, token) => {
  axios({
    url: `https://api.lyft.com/v1/cost?start_lat=${req.params.currentLatitude}&start_lng=${req.params.currentLongitude}&end_lat=${req.params.destinationLatitude}&end_lng=${req.params.destinationLongitude}`,
    headers: { 
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    res.send(response.data);
  }).catch((error) => {
    res.send(error);
  });
};

const fetchLyftEstimate = (req, res) => {
  axios({
    url: 'https://api.lyft.com/oauth/token',
    method: 'POST',
    data: { grant_type: 'client_credentials', scope: 'public' },
    headers: {
      Authorization: 'Basic bEFmcmVMVHZXS1J4OnJ2TC00U3BuQXBwdHkzR2JyRDhnV0xkX0k5ZF9CQ1ZQ',
    },
    auth: {
      username: 'lAfreLTvWKRx',
      password: 'rvL-4SpnAppty3GbrD8gWLd_I9d_BCVP',
    },
 
  }).then((response) => {
    getLyftToken(req, res, response.data.access_token);
  }).catch((error) => {
    res.send(error);
  });
};

const getUberToken = (req, res, token) => {
  axios({
    url:`https://api.uber.com/v1.2/estimates/price?start_latitude=${req.params.currentLatitude}&start_longitude=${req.params.currentLongitude}&end_latitude=${req.params.currentLongitude}&end_lat=${req.params.destinationLatitude}&end_longitude=${req.params.destinationLongitude}`,
    headers: {
       Authorization: `Bearer ${token}`
    }
  }).then((response) => {
     console.log(response)
    res.send(response.data);
  }).catch((error) => {
    res.send(error);
  });
}

const fetchUberEstimate = (req, res) => {
  let client_id = "DZNqiDxCDRX__4nWIZ_Y3loBcAhIck2h"
  let client_secret = "oWRMqzahnZwAtuUJwmdUCZBpiyVJmGhEMfcNEvBE"
  axios({
    url:'https://login.uber.com/oauth/v2/token',
    method:'POST',
    form: {
     grant_type: 'client_credentials',
     scope: 'profile history'
    }
    headers: {
      Authorization: `Basic base64_encoded${client_id}:${client_secret}`,
      "Content-Type: multipart/form-data"
    }
  }).then((response) => {
    console.log(response)
    getUberToken(req, res, response.data.access_token);
  }).catch((error) => {
    res.send(error);
  });
}


router.route('/lyft/:currentLatitude/:currentLongitude/:destinationLatitude/:destinationLongitude')
  .get(fetchLyftEstimate);

router.route('/uber/:currentLatitude/:currentLongitude/:destinationLatitude/:destinationLongitude')
  .get(fetchUberEstimate);

module.exports = router;
