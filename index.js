// Moduls
const express = require('express');
require('dotenv').config();
const router = require('./routes/router');
const cors = require('cors');
const body_parser = require('body-parser');
//aixequem app
const app = express();
// Port que escoltem
var port = process.env.PORT || 4000;
//CORS
app.use(cors());
//Body parser
app.use(body_parser.urlencoded({extended: true}));
/* app.get('/', (req,res) =>{
    res.json({prova: "construint el server"});
} ); */
//Router
app.use('/', router);

   
 

//Port q escolta el server
app.listen(port, ()=> { console.log('API en funcionament: http://localhost:' + port);});