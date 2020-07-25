let screenReaderText = document.getElementsByClassName("search-field")[0];
let submitButton = document.getElementsByClassName("search-submit");
//submitButton.onclick = searchResults;

function halyElRea7Tseh() {
 // console.log(screenReaderText.value);

  let searchResults = screenReaderText.value;



  fetch("/autoComplet", {
    method: "post",
    body: JSON.stringify({
      text: searchResults,
    })
  })
    .then(function (response) {
      if (response.status != 200) {
        console.log(
          "Looks like there was a problem. Status Code" + response.status
        );
        return;
      }
      return response.json();
    })
    .then(function (data) {
      let suggestion = data;
      arr10= suggestion.slice(0,10)
      ////////////////////////////////creat the serch result\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
      // reset the serch div 
      while (searched.hasChildNodes()) {
        searched.removeChild(searched.childNodes[0]);
      }
      if (searchResults ===""){
        while (searched.hasChildNodes()) {
          searched.removeChild(searched.childNodes[0]);
        }

      }
      suggestion.slice(0,10).forEach(element => {
        
        let searchedFor = document.createElement('li');
        searchedFor.id = 'searchedFor';
        document.body.appendChild(searchedFor);
        document.getElementById('searched').appendChild(searchedFor);
        searchedFor.className = 'searchedFor';
        searchedFor.innerHTML =  element;


        
      });

      ////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
      // if (searched.hasChildNodes()) {
      //   searched.removeChild(searched.childNodes[0]);
      // }



      // let searchedFor = document.createElement('div');
      // searchedFor.id = 'searchedFor';
      // document.body.appendChild(searchedFor);
      // document.getElementById('searched').appendChild(searchedFor);
      // searchedFor.className = 'searchedFor';
      // searchedFor.innerHTML = "Recent Searches" + ": " + suggestion[0];






    });
}



screenReaderText.addEventListener("keyup", halyElRea7Tseh);
