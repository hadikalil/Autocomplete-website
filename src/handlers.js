
const path = require("path");
const fs = require("fs");
const { stringify } = require("querystring");


function home(request, response) {

    let mainPagePath = path.join(__dirname, "..", "public", "index.html");
    fs.readFile(mainPagePath, (error, data) => {
        if (error) {
            badRequest(request, response);
            return;
        }
        response.writeHead(200, { "content-type": "text/html" });
        response.end(data)
    })
}

function publicHandler(request, response) {
    const requestURL = request.url;
    const ext = requestURL.split('.')[1];
    const extType = {
        html: 'text/html',
        css: 'text/css',
        js: 'application/javascript',

    };
    const filepath = path.join(__dirname, '..', requestURL);
    fs.readFile(filepath, (error, file) => {
        if (error) {
            badRequest(request, response)
        } else {
            response.writeHead(200, { 'content-type': extType[ext] });
            response.end(file);
        }
    })
}
function notFound(request, response) {
    //error 404
    fs.readFile(path.join(__dirname, '..', 'public', 'notFound.html'), (error, file) => {
        response.writeHead(404, { 'content-type': 'text/html' })
        response.end(file)
    })

}
function badRequest(request, response) {
    //error 400

    response.writeHead(400, { "content-type": "text/html" });
    response.end("<h1>bad request</h1>");
}


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





module.exports = { home, notFound, publicHandler, autoComplet };
