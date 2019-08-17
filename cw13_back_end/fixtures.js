const mongoose = require("mongoose");
const config = require("./config");
const Institution = require("./models/Institution");
const Rating = require("./models/Rating");
const User = require("./models/User");
const Image = require("./models/Image");
const nanoid = require("nanoid");

const run = async () => {
    await mongoose.connect(config.dbUrl, config.mongoOptions);

    const connection = mongoose.connection;

    const collections = await connection.db.collections();

    for (let collection of collections) {
        await collection.drop();
    }

    const [user1, user2, user3] = await User.create(
        {
            username: "soph",
            password: "123",
            name: "Sophia",
            role: "admin",
            image: "sophia.jpeg",
            token: nanoid(),

        },
        {
            username: "margo",
            password: "123",
            name: "Margaret",
            role: "user",
            image: "margaret.jpeg",
            token: nanoid(),

        },
        {
            username: "mark",
            password: "123",
            name: "Mark",
            role: "user",
            image: "mark.jpeg",
            token: nanoid(),

        },
    );

    const [institution1, institution2, institution3, institution4, institution5, institution6] = await Institution.create(
        {
            title: "Roseleaf bar cafe",
            description: "A homely wee neighbourhood bar/restaurant serving up food from 10 till 10 and drinks till 1am:) Culinary hugging people since July 2007",
            image: "sunshine-on-leith.jpg",
            user: user1._id
        },
        {
            title: "Vittoria On The Walk",
            description: "#204 of 1,847 Restaurants in Edinburgh Certificate of Excellence2015 - 2019 Winner",
            image: "vittoria-on-the-walk.jpg",
            user: user1._id
        },
        {
            title: "Locanda De Gusti",
            description: "ood and ambience\n" +
                "Italian, Seafood, Mediterranean, Vegetarian Friendly, Vegan Options\n" +
                "The Parma ham and melon appetizer was terrific.\n" +
                "Our husbands shared the seafood platter which included tuna, sea bass, langos...\n" +
                "It was enormous ..sea bass fillets swordfish tuna langoustines shrimp and sea...\n" +
                "An enormous pan of freshly cooked mussels, clams, calamari, prawns with their...",
            image: "locanda.jpg",
            user: user2._id
        },
        {
            title: "RadiCibus Italian Restaurant",
            description: "Food and ambience Italian, Mediterranean, European, Contemporary, Healthy Ordered polenta with porcini with one of the red wines and some olives to nib... The last of the crab The calamari was cooked to perfection as was the seared tuna. This time I had the crab pasta which was delicious!",
            image: "cappellacci.jpg",
            user: user2._id
        },
        {
            title: "Di Giorgio's",
            description: "Details CUISINES Italian, Cafe SPECIAL DIETS Vegetarian Friendly, Vegan Options, Gluten Free Options MEALS Breakfast, Lunch, Dinner, Brunch",
            image: "photo0jpg.jpg",
            user: user3._id
        },
        {
            title: "Polentoni",
            description: "Details CUISINES Italian, Cafe, European SPECIAL DIETS Vegan Options, Vegetarian Friendly, Gluten Free Options MEALS Breakfast, Lunch, Brunch",
            image: "scrambled-eggs-with-spinach.jpg",
            user: user3._id
        },
    );

    await Rating.create(
        {
            food_quality: 5,
            service_quality: 5,
            interior: 5,
            institution: institution1._id,
            user: user2._id,
            comment: "Had dinner with girl friends. Menu is perfect, something for everyone. Service was awesome and Jason was very accommodating. Will be back definitely!"
        },
        {
            food_quality: 5,
            service_quality: 4,
            interior: 5,
            institution: institution1._id,
            user: user3._id,
            comment: "The job of a food reviewer is to accurately convey the interior, texture, smell, and presentation of a restaurant's food."
        },
        {
            food_quality: 5,
            service_quality: 2,
            interior: 5,
            institution: institution1._id,
            user: user3._id,
            comment: "Once you've had your meal and taken your notes, take a little time to see what the restaurant's history is. These kind of details are a great way to add some color to your review. "
        },
        {
            food_quality: 4,
            service_quality: 4,
            interior: 4,
            institution: institution2._id,
            user: user2._id,
            comment: "Visited as a guest in the Echo restaurant for lunch just today. We were entertaining friends from California, and enjoyed our ocean side table. We chose to stay indoors - to enjoy the air conditioning 😊. I just want to say that, in addition to a nice meal, we had a delightful waitress, Jackie. She had just the right balance of friendliness and efficiency. She recognized that we wanted time to visit and did not rush us. She and other staff members made certain that we had everything we needed. Kudos!"
        },
        {
            food_quality: 3,
            service_quality: 3,
            interior: 3,
            institution: institution3._id,
            user: user3._id,
            comment: "We had lunch here a few times while on the island visiting family and friends. The servers here are just wonderful and have great memories it seems. We sat on the ocean front patio and enjoyed the view with our delicious wine and lunch. Must try!"
        },
        {
            food_quality: 5,
            service_quality: 2,
            interior: 4,
            institution: institution4._id,
            user: user3._id,
            comment: "Hello. Please give our thanks to the Manager(s) and others for the wonderful room and bottle of sparkling wine for our Anniversary stay. We had an amazing time. The room was so comfortable, the food at Echo absolutely spectacular (we ate two meals there). Our waitress was just wonderful. Looking forward to staying with you in the future. What a great place!"
        },
        {
            food_quality: 3,
            service_quality: 5,
            interior: 5,
            institution: institution5._id,
            user: user1._id,
            comment: "Rachel at the Pool (drinks server) was so gorgeous. We chatted with her all weekend and she played with the kids. She's an asset to the hotel esp for people with families. I saw other attendants playing with the kids too which is so welcoming. Rachel was gorgeous. Give her a raise!"
        },
        {
            food_quality: 5,
            service_quality: 5,
            interior: 4,
            institution: institution6._id,
            user: user1._id,
            comment: "I had lunch with some of my colleagues at Echo on Day 1. I had the wedge salad - it was delicious. On Night 2, I enjoyed a drink at the bar. I had a Margarita. The service was excellent."
        }
    );

    await Image.create(
        {
            institution: institution1._id,
            user: user1._id,
            image: "the-bar-area.jpg"
        },
        {
            institution: institution2._id,
            user: user1._id,
            image: "the-bar-area.jpg"
        },
        {
            institution: institution3._id,
            user: user2._id,
            image: "marinated-octopus-with.jpg"
        },
        {
            institution: institution4._id,
            user: user2._id,
            image: "cozze.jpg"
        },
        {
            institution: institution4._id,
            user: user3._id,
            image: "photo0jpg (1).jpg"
        },
        {
            institution: institution4._id,
            user: user3._id,
            image: "polentoni.jpg"
        }
    );

    return connection.close();
};

run().catch(error => {
    console.error("Something went wrong!", error);
});