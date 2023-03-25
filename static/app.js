function doSend(colorVar) {
    console.log("Hello " + colorVar);
    $.ajax({
        type: "POST",
        url: "/action",
        contentType: "application/json; charset=utf-8",
        data:  JSON.stringify({color: colorVar}),
        // data: '{"color": "blue"}',
        success: (msg) => {
            console.log("my success", msg);
            getGuess();
        },
        error: failFunction,
        dataType: "json"
    });
}

function failFunction(xhr, errmsg) {
    console.log("my error", errmsg);
}

function sakrijGuess() {
    setTimeout(function(){
        let guessDiv = $("#guess-div");
        guessDiv.removeClass("bg-primary");
        guessDiv.removeClass("bg-danger");
        guessDiv.removeClass("bg-success");
        guessDiv.removeClass("bg-warning");
        enabledButtons();
    }, 1000);
}

function getGuess() {
    disabledButtons();
    $.ajax({
        type: "GET",
        url: "/get-guess",
        success: (msg) => {
            console.log("guess", msg);
            showGuess(msg);
            sakrijGuess(msg);
        },
        error: (err, xhr) => {
            console.log("guess error", err);
        },
        dataType: "json"
    });
    //console.log(1);
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
    }
}

function disabledButtons() {
    $("button").prop('disabled', true);
}

function enabledButtons() {
    $("button").prop('disabled', false);
}

$(document).ready(function(){
console.log("pocetak")
    getGuess();
});

