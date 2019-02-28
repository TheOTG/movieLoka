const router = require('express').Router()
const Model = require('../models')

// cinema list
router.get('/', (req, res) => {
    Model.Cinema.findAll({
        order: [
            ['id', 'ASC']
        ]
    })
    .then(cinemaData => {
        res.render('cinema/list', {
            cinemas: cinemaData
        })
    })
    .catch(err => {
        res.send(err.message)
    })
})

// add cinema
router.get('/add', (req, res) => {
    res.render('cinema/add')
}).post('/add', (req, res) => {
    const { body } = req
    if(body.logo === '') {
        body.logo = undefined
    }
    Model.Cinema.create({
        name: body.name,
        logo: body.logo
    })
    .then(() => {
        res.redirect('/cinema')
    })
    .catch(err => {
        res.send(err.message)
    })
})

// edit cinema
router.get('/:cinemaId/edit', (req, res) => {
    const { params } = req
    Model.Cinema.findByPk(params.cinemaId)
    .then(data => {
        res.render('cinema/edit', {
            cinema: data
        })
    })
    .catch(err => {
        res.send(err.message)
    })
}).post('/:cinemaId/edit', (req, res) => {
    const { params, body } = req
    Model.Cinema.update({
        name: body.name,
        logo: body.logo
    }, {
        where: {
            id: params.cinemaId
        }
    })
    .then(() => {
        res.redirect(`/cinema`)
    })
    .catch(err => {
        res.send(err.message)
    })
})

// show movies in cinema
router.get('/:cinemaId', (req, res) => {
    const { params } = req
    Model.Cinema.findOne({
        where: {
            id: params.cinemaId
        },
        include: [
            { model: Model.Movie }
        ]
    })
    .then(data => {
        // res.send(data)
        res.render('cinema/cinemaMovieList', {
            data
        })
    })
    .catch(err => {
        res.send(err.message)
    })
})

// add screening in cinema
router.get('/:cinemaId/addScreening', (req, res) => {
    const { params } = req
    Promise.all([Model.Movie.findAll({
        order: [
            ['id', 'ASC']
        ]
    }), Model.Cinema.findByPk(params.cinemaId)])
    .then(data => {
        res.render('cinema/addScreening', {
            cinema: data[1],
            movies: data[0]
        })
    })
    .catch(err => {
        res.send(err.message)
    })  
}).post('/:cinemaId/addScreening', (req, res) => {
    const { params, body } = req
    Model.Screening.create({
        MovieId: body.movieName[0],
        time: body.time,
        CinemaId: params.cinemaId,
        seatNumber: body.seatNumber
    })
    .then(data => {
        // res.send(data)
        for(let i = 0; i < data.seatNumber; i++) {
            Model.Seat.create({
                ScreeningId: data.id,
                status: 'empty'
            })
        }
        res.redirect(`/cinema/${params.cinemaId}`)
    })
    .catch(err => {
        res.send(err.message)
    })
})

// show the movie in cinema and its screenings
router.get('/:cinemaId/movie/:movieId', (req, res) => {
    const { params } = req
    Promise.all([Model.Movie.findByPk(params.movieId),Model.Screening.findAll({
        where: {
            MovieId: params.movieId,
            CinemaId: params.cinemaId
        }
    })])
    .then(data => {
        // res.send(data)
        res.render('cinema/movieScreening', {
            movie: data[0],
            screenings: data[1]
        })
    })
    .catch(err => {
        res.send(err.message)
    })
})

// booking seats
router.get('/:cinemaId/movie/:movieId/bookSeat/:screeningId', (req, res) => {
    const { params } = req
    Model.Screening.findOne({
        where: {
            id: params.screeningId
        },
        include: [
            { model: Model.Seat }
        ],
        order: [
            [Model.Seat, 'id', 'ASC']
        ]
    })
    .then(data => {
        // res.send(data)
        res.render('cinema/bookSeat', {
            data
        })
    })
    .catch(err => {
        res.send(err.message)
    })
}).post('/:cinemaId/movie/:movieId/bookSeat/:screeningId', (req, res) => {
    const { params, body } = req
    body.SeatId.forEach(seatId => {
        Model.Seat.update({
            status: 'booked'
        }, {
            where: {
                id: seatId
            }
        })
        .then(() => {
            Model.Ticket.create({
                SeatId: seatId,
                ScreeningId: params.screeningId,
                CinemaId: params.cinemaId,
                MovieId: params.movieId
            })
        })
        .catch(err => {
            res.send(err.message)
        })
    })
    res.redirect(`/cinema/${params.cinemaId}/movie/${params.movieId}`)
})

// delete cinema
router.get('/:cinemaId/delete', (req, res) => {
    const { params } = req
    Model.Cinema.destroy({
        where: {
            id: params.cinemaId
        }
    })
    .then(() => {
        res.redirect('/cinema')
    })
    .catch(err => {
        res.send(err.message)
    })
})

module.exports = router