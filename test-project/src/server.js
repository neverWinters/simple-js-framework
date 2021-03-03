const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
const path = require('path');
const confStatic = require('./conf/static.json');
const confComponent = require('./conf/component.json');
const confRoute = require('./conf/route.json');
const routesArray = [];

if(process.env.NODE_ENV !== 'production'){ require('dotenv').config(); }
else{
   app.use((req, res, next) => {
       if(!req.secure){ return res.redirect(`https://${req.headers.host + req.url}`); }
       else{ return next(); }
   });
}
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ extended: true, inflate: true, limit: '100kb', parameterLimit: 1000, type: 'application/json', verify: undefined }));
for(let i = 0; i < confStatic.length; i++){
   app.use(confStatic[i].route, express.static(path.resolve(__dirname, confStatic[i].path)));
}
for(let i = 0; i < confComponent.length; i++){
   app.get(confComponent[i].route, (req, res) => {
       res.sendFile(confComponent[i].fileName, { root: path.resolve(__dirname, confComponent[i].path) });
   });
}
app.listen(process.env.PORT);