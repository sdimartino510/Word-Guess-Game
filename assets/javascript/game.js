function getItem() {
    //Possible words to guess
    var words = ['monday', 'airplane', 'window', 'altruistic', 'sanguine', 'portfolio', 'astronaut', 'revolution', 'escarpment', 'defenestration'];
    document.getElementById("word").innerHTML = words[Math.floor(Math.random() * words.length)];