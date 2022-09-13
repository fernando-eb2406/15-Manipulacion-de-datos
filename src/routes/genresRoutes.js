const express = require('express');
const router = express.Router();
const genresController = require('../controllers/genresController');


// /genres
router.get('/', genresController.list);
router.get('/detail/:id', genresController.detail);

router.get('/add', genresController.add);
router.post('/create', genresController.create);

router.get('/delete/:id', genresController.delete);
router.delete('/destroy/:id', genresController.destroy);


module.exports = router;