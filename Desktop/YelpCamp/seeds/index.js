const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})


const sample = (array) => array[Math.floor(Math.random() * array.length)];


const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 500; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '61e0cff1361d9efbcef6c190',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt quam ipsam minus nisi! Accusamus tempore adipisci, mollitia dolorem modi nesciunt velit nihil ut accusantium voluptates, libero officia voluptatibus provident perferendis.',
            price,
            geometry: {
                type: "Point",
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            images: [{
                    url: 'https://res.cloudinary.com/drxfsucco/image/upload/v1642368914/YelpCamp/sjrx9dlqnj1moifph8fw.png',
                    filename: 'YelpCamp/sjrx9dlqnj1moifph8fw',
                },
                {
                    url: 'https://res.cloudinary.com/drxfsucco/image/upload/v1642368914/YelpCamp/xb2wsx6du7mcichesi8o.png',
                    filename: 'YelpCamp/xb2wsx6du7mcichesi8o',
                },
                {
                    url: 'https://res.cloudinary.com/drxfsucco/image/upload/v1642368914/YelpCamp/ysaxtsbxqrsg6b8s5lhg.png',
                    filename: 'YelpCamp/ysaxtsbxqrsg6b8s5lhg',
                }
            ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});