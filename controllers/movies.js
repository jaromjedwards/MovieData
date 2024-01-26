// controllers/movies.js

const mongodb = require("../data/database");
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db().collection('Movies').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(204).json(result);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json('Internal server error');
    }
}

const getSingle = async (req, res) => {
    const movieId = new ObjectId(req.params.id);
    const db = mongodb.getDatabase();
    try {
        const movie = await db.db().collection('Movies').findOne({_id: movieId});
        res.setHeader('Content-Type', 'application/json');
        res.status(204).json(movie);
    } catch (error) {
        console.error('Error fetching single movie:', error);
        res.status(500).json('Internal server error');
    }
}

const createMovie = async (req, res) => {
    try {
        const movie = {
            movieTitle: req.body.movieTitle,
            movieDirector: req.body.movieDirector,
            leadActor: req.body.leadActor,
            supportingActor: req.body.supportingActor,
            synopsis: req.body.synopsis,
            beginning: req.body.beginning,
            ending: req.body.ending
        };

        const response = await mongodb.getDatabase().db().collection('Movies').insertOne(movie);

        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the movie');
        }
    } catch (error) {
        console.error('Error creating movie:', error);
        res.status(500).json('Internal server error');
    }
};

const updateMovie = async (req, res) => {
    const movieId = new ObjectId(req.params.id);
    const movie = {
        movieTitle: req.body.movieTitle,
        movieDirector: req.body.movieDirector,
        leadActor: req.body.leadActor,
        supportingActor: req.body.supportingActor,
        synopsis: req.body.synopsis,
        beginning: req.body.beginning,
        ending: req.body.ending
    };

    try {
        const response = await mongodb.getDatabase().db().collection('Movies').replaceOne({_id: movieId}, movie);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(400).json('No movie found or updated');
        }
    } catch (error) {
        console.error('Error updating movie:', error);
        res.status(500).json('Internal server error');
    }
};

const deleteMovie = async (req, res) => {
    const movieId = new ObjectId(req.params.id);

    try {
        const response = await mongodb.getDatabase().db().collection('Movies').deleteOne({_id: movieId});
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(400).json('No movie found or deleted');
        }
    } catch (error) {
        console.error('Error deleting movie:', error);
        res.status(500).json('Internal server error');
    }
};

module.exports = {
    getAll,
    getSingle,
    createMovie,
    updateMovie,
    deleteMovie
}