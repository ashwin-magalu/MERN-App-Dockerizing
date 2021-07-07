const mongoose = require("mongoose");
const User = require("./User.model");

const connection = "mongodb+srv://ash:1234@ash.qdwos.mongodb.net/docker-test?retryWrites=true&w=majority";

const connectDb = () => {
    return mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true });
};

module.exports = connectDb;