function doSend(color) {
    console.log("Hello " + color);
    $.ajax({
        type: "POST",
        url: "/action",
        data: '{"color": "blue"}',
        success: (msg) => {
            console.log("my success", msg)
        },
        error: failFunction,
        dataType: "json"
    });
}
function failFunction(xhr, errmsg) {
    console.log("my error", errmsg)
}

