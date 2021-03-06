const handlers = require("./handlers");
const autoComplet = require("./autoComplet")
const gitIt = require("./gitIt")

function router(request, response) {

  let url = request.url;
  
  if (url === "/")
    handlers.home(request, response);
  else if (url.includes("public")) {
    handlers.publicHandler(request, response);
  }
  else if (url === '/autoComplet' && request.method === "POST"){
    autoComplet(request, response)
  }
  else if (url === '/gitIt' && request.method === "POST"){
    gitIt(request, response)
  }
  else handlers.notFound(request, response);





}
module.exports = router;