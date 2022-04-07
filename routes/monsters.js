const {Router} = require('express');
const { request, response } = require('../app');
const pool = require('../db');

const router = Router();


// GET ALL
router.get('/', (request, response, next) => {
    pool.query(`SELECT * FROM monsters ORDER BY id ASC`, (err, res)=>{
        if (err) return next(err);
    
        response.json(res.rows);
    });
});

// GET ONE
router.get('/:id', (request, response, next) =>{
    const { id } = request.params;

    pool.query('SELECT * FROM monsters WHERE id = $1', [id], (err, res) => {
        if (err) return next(err);

        response.json(res.rows);
    });
});

// POST 
router.post('/', (request, response, next) =>{
    const { name, personality } = request.body;

    pool.query('INSERT INTO monsters(name, personality) VALUES($1, $2)', [name, personality],
    (err, res) => {
        if (err) return next(err);

        response.redirect('/monsters');
    }
    );
});

// UPDATE
router.put('/:id', (request, response, next) => {
    const { id } = request.params;
    const keys = ['name', 'personality'];
    const fields = [];

    keys.forEach(key => {
        if (request.body[key]) fields.push(key);
    });

    fields.forEach((field, index) => {
        pool.query(
            `UPDATE monsters SET ${field}=($1) WHERE id=($2)`,
            [ request.body[field], id ],
            (err, res) => {
                if (err) return next(err);
    
                if (index === fields.length - 1) response.redirect('/monsters');
            }
        )
    })

});

// DELETE MONSTER
router.delete('/:id', (request, response, next) => {
    const { id } = request.params;

    pool.query('DELETE FROM monsters WHERE id=($1)', [id], (err, res) => {
        if (err) return next(err);

        response.redirect('/monsters');
    })
});

module.exports = router;