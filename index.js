const MongoClient = require('mongodb').MongoClient;
const dboper = require('./operations');

// Connection URL
const url = 'mongodb://localhost:27017/';
const dbname = 'ristorante';

// Use connect method to connect to the Server
MongoClient.connect(url).then((client) => {
    console.log('Connected correctly to server');

    const db = client.db(dbname);

   //using the db operation
   dboper.insertDocument(db, { name: "Vadonut", description: "Test"}, "dishes")
   .then((result) => {
      console.log("Insert Document:\n", result.ops);

      return dboper.findDocuments(db, "dishes")
   })
   .then((docs) => {
      console.log("Found Documents:\n", docs);

      return dboper.updateDocument(db, { name: "Vadonut" }, { description: "Updated Test" }, "dishes");
   })
   .then((result) => {
      console.log("Updated Document:\n", result.result);

      return dboper.findDocuments(db, "dishes");
   })
   .then((docs) => {
      console.log("Found Updated Documents:\n", docs);

      return db.dropCollection("dishes");
   })
   .then((result) => {
      console.log("Dropped Collection: ", result);

      client.close();
   })
   .catch((err) => console.log(err));
});