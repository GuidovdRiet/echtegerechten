var pageCounter = 1;
var btn = document.getElementById('btn');
var animalContainer = document.getElementById('animal-info');

btn.addEventListener('click', function () {
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-' + pageCounter + '.json');
    ourRequest.onload = function () {
        var ourData = JSON.parse(ourRequest.responseText);
        renderHtml(ourData);
    };

    ourRequest.send();
    pageCounter++;
    if (pageCounter > 3) {
        btn.classList.add("hide-me");
    }
});

function renderHtml(data) {
    var htmlString = "";

    for (var i = 0; i < data.length; i++) {
        htmlString += "<p>" + data[i].name + "</p>";
    }

    animalContainer.insertAdjacentHTML('afterbegin', htmlString);
}




