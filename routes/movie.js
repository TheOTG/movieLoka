const router = require('express').Router()
const Movie = require('../models').Movie
const Cinema = require('../models').Cinema
const request = require('request')
const YouTube = require('youtube-node')
const youtube = new YouTube()
youtube.setKey('AIzaSyBZNJY9BlzCiV8UuaoudKrFeLiHUmdgRvU')

router.get('/',(req,res)=>{
    Movie.findAll({
        order: [
            ['id', 'ASC']
        ]
    })
    .then(data=>{
        // res.json(data)

        res.render('./movie/list',{
            movie : data
        })
    })
    .catch(err=>{
        req.session.error = err.message
        res.redirect('back')
    })      
})

router.get('/search', (req, res) => {
    res.render('movie/search')
})

router.get('/results', (req, res) => {
    const url = 'https://www.omdbapi.com/?s=' + req.query.search + '&plot=full' + '&apikey=844c86dd';
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            
            // res.send(body)
            res.render('movie/results', {data: JSON.parse(body)});
        }
    })
}).post('/results', (req, res) => {
    youtube.search(`${req.body.Title} trailer`, 1, function(error, result) {
        if(error) {
            req.session.error = err.message
            res.redirect('back')
        } else {
            // res.send(result)
            const url = 'https://www.omdbapi.com/?t=' + req.body.Title + '&apikey=844c86dd';
            request(url, function(error, response, body){
                if(!error && response.statusCode == 200){
                    body = JSON.parse(body)
                    Movie.create({
                        title: body.Title,
                        rating: body.imdbRating,
                        release: body.Released,
                        trailer: result.items[0].id.videoId,
                        runtime: body.Runtime,
                        genre: body.Genre,
                        image: body.Poster,
                        synopsis: body.Plot
                    })
                    .then(() => {
                        res.redirect('/movie/search')
                    })
                    .catch(err => {
                        req.session.error = err.message
                        res.redirect('back')
                    })
                }
            })
        }
    })
})

router.get('/delete/:id',(req,res)=>{
    // res.json(req.params.id)
    
    Movie.destroy({where:{id : req.params.id}})
    .then(()=>{
        res.redirect('/movie')
        
    })
})

router.get('/detail/:id',(req,res)=>{
    Movie.findOne({
        where : {
            id : req.params.id

            
        },
        include : [
            {
                model : Cinema
            }
        ]
        
        
    })
    .then((data)=>{
        res.render('movie/detail',{
            movie : data

        })
        // res.json(data)
    })
    .catch((err)=>{
        req.session.error = err.message
        res.redirect('back')
    })
})


module.exports = router