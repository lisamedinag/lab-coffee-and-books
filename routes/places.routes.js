const router = require("express").Router()
const Place = require('../models/place.model');

// to see raw data in your browser, just go on: http://localhost:3000/api
router.get('/api', (req, res, next) => {
    console.log("entrando en places api");
    Place.find()
        .then(allPlaces => {
            res.status(200).json({ places: allPlaces });
        })
        .catch(err => console.log(err))
});

// to see raw data in your browser, just go on: http://localhost:3000/api/someIdHere
router.get('/api/:id', (req, res, next) => {
    const { id } = req.params
    Restaurant.findById(id)
        .then(onePlaceFromDB => res.status(200).json({ place: onePlaceFromDB }))
        .catch(err => next(err))
})

// List all places
router.get("/", (req, res, next) => {
    Place
        .find()
        .then(foundPlaces => res.render("places/places", { places: foundPlaces }))
        .catch(err => next(err))
})

// Form to add a place 
router.get("/new", (req, res, next) => res.render("places/place-new"))

// Create a place 
router.post("/", (req, res, next) => {
    let location = {
        type: 'Point',
        coordinates: [req.body.longitude, req.body.latitude]
    }

    Place
        .create({
            name: req.body.name,
            description: req.body.description,
            location: location
        })
        .then(() => res.redirect("/places"))
        .catch(err => next(err))
})

//Show a single place 
router.get("/:place_id", (req, res, next) => {
    Place
        .findById(req.params.place_id)
        .then(foundPlace => res.render("places/place-details", { place: foundPlace }))
        .catch(err => next(err))
})

// Form to edit a place 
router.get("/:place_id/edit", (req, res, next) => {
    Place
        .findById(req.params.place_id)
        .then(foundPlace => res.render("places/place-edit", { place: foundPlace }))
        .catch(err => next(err))
})

// Edit a place 
router.post("/:place_id", (req, res, next) => {
    const { name, type,  } = req.body
    Place
        .findByIdAndUpdate(req.params.place_id, { name, type })
        .then(() => res.redirect(`/places/${req.params.place_id}`))
        .catch(err => next(err))
})

// Delete a place
router.get("/:place_id/delete", (req, res, next) => {
    Place
        .findByIdAndRemove(req.params.place_id)
        .then(() => res.redirect("/places"))
        .catch(err => next(err))
})


module.exports = router;