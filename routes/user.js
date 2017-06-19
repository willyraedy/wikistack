let express = require('express');
let userRouter = express.Router();
let User = require('../models/').User;
let Page = require('../models/').Page;

module.exports = userRouter;

userRouter.get('/', (req, res ,next) => {
  User.findAll()
  .then(users => {
    res.render('users', {users: users})
  })
  .catch(next)
});

userRouter.get('/:id', (req, res, next) => {
  const userId = req.params.id;
  const user = User.findById(userId);
  const userPages = Page.findAll({
    where: {
      authorId: userId,
    }
  });
  Promise.all([user, userPages])
  .then(arrValues => {
    res.render('user', {user: arrValues[0], pages: arrValues[1]})
  })
  .catch(next)
});
