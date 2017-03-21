var socket = io('https://dorsia.fabiantjoeaon.com:8080', {secure: true});
var request = new XMLHttpRequest();

socket.on('connect', () => {console.log('connected to server')});
socket.on('getIngredient', function(data) {
    fetchFromAPI(data);
    fetchWordOnDevice(data);
});


// fetchFromAPI('appel');
// fetchWordOnDevice('appel');

function fetchWordOnDevice(data) {
    // print word on screen
    var teachDutch = document.getElementById('teach-dutch');
    var word = document.createElement('h1');
    word.appendChild(document.createTextNode(data));
    teachDutch.innerHTML = '';
    teachDutch.style.backgroundColor = selectBackgroundColor();
    teachDutch.appendChild(word);
    // speak out word on screen
    var msg = new SpeechSynthesisUtterance();
    msg.text = data;
    msg.lang = 'nl';
    speechSynthesis.speak(msg);
}

function selectBackgroundColor() {
  var colors = [
      '#FFA87B',
      '#F35C6E',
      '#5C3E84',
      '#FC5050',
      '#CF56A1',
      '#94AC3C',
      '#AEAF7A',
      '#AEAF7A',
      '#D1E9EA'
  ];
  var randInt = colors[Math.floor(Math.random() * colors.length)];
  return randInt;
}

function fetchFromAPI(ingredient) {
    var url = urlBuilder(ingredient);
    request.open('GET', url, true);
    request.onload = function () {
        // zet json om naar javascript object
        var json = JSON.parse(request.responseText);
        createList(json)
    };
    request.send();
}

function urlBuilder(ingredient) {
    var endpoint = 'http://api.yummly.com/v1/api/recipes?_app_id=e16f0751&_app_key=5bc51aa85925f65f6936444842369213&allowedIngredient=';
    var url = endpoint + ingredient;
    return url;
}

function createList(json) {
    var recipeContainer = document.querySelector('.js-recipeContainer');
    for (var i = 0; i < json.matches.length; i++) {

        var recipeName = document.createElement('h2');
        recipeName.innerText = json.matches[i].recipeName;
        recipeContainer.appendChild(recipeName);

        var image = document.createElement('img');
        image.src = json.matches[i].smallImageUrls;
        image.src = image.src.replace("s90", "l360");
        recipeContainer.appendChild(image);

        var ingredients = document.createElement('p');
        ingredients.innerText = json.matches[i].ingredients;
        recipeContainer.appendChild(ingredients);

        var rating = document.createElement('h4');
        rating.innerText = json.matches[i].rating;
        recipeContainer.appendChild(rating);
    }
}





