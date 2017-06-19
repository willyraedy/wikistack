let express = require('express');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let nunjucks = require('nunjucks');
let models = require('./models/');
let indexRouter = require('./routes/');

let app = express();

app.set('view engine', 'html');
const env = nunjucks.configure('views', { noCache: true});
app.engine('html', nunjucks.render);
const AutoEscapeExtension = require("nunjucks-autoescape")(nunjucks);
env.addExtension('AutoEscapeExtension', new AutoEscapeExtension(env));


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//

app.use(express.static('public'));

app.use('/', indexRouter);


models.db.sync({ force: false })
  .then(function () {
    app.listen(3000, function () {
      console.log('Server is up on 3000');
    });
  })
  .catch(console.error);
