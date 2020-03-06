"use strict"

// const baseURL = 'http://localhost:3000'

function addNewCard() {
    $.ajax({
        method: 'POST',
        url: baseURL + '/cards',
        headers: { token: localStorage.getItem('token') },
        data: {
            front: $('#front').val(),
            subFront: $('#subFront').val(),
            synFront: [$('#synFront').val()], //ARRAY
            back: $('#back').val(),
            subBack: $('#subBack').val(),
            synBack: [$('#synBack').val()], //ARRAY
        },
        success: () => {
            console.log('successfully added new card')
            $('#addCardForm')[0].reset();
        },
        error: (err) => {
            console.log(err.responseText);
        }
    });
}

function getAllCards() {
    $.ajax({
        method: 'GET',
        url: baseURL + '/cards',
        headers: { token: localStorage.getItem('token') },
        success: (data) => {
            $('#cardList').empty();
            data.sort((a,b)=>{return b.id - a.id})
                data.forEach(d => {
                $('#cardList').append(`
                <div class="card" id="cardList" style="width: 18rem;">
                <div class="card" style="width: 18rem;">
                <div class="card-body">
                <h5 class="card-title text-center">${d.front}</h5>
                <button class="btn btn-warning card-link" onclick="editCardForm(${d.id})">Edit</a>
                <button class="btn btn-danger card-link" onclick="deleteCard(${d.id})">Delete</a>
                <button class="btn btn-danger card-link" onclick="getOneCard(${d.id})" >Train</a>
            </div>
            </div>
                `);
            });
        },
        error: (err) => {
            console.log(err.responseText);
        }
    });
}

function getOneCard(cardItem){
    $.ajax({
        method : 'GET',
        url : baseURL + '/cards/'+cardItem,
        headers : { token: localStorage.getItem('token') },
        success: (data) =>{
            $('#showCard').empty()
            $('#showCard').append(`
                <div class="card" id="cardList" onclick="getTwoCard(${data.id})" style="width: 18rem;">
                <div class="card" style="width: 18rem;">
                <div class="card-body">
                <h5 class="card-title text-center">${data.front}</h5>
                <h6 class="card-subtitle text-center mb-2 text-muted">${data.subFront}</h6>

            </div>
            </div>
            `)
            $('#main-page').hide()
            $("#cardId").show()
        },
        error:(err)=>{
            console.log(data)
            console.log(err.responseText)
        }

    })
}

function getTwoCard(cardItem){
    $.ajax({
        method : 'GET',
        url : baseURL + '/cards/'+cardItem,
        headers : { token: localStorage.getItem('token') },
        success: (data) =>{
            $('#showCard').empty()
            $('#showCard').append(`
                <div class="card" id="cardList" onclick="getOneCard(${data.id})" style="width: 18rem;">
                <div class="card" style="width: 18rem;">
                <div class="card-body">
                <h5 class="card-title text-center">${data.back}</h5>
                <h6 class="card-subtitle text-center mb-2 text-muted">${data.subBack}</h6>

            </div>
            </div>
            `)
            $('#main-page').hide()
            $("#cardId").show()
        },
        error:(err)=>{
            console.log(data)
            console.log(err.responseText)
        }

    })
}

function editCardForm(cardId){
    $.ajax({
        method : 'GET',
        url : baseURL + '/cards/' + cardId,
        headers : { token: localStorage.getItem('token') },
        success: (data) =>{
            console.log(data)
            $('#main-page').hide()
            $("#editCardPage").show()
            $('#edit-front').val(data.front)
            $('#edit-subFront').val(data.subFront)
            $('#edit-synFront').val(data.synFront)
            $('#edit-back').val(data.back)
            $('#edit-subBack').val(data.subBack)
            $('#edit-synBack').val(data.synBack)
            $('#editCardSubmit').data('cardId', cardId)
        },
        error:(err)=>{
            console.log(data)
            console.log(err.responseText)
        }

    })
}

function editCard() {
    var cardId = $('#editCardSubmit').data('cardId')
    $.ajax({
        method: 'PUT',
        url: baseURL + '/cards/' + cardId,
        headers: { token: localStorage.getItem('token') },
        data: {
            front: $('#edit-front').val(),
            subFront: $('#edit-subFront').val(),
            synFront: [$('#edit-synFront').val()],
            back: $('#edit-back').val(),
            subBack: $('#edit-subBack').val(),
            synBack: [$('#edit-synBack').val()],
        },
        success: () => {
            refresh()
        },
        error: (err) => {
            console.log(err.responseText);
        }
    });
}

function deleteCard(cardId) {
    $.ajax({
        method: 'DELETE',
        url: baseURL + '/cards/' + cardId,
        headers: { token: localStorage.getItem('token') },
        success: () => {
            refresh()
        },
        error: (err) => {
            console.log(err.responseText);
        }
    });
}

// function shuffle(array) {
//     var currentIndex = array.length, temporaryValue, randomIndex;
  
//     // While there remain elements to shuffle...
//     while (0 !== currentIndex) {
  
//       // Pick a remaining element...
//       randomIndex = Math.floor(Math.random() * currentIndex);
//       currentIndex -= 1;
  
//       // And swap it with the current element.
//       temporaryValue = array[currentIndex];
//       array[currentIndex] = array[randomIndex];
//       array[randomIndex] = temporaryValue;
//     }
  
//     return array;
//   }
  