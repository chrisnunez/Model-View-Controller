// Import Libraries
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');

// Import connection to Database
const sequelize = require('./config/connections');

// Import contorllers
const routes = require('./controllers/index');

const hbs = exphbs.create({});
const app = express();
const PORT = process.env.PORT || 3001;

// Set up sessions
const sess = {
  secret: 'Super secret secret',
  resave: false,
  saveUnitialized: false,
};

// Middleware allows us to have access to req.sesions
app.use(sessions(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlenconded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);

// turno n connection to db and server
const init = async () => {
  try {
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    await sequelize.sync({force: false});
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
    console.log('sUCCESFUL CONNETION TO THE DATABASE');
    app.listen(PORT, () => console.log("Express web server now listening"));
  } catch(err){
    console.log(err);
  }
}