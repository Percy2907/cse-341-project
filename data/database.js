const dotenv = require("dotenv");
dotenv.config();
const { MongoClient } = require("mongodb");
let database;
const initDb = (callback) => {
  if (database) {
    console.log("db is already working");
    return callback(null, database);
  }
  MongoClient.connect(process.env.MONGODB_URL)
    .then((client) => {
      database = client.db();
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
};
const getDatabase = () => {
  if (!database) {
    throw Error("database is not working correctly");
  }
  return database;
};
module.exports = {
  initDb,
  getDatabase,
};
