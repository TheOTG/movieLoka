const router = require('express').Router()
const Model = require('../models')
const Op = require('sequelize').Op

// cinema list
router.get('/', (req, res) => {
    console.log(req.session)
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
        req.session.error = err.message
        res.redirect('back')
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
        req.session.error = err.message
        res.redirect('back')
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
        req.session.error = err.message
        res.redirect('back')
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
        req.session.error = err.message
        res.redirect('back')
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
        req.session.error = err.message
        res.redirect('back')
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
        req.session.error = err.message
        res.redirect('back')
    })  
}).post('/:cinemaId/addScreening', (req, res) => {
    const { params, body } = req
    // res.send(body)
    Model.Screening.create({
        MovieId: body.movieName[0],
        time: body.time,
        CinemaId: params.cinemaId,
        totalSeats: body.totalSeats
    })
    .then(data => {
        // res.send(data)
        let seats = []
        for(let i = 0; i < data.totalSeats; i++) {
            let obj = {}
            obj.ScreeningId = data.id
            obj.status = 'empty'
            obj.seatNum = i + 1
            obj.CinemaId = data.CinemaId
            seats.push(obj)
        }
        console.log(seats)
        return Model.Seat.bulkCreate(seats)
    })
    .then(() => {
        res.redirect(`/cinema/${params.cinemaId}`)
    })
    .catch(err => {
        req.session.error = err.message
        res.redirect('back')
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
        req.session.error = err.message
        res.redirect('back')
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
        req.session.error = err.message
        res.redirect('back')
    })
}).post('/:cinemaId/movie/:movieId/bookSeat/:screeningId', (req, res) => {
    const { params, body } = req

    Model.Seat.update({
        status: 'booked'
    }, {
        where: {
            id: {
                [Op.in]: body.SeatId
            }
        }
    })
    .then(() => {
        let tickets = []
        body.SeatId.forEach(id => {
            let obj = {}
            obj.SeatId = id
            obj.ScreeningId = params.screeningId
            obj.CinemaId = params.cinemaId
            obj.MovieId = params.movieId
            tickets.push(obj)
        })
        return Model.Ticket.bulkCreate(tickets)
    })
    .then(() => {
        return Promise.all([
            Model.Cinema.findByPk(params.cinemaId),
            Model.Movie.findByPk(params.movieId),
            Model.Screening.findByPk(params.screeningId),
            Model.Seat.findAll({
                where: {
                    id: {
                        [Op.in]: body.SeatId
                    }
                }
            })])
    })
    .then(data => {
        // res.send(data)
        res.render('cinema/showTicket', {
            cinema: data[0],
            movie: data[1],
            screening: data[2],
            seats: data[3]
        })
    })
    .catch(err => {
        req.session.error = err.message
        res.redirect('back')
    })
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
        req.session.error = err.message
        res.redirect('back')
    })
})

// delete all screenings
router.get('/:cinemaId/deleteAllScreenings', (req, res) => {
    const { params } = req
    Promise.all([Model.Screening.destroy({
        truncate: true
    }),
    Model.Ticket.destroy({
        where: {
            CinemaId: params.cinemaId
        },
        truncate: true
    }),
    Model.Seat.destroy({
        where: {
            CinemaId: params.cinemaId
        }
    })])
    .then(() => {
        res.redirect('back')
    })
    .catch(err => {
        req.session.error = err.message
        res.redirect('back')
    })
})

module.exports = router