var socket = io('https://dorsia.fabiantjoeaon.com:8080', {secure: true});
var request = new XMLHttpRequest();

socket.on('connect', () => {console.log('connected to server')});
socket.on('getIngredient', function(data) {
    fetchFromAPI(data);
    fetchWordOnDevice(data);
});


// fetchFromAPI('appel');
// fetchWordOnDevice('appel');

var arr = [];
function fetchWordOnDevice(data) {

    arr.push(data);
    
    if(arr.length == 1) {
        setWord(arr[0], 'current_word');
    }

    if(arr.length == 2) {
        setWord(arr[1], 'previous_word');
    }

    if(arr.length == 3) {
        setWord(arr[0], 'previous_word');
        setWord(arr[2], 'current_word');
        arr.reverse();
        arr.pop();
        console.log('popped: ', arr);
    }

    // speak out word on screen
    var msg = new SpeechSynthesisUtterance();
    msg.text = data;
    msg.lang = 'nl';
    speechSynthesis.speak(msg);

}

function setWord(word, el) {
    var wordElement = document.getElementById(el);
    var wordHeader = document.createElement('h1');
    wordHeader.appendChild(document.createTextNode(word));
    wordElement.innerHTML = '';
    wordElement.appendChild(wordHeader);
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
    recipeContainer.innerHTML = '';
    for (var i = 0; i < json.matches.length; i++) {
        var recipeListItem = document.createElement('li');
        var recipeName = document.createElement('h2');
        recipeName.innerText = json.matches[i].recipeName;
        recipeListItem.appendChild(recipeName);

        var image = document.createElement('img');
        image.src = json.matches[i].smallImageUrls;
        image.src = image.src.replace("s90", "l360");
        recipeListItem.appendChild(image);

        var ingredients = document.createElement('p');
        ingredients.innerText = json.matches[i].ingredients;
        recipeListItem.appendChild(ingredients);

        var rating = document.createElement('h4');
        rating.innerText = json.matches[i].rating;
        recipeListItem.appendChild(rating);

        recipeContainer.appendChild(recipeListItem);
    }
}





