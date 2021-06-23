import mongoose from 'mongoose'
import Bluebird from 'bluebird'
// lam viec voi chuan promise A+ trong js

/**
 *  connect to mongo db
 */

let connectDB = () => {
    mongoose.Promise = Bluebird;

    let URI = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    // let URI = 'mongodb://localhost:27017/igclone';
    return mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
}

module.exports = connectDB;