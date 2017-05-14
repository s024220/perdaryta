var express = require('express');
var router = express.Router();
const version = JSON.parse(require("fs").readFileSync("package.json", "utf8"));

router.get('/', function(req, res, next) {
  res.render('e-mokykla/index', { title: 'E-mokykla' });
});

router.get('/info', function(req, res, next){
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(version, null, 3));
});

module.exports = router;
