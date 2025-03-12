const express = require('express')
const Review = require('../models/Reviews')

const router = express.Router();

//create new Review
router.post('/', async(req, res) =>{
    try
    {
        const {clientName, reviewText, rating} = req.body
        const review = new Review({clientName, reviewText, rating})
        await review.save()
        res.status(200).json(review)
    }
    catch(err)
    {
        res.status(400).json({err: err.message})
    }
})

//getting all reviews
router.get('/', async (req,res) =>{
    try
    {
        const reviews =  await Review.find()
        res.json(reviews)
    }
    catch(error)
    {
        res.status(500).json({error :error.message})
    }
})

//fetching review based on ID
router.get('/:id', async (req,res) => {
    try
    {
        const review = await Review.findById(req.params.id)
        if(!review) return res.status(404).json({message: "Review not found"})
        res.json(review)
    }
    catch(error)
    {
        res.status(400).json({error: error.message})
    }
})

//update the review
router.put('/:id', async (req,res) => {
    try
    {
        const {clientName, reviewText, rating} = req.body
        const review = await Review.findByIdAndUpdate(
            req.params.id, {clientName, reviewText, rating} , {new: true}
        )
        if(!review) return res.status(404).json({message: "Review not found"})
        res.json(review)
    }
    catch(error)
    {
        res.status(400).json({error: error.message})
    }
})
//deleting a review
router.delete('/:id', async(req,res) => {
    try
    {
        const review = await Review.findByIdAndDelete(req.params.id)
        if(!review) res.status(404).json({message: "Review not found"})
        res.json({message: "Review deleted Successfully"})
    }
    catch(error)
    {
        res.status(400).json({error: error.message})
    }
})

module.exports = router