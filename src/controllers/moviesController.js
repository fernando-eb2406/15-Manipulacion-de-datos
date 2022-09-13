const { Op } = require('sequelize');
const db = require('../database/models');
const moment = require('moment');


module.exports = {
    list : (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                return res.render('moviesList', {movies});
            })
            .catch(error => console.log(error));
    },
    new : (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ]
        })
            .then(movies => {
                return res.render('newestMovies', {movies})
            })
            .catch(error => console.log(error));
    },
    recomended : (req, res) => {
        db.Movie.findAll({
            where : {
                rating:{
                    [Op.gte] : 8
                },
                awards : {
                    [Op.gte] : 2
                }
            },
            limit : 5
        })
            .then(movies => {
                return res.render('recommendedMovies', {movies})
            })
            .catch(error => console.log(error));
    },
    detail : (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                return res.render('moviesDetail', {movie})
            })
            .catch(error => console.log(error));

    },
    add: function (req, res) {
        db.Genre.findAll()
            .then(genre => {
                return res.render('moviesAdd', {genre})
            })
            .catch(error => console.log(error))
    },
    create: function (req, res) {
        db.Movie.create({
            title : req.body.title,
            rating : req.body.rating,
            awards : req.body.awards,
            release_date : req.body.release_date,
            length : req.body.length,
            genre_id : req.body.genre
        })
            .then(movie => {
                res.redirect('/Movies')
            })
            .catch(error => console.log(error))
    },
    edit: function (req, res) {
        let movie = db.Movie.findByPk(req.params.id)
        let genre = db.Genre.findAll()
        Promise.all([genre, movie])
            .then(([Genres, Movie]) => {
                return res.render('moviesEdit', 
                {
                    Movie,
                    Genres,
                    fecha : moment(Movie.release_date).format('YYYY-MM-DD')
                })
            })
            .catch(error => console.log(error))
    },
    update: function (req,res) {
         db.Movie.update(
            {
            title : req.body.title.trim(),
            rating : req.body.rating,
            awards : req.body.awards,
            release_date : req.body.release_date,
            length : req.body.length
            },
            {
                where : {
                    id : req.params.id
                }
            }   
        )
            .then(movie => {
                return res.redirect('/movies')
            })
            .catch(error => console.log(error)) 
    },
    delete: function (req, res) {
        db.Movie.findByPk(req.params.id)
            .then(Movie => {
                return res.render('moviesDelete', {Movie})
            })
            .catch(error => console.log(error))
    },
    destroy: function (req, res) {
        db.Movie.destroy(
            {
                where: {
                    id : req.params.id
                }
            }
        )
            .then(movie => {
                return res.redirect('/movies')
            })
            .catch(error => console.log(error))
    }
}