//in backend we cannot use export, because we are using commonjs compoents like ;require'
const { MongoClient, ObjectId } = require("mongodb"); //if we forget to import mongoclient, then mongoclient will not be defined

function getClient() {
  return new MongoClient(process.env.CONNECTION_STRING); //gets value from .env as environment variable
}

function getAllDocuments(collectionName) {
  return getClient()
    .connect()
    .then(connection => {
      const db = connection.db("todo-app");
      return db.collection(collectionName).find().toArray();
    });
}

function getFilteredDocuments(collectionName) {
  return getClient()
    .connect()
    .then(connection => {
      const db = connection.db("todo-app");
      return db
        .collection(collectionName)
        .find(query) //this is where your filters go
        .toArray();
    });
}

function insertDocument(collectionName, document) {
  return getClient()
    .connect()
    .then(connection => {
      const db = connection.db("todo-app");
      return db
        .collection(collectionName)
        .insertOne(document)
        .then(x => {
          return db.collection(collectionName).find().toArray();
        });
    });
}

function deleteDocument(collectionName, id) {
  return getClient()
    .connect()
    .then(connection => {
      const db = connection.db("todo-app");
      return db.collection("songs").deleteOne({ _id: ObjectId(id) });
    });
}

module.exports = {
  getAllDocuments,
  insertDocument,
  deleteDocument,
  getFilteredDocuments,
};

//if you have embedded promises, you need to return all the promises.

//in package.json add the following
// "engines": {
//   "node": ">=14.2"
// },        //this setting is required because mongodb version is only suported after node v14
