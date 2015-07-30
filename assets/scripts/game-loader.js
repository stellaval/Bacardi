function loadJS(file) {

    var jsElm = document.createElement("script");
    jsElm.type = "application/javascript";
    jsElm.src = file;
    // finally insert the element to the body element in order to load the script
    document.body.appendChild(jsElm);
}

function loadAllGame(){

    loadJS('assets/scripts/main.js');
}

// create a one-time event
function onetime(node, type, callback) {

    node.addEventListener(type, function(e) {
        // remove event
        e.target.removeEventListener(e.type, arguments.callee);
        // call handler
        return callback(e);
    });
}

function handler(e) {
    loadAllGame();
    var parent = document.getElementsByTagName('body')[0];
    var child = document.getElementById('container');
    parent.removeChild(child);
}

// one-time event initializing
onetime(document.getElementById("container"), "click", handler);