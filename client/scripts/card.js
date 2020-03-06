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
                <div class="card" id="cardList" onclick="getOneCard(${d.id})" style="width: 18rem;">
                <div class="card" style="width: 18rem;">
                <div class="card-body">
                <h5 class="card-title text-center">${d.front}</h5>
                <h6 class="card-subtitle text-center mb-2 text-muted">${d.back}</h6>
                <a href="#" class="card-link" onclick="getOneCard(${d.id})">Edit</a>
                <a href="#" class="card-link">Delete</a>
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
            $('#cardId').append(`
                <div class="card" id="cardList" onclick="getOneCard(${data.id})" style="width: 18rem;">
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

function updateCard(cardId) {
    $.ajax({
        method: 'PUT',
        url: baseURL + '/cards/' + cardId,
        headers: { token: localStorage.getItem('token') },
        data: {
            // .val()
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
  