var express = require('express');
var app = new express();
var router = express.Router();
var appData = require('./data.json');
var category = appData.category;
var countScore = appData.countScore;
var countTop5 = appData.countTop5;
var sentence = appData.sentence;
var more = appData.more;
var feature = appData.feature;
var port = 9000;
router.get('/category', function (req, res) {
  res.json({
    errno: 0,
    data: category
  })
});
router.get('/countScore', function (req, res) {
  res.json({
    errno: 0,
    data: countScore
  })
});
router.get('/countTop5', function (req, res) {
  res.json({
    errno: 0,
    data: countTop5
  })
});
router.get('/sentence', function (req, res) {
  res.json({
    errno: 0,
    data: sentence
  })
});
router.get('/more', function (req, res) {
  res.json({
    errno: 0,
    data: more
  })
});
router.get('/feature', function (req, res) {
  res.json({
    errno: 0,
    data: feature
  })
});
app.use('/Server', router);
app.use(express.static('./dist'));
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log("running at 9000");
})

