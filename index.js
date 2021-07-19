// Moduls
const express = require('express');
require('dotenv').config();
const router = require('./routes/router');
const cors = require('cors');

//aixequem app
const app = express();
// Port que escoltem
var port = process.env.PORT || 4000;
//CORS
app.use(cors());
//Express parser
app.use(express.urlencoded({extended: true}));
//Router
app.use('/', router);

   
 

//Port q escolta el server
app.listen(port, ()=> { console.log('API en funcionament: http://localhost:' + port);});