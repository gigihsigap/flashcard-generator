"use strict"

$('#generate-card-button').on('click', function () {
    getRandomCard(0)
})

function getRandomCard(recursiveCount) {
    // Get a random English word //
    $.ajax({
        type: 'GET',
        url: `https://random-word-api.herokuapp.com/word?number=1`
    })
    .done(function (result) {
        // Translates the word //
        let randomWord = result[0]
        $.ajax({
            type: 'GET',
            url: `https://api.mymemory.translated.net/get?q=${randomWord}&langpair=en|ind`,
        })
        .done(function(text) {
            // Recursive if the word cannot be translated (max 3 times) //
            let translation = text.responseData.translatedText.toLowerCase()
            // console.log(`The word ${result} can be translated into ${translation}`) 
            if (randomWord === translation && recursiveCount < 3) {
                recursiveCount++
                getRandomCard(recursiveCount)
            } else {
                // Tries to find a definition. Accepts both success and fail condition //
                let definition
                $.ajax({
                    "async": true,
                    "crossDomain": true,
                    "url": `https://wordsapiv1.p.rapidapi.com/words/${randomWord}/definitions`,
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
                        "x-rapidapi-key": "b60baa146bmsh00b59306449f743p1865bdjsn57607345b3e6"
                    }
                })
                .done(function(output) {
                    // Write word definition //
                    if (output.definitions.length >= 1) definition = output.definitions[0].definition      
                })
                .fail(function() {
                    // No definition obtained //
                })
                .always(function() {
                    // Writes the result //
                    $('#suggested-card').empty()
                    $('#suggested-card').append(`
                    <p>${randomWord}</p>
                    <p>${translation}</p>
                    <p>${definition ? definition : ''}</p>
                    `)
                })
            }
        })
        .fail(function() {
            // Translation failed //
        })
        .always(function() {            
        })
    })
    .fail(function () {
        // Failed getting a random word //
    })
    .always(function () {
    })
}

$('#accept-suggestion-button').on('click', function() {
    $('#form').serializeArray()
})