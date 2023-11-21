const express = require('express');
const bodyParser = require('body-parser'); //Week 2
const mongodb = require('./data/database');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const app = express();
const cors = require('cors')


app.use(express.static('public'));

const port = process.env.PORT || 3000; // default port for local dev
app.set('view engine', 'ejs');
app
    .use(bodyParser.json())
    .use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    }))
// Session and Passport configuration
    .use(passport.initialize())

    .use(passport.session())

    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization'
        );
        res.setHeader
        ('Access-Control-Allow-Methods',
            'POST, GET, PUT, PATCH, DELETE, OPTIONS'
        );
        next();
    })
    .use(cors({ methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT']}))
    .use(cors({ origin: '*'}))
    .use('/', require('./routes/index.js'));

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
        passReqToCallback: true
    },
    function (request, accessToken, refreshToken, profile, done) {
        //console.log(profile);
        return done(null, profile);
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    //console.log(user);
    done(null, user);
});

app.get('/', (req, res) => {res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged out")});
app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/api-docs', session: false }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/api-docs');
    }
);
app.use(express.json());


mongodb.initDb((err) => {
    if(err) {
        console.log('Error connecting to database', err);
    } else {
        app.listen(process.env.PORT || port, () => {
            console.log('Database is connected and Server running on port ' + (process.env.PORT || port));
        });
    }
}); 


