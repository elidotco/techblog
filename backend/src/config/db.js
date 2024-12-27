const mongoose = require("mongoose");
const uri = process.env.MONGO_URI;
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    const connect = await mongoose.connect(uri, clientOptions);
    if (connect) {
      console.log("Database connected");
    } else {
      console.log("Database not connected");
    }
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);
module.exports = run();
