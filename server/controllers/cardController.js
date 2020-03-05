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

        Card.update(obj, option)
        .then(success => {
            if (success[0]) {
                res.status(200).json(obj)
            } else {
                res.status(404).json('Error 404: Not found')
            }    
        })
        .catch(err => {
            if (err) {
                res.status(400).json(err)
            } else {
                res.status(500)
            }
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