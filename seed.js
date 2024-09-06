const mongoose = require('mongoose');
const PlantDisease = require("./models/predictionModel") // Adjust the path as needed

// Connect to your MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/plantDiseaseDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Data to seed
const diseases = [
    {
        result: 'Leaf Spots',
        image: 'https://youhadmeatgardening.com/wp-content/uploads/2020/11/leaf-spots-plant-disease.webp',
    },
    {
        result: 'Root Rot',
        image: 'https://youhadmeatgardening.com/wp-content/uploads/2020/11/root-rot-plant-disease.webp',
    },
    {
        result: 'Plant Rust',
        image: 'https://youhadmeatgardening.com/wp-content/uploads/2020/11/plant-rust-plant-disease.webp',
    },
    {
        result: 'Powdery Mildew',
        image: 'https://youhadmeatgardening.com/wp-content/uploads/2020/11/powdery-mildrew-plant-disease.webp',
    },
    {
        result: 'Gray Mold',
        image: 'https://youhadmeatgardening.com/wp-content/uploads/2020/11/gray-mold-plant-disease.webp',
    },
    {
        result: 'Stem Rot',
        image: 'https://youhadmeatgardening.com/wp-content/uploads/2020/11/stem-rot-plant-disease.webp',
    },
    {
        result: 'Cucumber Mosaic Virus',
        image: 'https://youhadmeatgardening.com/wp-content/uploads/2020/11/cucumber-mosaic-virus-plant-disease.webp',
    },
    {
        result: 'Aphids',
        image: 'https://youhadmeatgardening.com/wp-content/uploads/2020/11/aphids-plant-disease.webp',
    },
];

// Insert the data into the database
const seedDatabase = async () => {
    try {
        await PlantDisease.insertMany(diseases);
        console.log('Database seeded successfully!');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding the database:', error);
    }
};

// Run the seed function
seedDatabase();
