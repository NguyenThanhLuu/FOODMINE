const mongoose = require("mongoose");
export default async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/food_store", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connect successfully!");
  } catch (error) {
    console.log("connect failure!");
  }
}

