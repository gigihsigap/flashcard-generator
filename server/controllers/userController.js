"use strict"

const {User} = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class Controller {

    static register(req, res, next) {
        let {username, email, password} = req.body

        User.create({
            username,
            email,
            password
        })
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            next(err)
        })
    }

    static login(req, res, next) {
        let obj = {
            email: req.body.email,
            password: req.body.password
        }
        let option = {
            where: {email: obj.email}
        }

        User.findOne(option)
        .then(user => {
            if (user) {
                let hash = user.password
                bcrypt.compare(obj.password, hash, (err, result) => {
                if (result) {
                    // ID di sini bakal masuk ke req.userData.id
                    let payload = {
                        id: user.id, email: user.email, username: user.username
                    }
                    let token = jwt.sign(payload, process.env.JWT_SECRET)
                    res.status(200).json({token})
                } else  {
                    res.status(400).json({
                        status: 400,
                        msg: 'Wrong email/password'
                    })
                }
            });
            } else {
                res.status(400).json({
                    status: 400,
                    msg: 'Wrong email/password'
                })
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = Controller