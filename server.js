require('dotenv').config();
const express = require('express');

const app = express();
PORT=process.env.PORT || 3000

app.use('/', express.static('public'));

app.listen(PORT, console.log('server started at http://localhost:' + PORT));