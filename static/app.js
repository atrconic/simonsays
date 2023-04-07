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
    let guessDiv = $("#guess-div");
    guessDiv.removeClass("bg-primary");
    guessDiv.removeClass("bg-danger");
    guessDiv.removeClass("bg-success");
    guessDiv.removeClass("bg-warning");
    enabledButtons();
}

function swapColorRek(colors, index) {
//    console.log("start timer for ", colors, index)
    let duration = index % 2 === 0 ? 500 : 1000
    setTimeout(function(colors){
//        console.log("abc", Date(), index)
        if (index % 2 === 0) {
            showGuess(colors[index / 2])
        } else {
            showGuess("")
        }
        if (index <= 2 * colors.length - 2) {
           swapColorRek(colors, index + 1)
        }
    }, duration, colors);
}

//function swapColor(colors) {
//    for (c in colors){
//        console.log("start timer for ", c)
//        setTimeout(function(c){
//            console.log("abc", Date(), c)
//        }, 1000, c);
//    }
//}

//primili boje, (colors = p, z, c)
//prikazi plavu
//cekaj 3 sekunde
//prikazi zelenu
//cekaj 3 sekunde
//prikazi crvenu
//cekaj 3 sekunde
//sakrij crvenu

function getGuess() {
    disabledButtons();
    $.ajax({
        type: "GET",
        url: "/get-guess",
        success: (colors) => {
            console.log("guess", colors);
            swapColorRek(colors, 0);
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
    } else {
        sakrijGuess();
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
//    getGuess();
    //swapColor(["A", "B", "C"]);
    swapColorRek(["blue", "green", "red", "yellow"], 0);
});

