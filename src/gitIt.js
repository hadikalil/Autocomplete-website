const { stringify } = require("querystring");
const axios = require('axios')

function gitIt(request, response) {


    let body = "";
    // callback runs every time the stream has the next bit of data
    request.on("data", chunk => {
        body += chunk;
    });
    request.on("end", () => {
        let searchInput = JSON.parse(body).searchInput // (body).searchInput => the searchInput is the value and the key from the incoming body of requst  
        console.log(searchInput);
      
        axios
        .get( `https://api.giphy.com/v1/gifs/search?api_key=CtRkwRRCXZUwnsVMt8IrHQpZUX0cEdLg&q=${searchInput}&limit=1`)
        .then(res =>{
           let sendItoFront = res.data
           response.end(JSON.stringify(sendItoFront))
        } )
        .catch(err => console.error(err))
       
    })
}



module.exports = gitIt