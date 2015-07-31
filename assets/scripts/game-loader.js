var container = document.getElementById('container');

function loadGame() {
    var js = document.createElement('script');
    js.setAttribute('src', 'assets/scripts/main.js');
    document.body.appendChild(js);
    document.body.removeChild(container);
}

container.addEventListener("click", loadGame);