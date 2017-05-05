var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('e-mokykla/index', { title: 'E-mokykla' });
});

module.exports = router;
