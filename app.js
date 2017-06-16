let express = require('express');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let nunjucks = require('nunjucks');
let models = require('./models/')

let app = express();

app.set('view engine', 'html');
var env = nunjucks.configure('views', { noCache: true });
app.engine('html', nunjucks.render);



app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'));

app.get('/', function (req, res, next) {
  res.render('index');
});


models.db.sync({ force: true })
  .then(function () {
    app.listen(3000, function () {
      console.log('Server is up on 3000');
    });
  })
  .catch(console.error);
