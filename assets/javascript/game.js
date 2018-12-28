var currentWord = null;
var numberOfGuessesRemaining = 0;
var displayWord = null;
var lettersAlreadyGuessed = "";

const wordsToGuess = ['monday', 'airplane', 'window', 'altruistic', 'sanguine', 'portfolio', 'astronaut', 'revolution', 'escarpment', 'defenestration'];

window.addEventListener("keyup", event => {
    playGame(event.key);
});

function playGame(guess) {
    if (currentWord == null) {
        setupGame();
    } else {
        takeAGuess(guess);
    }
}

function setupGame() {
    currentWord = selectWord();
    displayWord = updateDisplayWord(currentWord);
    numberOfGuessesRemaining = 10;
    console.log(currentWord);
}

function takeAGuess(guess) {
    if (wordContainsLetter(lettersAlreadyGuessed, guess)) {
        console.log("letter already guessed")
        return
    }

    if (wordContainsLetter(currentWord, guess)) {
        console.log("yay!");
    } else {
        lettersAlreadyGuessed += guess;
        console.log(lettersAlreadyGuessed);
    }

    console.log(guess);
}

function wordContainsLetter(word, letter) {
    if (word.includes(letter)) {
        return true;
    } else {
        return false;
    }

}

function selectWord() {
    let randomWord = (wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)]);
    
    return randomWord;
}

function updateDisplayWord(fromWord) {
    return "_____"
}

//Browser generates random word from pre-determined list (array) and generates an underscore for each letter.
    
//     document.getElementById("word").innerHTML = wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)];
    
//Player is given ten opportunities to guess letters

//Player selects a letter by pressing that letter key on keyboard

//Guessed letter is compared to letters in selected word

//If letter is in selected word, letter appears in corresponding place in word (replacing underscore), player can no longer guess that letter, and player continues guessing

//If letter is not in selected word, player loses one of their ten guesses, incorrectly guessed letter appears in "letters already guessed," and player can no longer guess that letter.

//If player correctly guesses all letters in selected word within the ten guess limit, alert "You win!"

//If player uses up all ten guesses without guessing word, alert "Sorry, you lose."

//When player acknowledges alert box, game resets, another word is randomly chosen from array, and play begins again.
