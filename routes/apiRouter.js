let Router = require('express').Router;
const apiRouter = Router()
let helpers = require('../config/helpers.js')


/////////////////////////
//Import Database Schema
/////////////////////////

let User = require('../db/schema.js').User
let Prayr = require('../db/schema.js').Prayr

  
//////////////////
//PRAYR ROUTES
//////////////////

//POST - Write
apiRouter.post('/prayrs', function(request, response){ // create one prayr record
  let newprayr = new prayr(request.body)
  newprayr.save(function(err){
    if(err){
      return response.json(err)
    }
    response.json(newprayr)
  })
})

//GET - Read
apiRouter.get('/prayrs', function(request, response){ // read all prayr records
  prayr.find(request.query, function(err, records){
    if(err){
      return response.json(err)
    }
    response.json(records)
  })
})

//PUT - Update
apiRouter.put('/prayrs/:_id', function(request, response){ // update one prayr record
  var modelId = request.params._id
  console.log('Incoming -- ', request.body)
  prayr.findByIdAndUpdate(modelId, request.body, {new: true}, function(err, record){
    console.log('Record -- ', record)

    if(err){
      return response.json(err)
    }
    else {
      console.log('model updated', record)
      response.json(record)
    }
  })
})

//DELETE - Delete
apiRouter.delete('/prayrs/:_id', function(request, response){
  prayr.remove({_id: request.params._id}, (err) => {
    if(err) {
      return response.json(err)
    }
    response.json({
      msg: `record ${request.params._id} deleted successfully!`,
      _id: request.params._id
    })
  })
})



//////////////////
//USER ROUTES
//////////////////
  apiRouter
    .get('/users', function(req, res){
      User.find(req.query , "-password", function(err, results){
        if(err) return res.json(err) 
        res.json(results)
      })
    })

  apiRouter
    .get('/users/:_id', function(req, res){
      User.findById(req.params._id, "-password", function(err, record){
        if(err || !record ) return res.json(err) 
        res.json(record)
      })
    })
    .put('/users/:_id', function(req, res){

      User.findByIdAndUpdate(req.params._id, req.body, function(err, record){
          if (err) {
            res.status(500).send(err)
          }
          else if (!record) {
            res.status(400).send('no record found with that id')
          }
          else {
            res.json(Object.assign({},req.body,record))
          }
      })
    })

    .delete('/users/:_id', function(req, res){
      User.remove({ _id: req.params._id}, (err) => {
        if(err) return res.json(err)
        res.json({
          msg: `record ${req.params._id} successfully deleted`,
          _id: req.params._id
        })
      })  
    })


module.exports = apiRouter