const path = require("path");
const fs = require("fs");


function autoComplet(request, response) {
    let body = "";
    // callback runs every time the stream has the next bit of data
    request.on("data", chunk => {
        body += chunk;
    });
    request.on("end", () => {
        let mainDictionaryPath = path.join(__dirname, "..", "public", "words_dictionary.json");
        fs.readFile(mainDictionaryPath, 'utf-8', (error, data) => {
           // console.log(body);
            if (error) {
                badRequest(request, response);
                return;
            }
            //.toLowerCase()
            const objData = JSON.parse(data)//
            const arrData = Object.keys(objData)
            const str = JSON.parse(body).text
         //   let filteredArray = arrData.filter(el => el.includes(str));
            let filteredArray = arrData.filter(el => el.indexOf(str) === 0);
           // console.log(filteredArray);

            response.writeHead(200, { "content-type": "text/html" });
            response.end(JSON.stringify(filteredArray))
           // response.end(JSON.stringify(JSON.parse(data).a))
        })
        // var newArray = arr.filter(callback(object[, ind[, array]])[, Arg])

        // console.log(body); // we should have the whole request body now
        // response.writeHead(200, { "content-type": "application/json" });
        // response.end(body)
    });

}


module.exports = autoComplet

