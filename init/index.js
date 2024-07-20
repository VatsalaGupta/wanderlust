const mongoose = require("mongoose");
const initData = require("./data.js");  // Adjust path as needed
const Listing = require("../models/listing.js");  // Adjust path as needed

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

async function main() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
}

async function initDB() {
  try {
    await Listing.deleteMany({});
    
    // Adjust data to ensure 'image' is a string URL
    const listings = initData.data.map(item => ({
      title: item.title,
      description: item.description,
      image: item.image.url,  // Assuming 'image' is an object with 'url' property
      price: item.price,
      location: item.location,
      country: item.country,
    }));

    await Listing.insertMany(listings);
    console.log("Data was initialized");
  } catch (err) {
    console.error("Error initializing database:", err);
  } finally {
    mongoose.disconnect();  // Close the connection after initialization
  }
}
