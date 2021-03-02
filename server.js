const express = require("express"); // server framework
const mongoose = require("mongoose"); // handles the mongodb
const logger = require("morgan"); // logs api calls to terminal
const app = express(); // for communicating with server
require('dotenv').config()

const PORT = process.env.PORT || 3000; // establishes location of connection

// const db = require("./models");

app.use(logger("dev")); // these run after request, before routes
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static("public"));

// neccessary to properly run mongoose
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

// provides more information on db errors in terminal
// const db = mongoose.connection;
// db.on("error", (error) => console.error(error));
// db.once("open", () => console.log("connected to Database"));

// connect to html and api routes
require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);

// connects to db propper and logs location
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});