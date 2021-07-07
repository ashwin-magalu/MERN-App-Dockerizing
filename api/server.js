
const express = require("express");
const cors = require('cors');
const connectDb = require("./src/connection");
const User = require("./src/User.model");

const PORT = 8080;

const app = express();

app.use(cors());

app.get("/users", async (req, res) => {
    const users = await User.find();

    res.json(users);
});

app.get("/user-create", async (req, res) => {
    const user = new User({ username: "userTest" });

    await user.save().then(() => console.log("User created"));

    res.send("User created \n");
});

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);

    connectDb().then(() => {
        console.log("MongoDb connected");
    });
});