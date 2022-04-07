const {Router} = require('express');
const { request, response } = require('../app');
const pool = require('../db');

const router = Router();

// GET ALL
router.get('/', (request, response, next) => {
    pool.query('SELECT * FROM habitats ORDER BY id ASC', (err, res) => {
        if (err) return next(err);

        response.json(res.rows);
    });
});

// POST
router.post('/', (request, response, next) => {
    const { name, climate, temperature } = request.body;

    pool.query(
        'INSERT INTO habitats(name, climate, temperature) VALUES($1, $2, $3)',
        [name, climate, temperature],
        (err, res) => {
            if (err) return next(err);

            response.redirect('/habitats');
        }
    )
})

module.exports = router;