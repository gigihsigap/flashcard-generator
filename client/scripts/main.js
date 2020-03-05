"use strict"

const baseURL = 'http://localhost:3000'

$(document).ready(function () {

    if (!localStorage.getItem('token')) {
        console.log('Not logged in yet!')
        $("#landingPage").show()
    } else {
        console.log('Already logged in!')
        showMainPage()
    }
});

//=========== PARAMETER AREA =========//
let username = $("#username")
let email = $("#email")
let password = $("#password")
let emailLogin = $("#emailLogin")
let passwordLogin = $("#passwordLogin")

//=========== BUTTON AREA ======//
$("#login-form")
