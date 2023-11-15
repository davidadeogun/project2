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



// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ message });
});



mongodb.initDb((err) => {
    if(err) {
        console.log('Error connecting to database', err);
    } else {
        app.listen(process.env.PORT || port, () => {
            console.log('Database is connected and Server running on port ' + (process.env.PORT || port));
        });
    }
}); 


