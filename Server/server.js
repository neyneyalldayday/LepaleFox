const express = require('express');
const path = require('path')
const connection = require('./config/connection');
const routes = require('./controllers');

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'Super secret secret',
    cookie: {
      maxAge: 300000,
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: connection,
    }),
  };
  
app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended : true}));

app.use(express.static(path.join(__dirname, '../Client/dist')));


app.use(routes)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Client/dist', 'index.html'));
});

connection.sync({ force : false}).then(() => {
    app.listen(PORT , () => {
        console.log(`were listening on port ${PORT}`);
    })
})

