let express = require('express');
let router = express.Router();
let wikiRouter = require('./wiki');
let userRouter = require('./user');
let Page = require('../models/').Page;

router.use('/wiki', wikiRouter);
router.use('/users', userRouter);

router.get('/', function (req, res, next) {
  if (Object.keys(req.query).length) {
    Page.findByTag(req.query.tag)
    .then(pages => {
      res.render('index', {pages: pages})
    })

  } else {
    Page.findAll({})
    .then(arrPages => {
      res.render('index', {pages: arrPages});
    })
  }
});

module.exports = router;

