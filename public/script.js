let screenReaderText = document.getElementsByClassName("search-field")[0];
let form = document.querySelector(".form");
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
      arr10 = suggestion.slice(0, 10)
      ////////////////////////////////creat the serch result\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
      // reset the serch div 
      while (searched.hasChildNodes()) {
        searched.removeChild(searched.childNodes[0]);
      }
      if (searchResults === "") {
        while (searched.hasChildNodes()) {
          searched.removeChild(searched.childNodes[0]);
        }

      }
      suggestion.slice(0, 10).forEach(element => {

        let searchedFor = document.createElement('li');
        searchedFor.id = 'searchedFor';
        document.body.appendChild(searchedFor);
        document.getElementById('searched').appendChild(searchedFor);
        searchedFor.className = 'searchedFor';
        searchedFor.innerHTML = element;



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

console.log(form);

function searchOnSubmit(e) {
  e.preventDefault()
  //////////////////////////////////////////////////////////////search input 
  const data = new FormData(form)
  let searchInput = data.get("s")
  console.log(searchInput);
  
  for (const [name, value] of data)
    console.log(name, value);
  //////////////////////////////////////////////////////////////
  var gifImg
  axios
    .post("/gitIt", {
      searchInput
    })
    .then(res => {
      console.log(res);
      gifImg = res.data.data[0].images.fixed_height_downsampled.url;
      console.log(gifImg);

      
      let searchedgif = document.createElement('img');
      searchedgif.id = 'searchedgif';
      document.body.appendChild(searchedgif);
      document.getElementById('gif').appendChild(searchedgif);
      searchedgif.className = 'searchedgif';
      searchedgif.src = gifImg;



    })
    .catch(err => console.error(err))

}



screenReaderText.addEventListener("keyup", halyElRea7Tseh);
form.addEventListener("submit", searchOnSubmit);