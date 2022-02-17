const mongoose = require("mongoose");
const db = mongoose.connection;
const configs = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
};

mongoose.connect(process.env.DB_URL, configs);

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Connected to Vibez");
});

module.exports = {
    User: require("./User"),
    Post: require("./Post"),
    Note: require("./Note"),
};