// data/database.js
const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = (callback) => {
    if (database) {
        console.log('Db is already initialized');
        return callback(null, database);
    }

    // Data validation for MongoDB URI
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
        return callback('MongoDB URI is missing in the environment variables');
    }

    MongoClient.connect(mongoUri)
        .then((client) => {
            database = client;
            callback(null, database);
        })
        .catch((err) => {
            callback(err);
        });
};

const getDatabase = () => {
    if (!database) {
        throw Error('Database not initialized')
    }
    return database;
};

module.exports = {
    initDb,
    getDatabase
};
