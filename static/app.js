function doSend(colorVar) {
    $.ajax({
        type: "POST",
        url: "/action",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({color: colorVar}),
        success: (msg) => {
            getGuess();
        },
        error: failFunction,
        dataType: "json"
    });
}

function failFunction(xhr, errmsg) {
    console.log("my error", errmsg);
}

function clearGuessColor() {
    let guessDiv = $("#guess-div");
    guessDiv.removeClass("bg-primary");
    guessDiv.removeClass("bg-danger");
    guessDiv.removeClass("bg-success");
    guessDiv.removeClass("bg-warning");
    enabledButtons();
}

function showColorsSequence(colors, index) {
    let duration = index % 2 === 0 ? 500 : 1000
    setTimeout(function(colors){
        if (index % 2 === 0) {
            showGuess(colors[index / 2])
        } else {
            showGuess("")
        }
        if (index <= 2 * colors.length - 2) {
           showColorsSequence(colors, index + 1)
        }
    }, duration, colors);
}

function getGuess() {
    disabledButtons();
    $.ajax({
        type: "GET",
        url: "/get-guess",
        success: (colors) => {
            showColorsSequence(colors, 0);
        },
        error: (err, xhr) => {
            console.log("guess error", err);
        },
        dataType: "json"
    });
}

function showGuess(color) {
    let guessDiv = $("#guess-div");
    if (color === "blue") {
        guessDiv.addClass("bg-primary");
    } else if (color === "red") {
        guessDiv.addClass("bg-danger");
    } else if (color === "green") {
        guessDiv.addClass("bg-success");
    } else if (color === "yellow") {
        guessDiv.addClass("bg-warning");
    } else {
        clearGuessColor();
    }
}

function disabledButtons() {
    $("button").prop('disabled', true);
}

function enabledButtons() {
    $("button").prop('disabled', false);
}

$(document).ready(function(){
    getGuess();
});

