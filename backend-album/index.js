const express = require('express');
const dbConnection = require('./src/config/db.js')
const routes = require('./src/routes/photos.js')
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;


dbConnection();

app.use(cors());
app.disable('x-powered-by');

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`)
})