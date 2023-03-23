function doSend(colorVar) {
    console.log("Hello " + colorVar);
    $.ajax({
        type: "POST",
        url: "/action",
        contentType: "application/json; charset=utf-8",
        data:  JSON.stringify({color: colorVar}),
        // data: '{"color": "blue"}',
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

