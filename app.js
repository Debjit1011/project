const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set(express.urlencoded({ extended: true }));

const MONGO_URL = "mongodb://127.0.0.1:27017/hotels";

async function main() {
    await mongoose.connect(MONGO_URL);
}

main()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log(err);
    })

// Home route
app.get("/", (req, res) => {
    res.send("Hi, I am root");
});


// Index route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find();
    res.render("./listings/index.ejs", {allListings});
});


// New (data) add route
app.get("/listings/new", (req, res) => {
    res.render("./listings/addNew.ejs");
});


//create route
app.post("/listings", async (req,res) => {
    //let {title,description,image,price,country,location} = req.body;
    // let listing = req.body.listing;
    // console.log(listing);
    const newListing = new Listing (req.body.listing);
    console.log(newListing);
    await newListing.save();
    res.redirect("/listings");
});


// Edit route
app.get("/listings/:id/edit", async (req, res) => {
    const  { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/edit.ejs", { listing });
});


// Show route
app.get("/listings/:id", async (req, res) => {
    const  { id } = req.params;
    const listingShow = await Listing.findById(id);
    res.render("./listings/show.ejs", { listingShow });
});




// Test route for MongoDB
// app.get("/testListng", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "My new villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Calangute, Goa",
//         country: "India",
//     })

//     await sampleListing.save();
//     console.log("sample Data save");
//     res.send("Successful Testing");
// });

const port = 8080;
app.listen(port, () => {
    console.log(`server is listening to port ${port}`);
});