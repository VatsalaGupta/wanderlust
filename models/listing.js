const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    default: "https://unsplash.com/photos/the-sun-is-shining-through-the-trees-and-bushes-f7Dl0bRA2Ag",
    set: (v) => v === "" ? "https://unsplash.com/photos/the-sun-is-shining-through-the-trees-and-bushes-f7Dl0bRA2Ag" : v,
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
