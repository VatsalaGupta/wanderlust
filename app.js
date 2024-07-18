const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js"); // Adjust path to listing.js as needed
const path = require("path");

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
  });
}

app.get("/", (req, res) => {
  res.send("hi, i am root");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Uncomment to insert sample listing data
// app.get("/testListing", async (req, res) => {
//   try {
//     let sampleListing = new Listing({
//       title: "My New Villa",
//       description: "By the Mountains",
//       price: 1200,
//       location: "Aru Valley, Kashmir",
//       country: "India",
//     });
    
//     await sampleListing.save();
//     res.send("Sample listing saved successfully!");
//   } catch (err) {
//     console.error("Error saving sample listing:", err);
//     res.status(500).send("Error saving sample listing");
//   }
// });

app.get("/listings", async (req, res) => {
  try {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings }); // Adjust path to ejs file
  } catch (err) {
    console.error("Error fetching listings:", err);
    res.status(500).send("Error fetching listings");
  }
});

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
