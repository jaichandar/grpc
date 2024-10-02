const express = require('express')
const cors = require('cors')
const morgan = require('morgan');
require('dotenv').config({});
const PORT = process.env.PORT || 7000;

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'));

// route middleware
const parentRoute = require('./routers/index');
app.use('/api/v1', parentRoute);

app.listen(PORT, () => {
    console.log(`Application Running on PORT: ${PORT}`);
})