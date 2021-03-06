"use strict"

const {Card} = require('../models')

class Controller {

    static list(req, res, next) {
        let option = {
            where: {UserId: req.userData.id}
        }
        Card.findAll(option)
        .then(data => res.status(200).json(data))
        .catch(err => next(err))
    }

    static add(req, res, next) {
        let obj = {
            front: req.body.front,
            subFront: req.body.subFront,
            synFront: req.body.synFront,
            back: req.body.back,
            subBack: req.body.subBack,
            synBack: req.body.synBack,
            UserId: req.userData.id
        }
        Card.create(obj)
        .then(data => res.status(201).json(data))
        .catch(err => next(err))
    }

    static getOne(req,res,next){
        let id = req.params.id
        Card.findOne({where:{id:id}})
        .then(result=>{
            if(result){
                res.status(200).json(result)
            } else{
                res.status(404).json('Error 404: Not found')
            }
        })
        .catch(err=>{
            next(err)
        })
    }

    static edit(req, res, next) {
        console.log('Masuk Edit')
        let id = req.params.id
        let option = { where: { id: id } }
        let obj = {
            front: req.body.front,
            subFront: req.body.subFront,
            synFront: req.body.synFront,
            back: req.body.back,
            subBack: req.body.subBack,
            synBack: req.body.synBack,
            UserId: req.userData.id
        }
        console.log(obj, option)

        Card.update(obj, option)
        .then(success => {
            console.log(success)
            if (success == 1) {
                res.status(200).json(obj)
            } else {
                res.status(404).json('Error 404: Not found')
            }    
        })
        .catch(err => {
            res.status(500).json(err)

        })
    }

    static delete(req, res, next) {
        console.log('Masuk Delete')
        let id = req.params.id
        let option = { where: { id: id } }

        Card.findOne(option)
        .then(card => {
            if (card) {
                Card.destroy(option)
                .then(() => res.status(200).json(card))
                .catch(err => next(err))
            } else {
                next(err)
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = Controller