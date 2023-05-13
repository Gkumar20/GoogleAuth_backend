const mongoose = require('mongoose');

const uri = "mongodb://<username>:<password>@ac-0woxp95-shard-00-00.u8k7yxe.mongodb.net:27017,ac-0woxp95-shard-00-01.u8k7yxe.mongodb.net:27017,ac-0woxp95-shard-00-02.u8k7yxe.mongodb.net:27017/Leads4needs?replicaSet=atlas-232n4e-shard-0&ssl=true&authSource=admin";
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connected')
  })
  .catch((error) => {
    console.error(`Error connecting to database: ${error.message}`);
    process.exit(1);
  });
