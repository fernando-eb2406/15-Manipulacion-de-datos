const { Op } = require('sequelize');
const db = require('../database/models');


module.exports = {
    list : (req, res ) => {
        db.Genre.findAll()
            .then(genres => {
                return res.render('genresList', {genres})
            })
            .catch(error => console.log(error))
    },
    detail : (req, res ) => {
        db.Genre.findByPk(req.params.id)
            .then(genre => {
                return res.render('genresDetail', {genre})
            })

    },
    add: function (req, res) {
        return res.render('genresAdd')
    },
    create: function (req, res) {
        db.Genre.create({
            name : req.body.name,
            ranking : req.body.ranking,
            active : req.body.active
        })
            .then(genre => {
                res.redirect('/genres')
            })
            .catch(error => console.log(error))
    },
    delete: function (req, res) {
        db.Genre.findByPk(req.params.id)
            .then(Genre => {
                return res.render('genresDelete', {Genre})
            })
            .catch(error => console.log(error))
    },
    destroy: function (req, res) {
        db.Genre.destroy(
            {
                where: {
                    id : req.params.id
                }
            }
        )
            .then(genre => {
                return res.redirect('/genres')
            })
            .catch(error => console.log(error))
    }
}