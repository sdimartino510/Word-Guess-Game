//show word if run out of guesses? done with "alert", can we also plug it into the DOM?

var currentWord = null;
var numberOfGuessesRemaining = 0;
var displayWorupdateD = null;
var lettersAlreadyGuessed = "";
var successfulGuesses = "";
var numberOfWins = 0;
var numberOfLosses = 0;
var alreadyGuessedDisplayString = "";
var gameEnded = false;
var userWon = false;

const wordsToGuess = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto', 'europa', 'titan', 'ganymedes', 'astronomy', 'stargazing', 'callisto', 'nebula', 'telescope', 'phobos', 'deimos', 'galileo', 'hubble', 'intergalactic', 'planetary', 'lunar', 'solar', 'quasar', 'pulsar', 'supernova', 'astrophysics', 'constellation', 'kepler', 'observatory', 'orion', 'cancer', 'aries', 'polaris', 'planetarium', 'planet', 'planetoid', 'satellite', 'umbra', 'terrestrial', 'triton', 'virgo', 'eclipse', 'asteroid', 'comet', 'meteor', 'meteorite', 'orbit'];

window.addEventListener("keypress", event => {
    if (isValidInput(event.key)) {
        var letter = event.key.toLowerCase();

        playGame(letter);
    }
});

function isValidInput(inputtxt)  {
    var letters = /^[A-Za-z]+$/;
    
    if (inputtxt.match(letters) && inputtxt.length == 1) {
        return true;
    } else {
        return false;
    }
}

function playGame(guess) {
    if (currentWord == null) {
        resetGame();
    } else {
        takeAGuess(guess);
    }

    updateUserInterface();

    if (gameEnded) {
        if (userWon) {
            setTimeout(function() {
                alert('YOU WON!');
                resetGame();
                updateUserInterface();
            }, 1);
        } else {
            setTimeout(function() {
                alert("Sorry, you lost. The word was '" + currentWord + "'.");
                resetGame();
                updateUserInterface();
            }, 1);
        }
    }
}

function resetGame() {
    currentWord = selectWord();
    successfulGuesses = "";
    revealWord = produceRevealWord();
    numberOfGuessesRemaining = 10;
    lettersAlreadyGuessed = "";
    alreadyGuessedDisplayString = "";
    gameEnded = false;
    userWon = false;
    console.log("current word: " + currentWord);
    
}

function takeAGuess(guess) {
    if (wordContainsLetter(lettersAlreadyGuessed, guess)) {
        console.log("letter already guessed")
        return
    }

    if (wordContainsLetter(successfulGuesses, guess)) {
        console.log("letter already guessed")
        return
    }
    
    if (wordContainsLetter(currentWord, guess)) {
        successfulGuesses += guess;
        console.log("successful guesses: " + successfulGuesses);
        revealWord = produceRevealWord();
        console.log("updated reveal word: " + revealWord);
        
        if (isGameOver()) {
            numberOfWins++;
            gameEnded = true;
            userWon = true;
            console.log("wins: " + numberOfWins);
        } 
    } else {
        lettersAlreadyGuessed += guess;
        console.log("bad guesses: " + lettersAlreadyGuessed);
        numberOfGuessesRemaining--;
        console.log("remaining guesses: " + numberOfGuessesRemaining);
        alreadyGuessedDisplayString = produceAlreadyGuessedString();
        console.log("already guessed display string: " + alreadyGuessedDisplayString);
        
        if (numberOfGuessesRemaining == 0) {
            numberOfLosses++;
            gameEnded = true;
            userWon = false;
            console.log("number of losses: " + numberOfLosses);
        }
    }
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

function produceRevealWord() {
    var newRevealWord = "";
    for (var i = 0; i < currentWord.length; i++) {
        var letter = currentWord.charAt(i);

        if (i > 0) {
            newRevealWord += " ";
        }

        if (wordContainsLetter(successfulGuesses, letter)) {
            newRevealWord += letter;
        } else {
            newRevealWord += "_";
        }
    }

    return newRevealWord;
}

function produceAlreadyGuessedString() {
    var newString = "";

    for (var i = 0; i < lettersAlreadyGuessed.length; i++) {
        if (i > 0) {
            newString += " ";
        }

        newString += lettersAlreadyGuessed.charAt(i).toUpperCase();
    }
    return newString;
}

function isGameOver() {
    var gameIsOver = true
    
    for (var i = 0; i < currentWord.length; i++) {
        var letter = currentWord.charAt(i);

        if (wordContainsLetter(successfulGuesses, letter)) {
            continue;
        } else {
            gameIsOver = false;
            break;
        }
    }

    return gameIsOver;
}

function updateUserInterface() {
    updateWins();
    updateLosses();
    updateRevealWord();
    updateNumberOfGuessesRemaining();
    updateLettersAlreadyGuessed();
}

function updateWins() {
    document.getElementById("wins").innerHTML=("Wins: " + numberOfWins);
}

function updateLosses() {
    document.getElementById("losses").innerHTML=("Losses: " + numberOfLosses);
}

function updateRevealWord() {
    document.getElementById("current-word").innerHTML=(revealWord);
}

function updateLettersAlreadyGuessed() {
    document.getElementById("already-guessed").innerHTML=(alreadyGuessedDisplayString);
}

function updateNumberOfGuessesRemaining() {
    document.getElementById("guesses-remaining").innerHTML=("Number of guesses remaining: " + numberOfGuessesRemaining);
}