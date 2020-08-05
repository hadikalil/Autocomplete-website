
const path = require("path");
const fs = require("fs");
const { stringify } = require("querystring");
const axios = require('axios')

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







module.exports = { home, notFound, publicHandler};
