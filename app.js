const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    res.locals.error = null
    next()
})
app.use('/cinema', require('./routes/cinema'))
app.use('/movie', require('./routes/movie'))
app.use('/screening', require('./routes/screening'))

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(3000)