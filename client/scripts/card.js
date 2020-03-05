"use strict"

// const baseURL = 'http://localhost:3000'

function addNewCard(event) {
    event.preventDefault();
    $.ajax({
        method: 'POST',
        url: baseURL + '/cards',
        headers: { token: localStorage.getItem('token') },
        data: {
            title: $('#titleAdd').val()
        },
        success: () => {
            $('#addCardForm')[0].reset();
            getAllCards();
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
            // for (let i = data.length-1; i >= 0 ; i--) {
                data.forEach(d => {
                $('#cardList').append(`
                <tr>
                    <td><input type="text" id="titleUpdate-${d.id}" value="${d.title}" readonly></td>
                    <td><textarea id="descriptionUpdate-${d.id}" cols="30" rows="5">${d.description}</textarea></td>
                    <td><select id="statusUpdate-${d.id}">
                            <option value="" hidden></option>
                            <option value="Not Done Yet" ${d.status === 'Not Done Yet' ? 'selected' : '' }>Not Done Yet</option>
                            <option value="In Progress" ${d.status === 'In Progress' ? 'selected' : '' }>In Progress</option>
                            <option value="Finished" ${d.status === 'Finished' ? 'selected' : '' }>Finished</option>
                            <option value="Failed" ${d.status === 'Failed' ? 'selected' : '' }>Failed</option>
                        </select>
                    </td>
                    <td>
                        <input type="date" min="2019-01-01" max="2019-12-31" id="due_dateUpdate-${d.id}" value="${d.due_date.substring(0,10)}" readonly>
                    </td>
                    <td>
                        <button onclick="updateCard(${d.id})">Update</button>
                        <button onclick="deleteCard(${d.id})">Delete</button>
                    </td>
                </tr>
                `);
            });
            // }
        },
        error: (err) => {
            console.log(err.responseText);
        }
    });
}

function updateCard(cardId) {
    $.ajax({
        method: 'PUT',
        url: baseURL + '/cards/' + cardId,
        headers: { token: localStorage.getItem('token') },
        data: {
            title: $(`#titleUpdate-${cardId}`).val(),
            description: $(`#descriptionUpdate-${cardId}`).val(),
            status: $(`#statusUpdate-${cardId}`).val(),
            due_date: $(`#due_dateUpdate-${cardId}`).val()
        },
        success: () => {
            getAllCards();
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
            getAllCards();
        },
        error: (err) => {
            console.log(err.responseText);
        }
    });
}