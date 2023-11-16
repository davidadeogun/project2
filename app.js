const express = require('express');
const bodyParser = require('body-parser'); //Week 2
const mongodb = require('./data/database');
//const {professionalData} = require('./controllers/contacts');
const app = express();
const cors = require('cors')

const port = process.env.PORT || 3000; // default port for local dev


app.use(cors());
app.use(bodyParser.json()); //Week 2 
app.use((req, res, next) => {       //week2 newly added
   res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.use('/', require('./routes'));

//W3
process.on ('uncaughtException', (err, origin) => {
    console.log('Caught exception: ${err} \n' + 'Exception origin: ${origin}');
});

app.use(express.json());

/*
const passport = require('passport');
const OAuthStrategy = require('passport-oauth').OAuthStrategy;

passport.use('provider', new OAuthStrategy({
    requestTokenURL: 'https://www.provider.com/oauth/request_token',
    accessTokenURL: 'https://www.provider.com/oauth/access_token',
    userAuthorizationURL: 'https://www.provider.com/oauth/authorize',
    consumerKey: 'YOUR_CONSUMER_KEY',
    consumerSecret: 'YOUR_CONSUMER_SECRET',
    callbackURL: 'https://www.example.com/auth/provider/callback'
},
function(token, tokenSecret, profile, done) {
    User.findOrCreate({ providerId: profile.id }, function (err, user) {
        return done(err, user);
    });
}));
*/


mongodb.initDb((err) => {
    if(err) {
        console.log('Error connecting to database', err);
    } else {
        app.listen(process.env.PORT || port, () => {
            console.log('Database is connected and Server running on port ' + (process.env.PORT || port));
        });
    }
}); 


