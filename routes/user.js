const router = require('express').Router()
const Model = require('../models')

router.get('/register', (req, res) => {
    res.render('user/register')
}).post('/register', (req, res) => {
    const { body } = req
    Model.User.create({
        username: body.username,
        password: body.password,
        email: body.email
    })
    .then(() => {
        res.redirect('/')
    })
    .catch(err => {
        req.session.error = err.message
        res.redirect('back')
    })
})

router.post('/login', (req, res) => {
    const { body } = req
    Model.User.findOne({
        where: {
            username: body.username,
            password: body.password
        }
    })
    .then(data => {
        if(data === null) {
            req.session.error = 'Wrong username / password'
        } else {
            req.session.error = null
            req.session.isLogin = true
            req.session.isAdmin = data.isAdmin === true ? true : false
            req.session.user = data.username
        }
        res.redirect('back')
    })
    .catch(err => {
        req.session.error = err.message
        res.redirect('back')
    })
})

router.get('/logout', (req, res) => {
    req.session.isLogin = false
    req.session.isAdmin = false
    req.session.user = null
    res.redirect('back')
})

module.exports = router