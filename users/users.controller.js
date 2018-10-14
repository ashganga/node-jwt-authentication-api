const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/authenticate', authenticate);
router.get('/menu', getUserMenu);
router.get('/', getUserInfo);


module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function getUserInfo(req, res, next) {
    let id = req.query.id;
    userService.getUserInfo(id)
        .then(users => users ? res.json(users) : res.status(400).json({ message: 'User not found' }))
        .catch(err => next(err));
}

function getUserMenu(req, res, next) {
    let id =  req.query.id;
    userService.getUserMenu(id)
        .then(menu => menu ? res.json(menu) : res.status(400).json({ message: 'Menu not found' }))
        .catch(err => next(err));
}

