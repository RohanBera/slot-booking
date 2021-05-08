const mongoose = require('mongoose');

const url = "mongodb+srv://dbUser:passwd@123@cluster0.4rvg0.mongodb.net/Bioblah?retryWrites=true&w=majority"

const connect = () => {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });
};

module.exports = {
    connect
};
