const { Router } = require('express')
const path = require('path');

const router = Router()

router.get('/checkout/:uuid', function(req, res) {
    res.sendFile(path.join(__dirname, '/html/index.html'));
  });

  router.get('/missing', function(req, res) {
    res.sendFile(path.join(__dirname, '/html/missing.html'));
  });

module.exports = router
