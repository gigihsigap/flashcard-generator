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

$("#button-login-landingpage-submit").on("click",function(){
    $("#landingPage").hide()
    $("#loginForm").show()
})

$("#button-register-landingpage-submit").on("click",function(){
    $("#landingPage").hide()
    $("#registerForm").show()
})

$("#button-register-loginform-submit").on("click",function(){
    $("#landingPage").hide()
    $("#loginForm").hide()
    $("#registerForm").show()
})

$("#login-form").on("submit", function(event){
    event.preventDefault()
    login()
})

$("#register-form").on("submit",function(event){
    event.preventDefault()
    register()
})

//=========== FUNCTION AREA ==========//

function register(){
    $.ajax({
        url : "http://localhost:3000/user/register",
        method : "post",
        contentType  : "application/json",
        data : JSON.stringify({
            username : username.val(),
            email : email.val(),
            password : password.val()
        })
    })
    .done(function(data){
        console.log(data)
    })
    .fail(function(jqxhr,status,error){
        console.log(jqxhr.responseJSON)
    })
    .always(function(){

    })
}

function login(){
    $.ajax({
        url: "http://localhost:3000/user/login",
        method : "post",
        contentType : "application/json",
        data : JSON.stringify({
            email : emailLogin.val(),
            password : passwordLogin.val()
        })
    })
    .done(function(data){
        console.log(data)
    })
    .fail(function(jqxhr,status,error){
        console.log(data)
    })
    .always(function(data){

    })
}
