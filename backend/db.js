const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URL)

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastName: String,
})

const User = mongoose.model("User", userSchema);

module.exports-{
    User
}