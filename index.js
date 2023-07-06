const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model');
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    const recipe = { title: 'Recipe1', cuisine: 'Italian' };
    return Recipe.create(recipe);
  })
  .then(recipe => {
    console.log('New recipe added:', recipe.title);
    return Recipe.insertMany(data);
  })
  .then(() => {
    const filter = { title: 'Rigatoni alla Genovese' };
    const update = { duration: 100 };
    return Recipe.findOneAndUpdate(filter, update);
  })
  .then(() => {
    console.log('Recipe updated successfully');
    const filter = { title: 'Carrot Cake' };
    return Recipe.deleteOne(filter);
  })
  .then(() => {
    console.log('Recipe removed successfully');
    return mongoose.connection.close();
  })
  .then(() => {
    console.log('Database connection closed');
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
