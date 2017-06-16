let express = require('express');
let router = express.Router();
let wikiRouter = require('./wiki');
let userRouter = require('./user');
let Page = require('../models/').Page;

router.use('/wiki', wikiRouter);
router.use('/user', userRouter);

router.get('/', function (req, res, next) {
  Page.findAll({})
  .then(arrPages => {
    console.log('arrPages: ', arrPages);
    res.render('index', {pages: arrPages});
  })
});

module.exports = router;

