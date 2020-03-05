"use strict"

const baseURL = 'http://localhost:3000'

$(document).ready(function () {

    if (!localStorage.getItem('token')) {
        console.log('Not logged in yet!')
        $("#navbar-logged-in").hide()
        $("#navbar-not-logged-in").show()

    } else {
        console.log('Already logged in!')
        $("#navbar-not-logged-in").hide()
        showMainPage()
    }
});