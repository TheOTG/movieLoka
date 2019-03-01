const express = require('express')
const app = express()
const session = require('express-session')
const port = process.env.PORT || 3000

var sessionMiddleware = session({
    secret: 'keyboard cat',
    cookie: {
        maxAge: 1000*60*60
    }
})

app.locals.seatRow = require('./helpers/convertSeatNum')

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(sessionMiddleware)
app.use((req, res, next) => {
    if(!req.session.isAdmin) {
        res.locals.adminStatus = false
    } else {
        res.locals.adminStatus = req.session.isAdmin
    }
    if(!req.session.isLogin) {
        res.locals.loginStatus = false
        res.locals.user = null
    } else {
        res.locals.loginStatus = req.session.isLogin
        res.locals.user = req.session.user
    }
    if(!req.session.error) {
        res.locals.error = null
    } else {
        res.locals.error = req.session.error
        req.session.error = null
    }
    next()
})
app.use('/cinema', require('./routes/cinema'))
app.use('/movie', require('./routes/movie'))
app.use('/user', require('./routes/user'))

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port)