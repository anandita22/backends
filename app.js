require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const db = require('./db/dbConfig');
const sessionConfig = require('./config/expressSession');
const homeRouter = require('./routes/homeRouter');
const apiRouter = require('./routes/apiRouter');
const errorController = require('./controllers/errorController');

const app = express();

app.set('view engine', 'ejs');

if (process.env.NODE_ENV === 'production') {
  let oneHour = 1000 * 60 * 60;
  app.set('trust proxy', 1);
  sessionConfig.cookie.secure = true;
  sessionConfig.cookie.httpOnly = true;
  sessionConfig.cookie.maxAge = oneHour * 24 * 3;
  sessionConfig.store = new MongoStore({
    mongooseConnection: db.mongoose.connection
  });
}

app.use(session(sessionConfig));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);

app.use('/api/v1', apiRouter);

app.use(errorController.get404ErrorPage);
app.use(errorController.get500ErrorPage);

app.listen(process.env.PORT, () => {
  console.log('Server is started!');
  db.connectDB();
});
