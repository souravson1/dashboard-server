require("dotenv").config({
    path: "./.env"
})
const cors = require("cors");
const express = require('express');
const { Authentication } = require("./routes");
const { ConnectDB } = require('./config/db');
const morgan = require("morgan");
const history = require("connect-history-api-fallback");

const httpStatus = require('http-status');
const ApiError = require('./utils/ApiError');
const { errorConverter, errorHandler } = require('./middlewares/error');


const app = express()
const path = require("path");
const port = process.env.PORT || 3000
ConnectDB();

// middleware
app.use(cors());
app.use("/static/", express.static(path.join(__dirname, "./uploads/")))
app.use(express.static(path.resolve(__dirname, './dist'), {maxAge : '1y', etag: false}))
app.use(history());
app.use(morgan("dev"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());


// routes
app.get('/', (req, res) => res.send('Hello World!'));

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, './dist/index.html'))
});

app.use("/api/v1", Authentication);


app.use((req, res, next)=>{
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});
app.use(errorConverter);
app.use(errorHandler);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))