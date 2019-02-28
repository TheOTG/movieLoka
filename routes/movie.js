const router = require('express').Router()
const Movie = require('../models').Movie
const Cinema = require('../models').Cinema


router.get('/',(req,res)=>{

    Movie.findAll()
    .then(data=>{
        // res.json(data)

        res.render('./movie/list',{
            movie : data
        })
    })
    .catch(err=>{
        res.send(err)
    })      
})


router.get('/delete/:id',(req,res)=>{
    // res.json(req.params.id)
    
    Movie.destroy({where:{id : req.params.id}})
    .then(()=>{
        res.redirect('/movie')
        
    })
})

router.get('/add',(req,res)=>{
   res.render('./movie/add')
})
router.post('/add',(req,res)=>{
    Movie.create({
        name: req.body.name,
        rating : req.body.rating,
        trailer : req.body.trailer,
        image: req.body.image,
        synopsis : req.body.synopsis
    })
   .then(()=>{
    res.redirect('movie/list')
   })
   .catch(err=>{
       res.send(err)
   })
})

router.get('/update/:id',(req,res)=>{
    Movie.findByPk(req.params.id)
    .then((data)=>{
        res.render('movie/update',{
            movie:data
        }
       )
    })
})
router.post('/update/:id',(req,res)=>{
    Movie.update({
        name: req.body.name,
        rating : req.body.rating,
        trailer : req.body.trailer,
        image: req.body.image,
        synopsis : req.body.synopsis
    },{
        where: {
            id : req.params.id
        }
    })
   
    .then((data)=>{
        res.redirect('/movie')
    })
    .catch((err)=>{
        res.send(err)
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
        res.send(err)
    })
})


module.exports = router