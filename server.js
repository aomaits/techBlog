// required npms
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

//required middlewear
const routes = require('./controllers');
const helpers = require('./utils/helpers');

// Import the connection object
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Initialize an instance of Express.js
const app = express();

// Specify on which port the Express.js server will run
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
    secret: 'Super secret secret', //string used to sign the session ID cookie
    cookie: {
        maxAge: 300000, //5 minutes max, after which cookie will expire
        httpOnly: true,  //cookie only sent to server, won't persist in server-side sessions, not available to JS
        secure: false, //can use both https and http connections
        sameSite: 'strict', //only sends the cookie w/ requests from the cookie's origin site- no cross-site requests
    },
    resave: false, //session isn't saved if not modified- avoides unnecessary writes to session store
    saveUninitialized: true, //unintialized (unmodified) sessions are still saved to session store
    store: new SequelizeStore({
        db: sequelize //use sequelize to store the data from the cookie
    })
};

// import session middleware from the express-session package
app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware for parsing application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Point the path to the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Sets up the routes
app.use(routes);


// listen() method is responsible for listening for incoming connections on the specified port 
// Force false so data doesn't get dropped on every sync
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening on port 3001'));
});
