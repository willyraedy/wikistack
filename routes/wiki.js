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
    },
    include: [
        {model: User, as: 'author'}
    ]
  })
  .then((page) => {
    if (page === null) {
        res.status(404).send();
    } else {
        res.render('wikipage', {
            page: page
        });
    }
  })
  .catch(next)
})

wikiRouter.post('/', (req, res, next) => {
  User.findOrCreate({
    where: {
      email: req.body.email,
      name: req.body.author
    }
  })
    .spread(function (inst, created) {
      var user = inst;

      return Page.create({
        title: req.body.title,
        content: req.body.content,
        status: req.body.status,
        // authorId: inst.id
      }).then(function(newPage) {
         return newPage.setAuthor(user);
      });
    })
    .then((newPageWithAuthorId) => {
      // could not get user here
      res.redirect(newPageWithAuthorId.route);
    })
    .catch(next);
})

module.exports = wikiRouter;
