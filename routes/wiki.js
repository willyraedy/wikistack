let express = require('express');
let wikiRouter = express.Router();
let Page = require('../models/').Page;
let User = require('../models/').User;

wikiRouter.get('/', (req, res, next) => {
  res.redirect('/');
})

wikiRouter.get('/add', (req, res, next) => {
  res.render('addpage');
})

wikiRouter.get('/:urlTitle', (req, res, next) => {
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle,
    }
  })
  .then((page) => res.render('wikipage', {page: page}))
  .catch(next)
})

wikiRouter.post('/', (req, res, next) => {
  Page.create({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status,
  })
  .then((objPage) => {
    console.log('objPage: ', objPage)
    // res.redirect(objPage.get('route'));
    res.redirect(objPage.route);
  })
})

module.exports = wikiRouter;
