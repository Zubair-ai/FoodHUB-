const mongoose = require("mongoose");
const mongoURI = process.env.DATA_BASE;

async function connectToDatabase() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to database");

    // Define the "samples" model
    const MyModel = mongoose.model("samples", { name: String });

    // Define the "sample2" model
    const FoodCategory = mongoose.model("sample2", { name: String });

    // Fetch documents from the "samples" collection
    const documents = await MyModel.find();

    // Loop over the documents and fetch related documents from the "sample2" collection
    const dataArray = [];
    for (const doc of documents) {
      const categoryDocuments = await FoodCategory.find();
      const categoryDataArray = categoryDocuments.map((categoryDoc) => categoryDoc.name);
      const data = { name: doc.name, categories: categoryDataArray };
      dataArray.push(data);
    }

    // Store the results in global variables
    global.fooditem = await MyModel.find();
    global.catefooditem = await FoodCategory.find();
  } catch (error) {
    console.error("Error connecting to database:", error.message);
  }
}

module.exports = connectToDatabase;
