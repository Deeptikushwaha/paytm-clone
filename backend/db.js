const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://mykamkani:918kSFV1ySwngZ0D@cluster0.vvnxv.mongodb.net/paytm")

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