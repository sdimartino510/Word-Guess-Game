//5. update DOM
//6. test test test
//7. profit

//show word if run out of guesses? done with "alert", can we also plug it into the DOM?

var currentWord = null;
var numberOfGuessesRemaining = 0;
var displayWord = null;
var lettersAlreadyGuessed = "";
var successfulGuesses = "";
var numberOfWins = 0;
var numberOfLosses = 0;
var alreadyGuessedDisplayString = "";

const wordsToGuess = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto', 'europa', 'titan', 'ganymedes', 'astronomy', 'stargazing', 'callisto', 'nebula', 'telescope', 'phobos', 'deimos', 'galileo', 'hubble', 'intergalactic', 'planetary', 'lunar', 'solar', 'quasar', 'pulsar', 'supernova', 'astrophysics', 'constellation', 'kepler', 'observatory', 'orion', 'cancer', 'aries', 'polaris', 'planetarium', 'planet', 'planetoid', 'satellite', 'umbra', 'terrestrial', 'triton', 'virgo', 'eclipse', 'asteroid', 'comet', 'meteor', 'meteorite'];

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

    //updateDOM();
}

function resetGame() {
    currentWord = selectWord();
    revealWord = updateRevealWord();
    numberOfGuessesRemaining = 10;
    lettersAlreadyGuessed = "";
    successfulGuesses = "";
    console.log("initial word: " + currentWord);
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
        revealWord = updateRevealWord();
        console.log("updated reveal word: " + revealWord);
        
        if (isGameOver()) {
            numberOfWins++;
            alert("YOU WIN!");
            console.log("wins: " + numberOfWins);
            resetGame();
        } 
    } else {
        lettersAlreadyGuessed += guess;
        console.log("bad guesses: " + lettersAlreadyGuessed);
        numberOfGuessesRemaining--;
        console.log("remaining guesses: " + numberOfGuessesRemaining);
        alreadyGuessedDisplayString = updateAlreadyGuessedString();
        console.log("already guessed display string: " + alreadyGuessedDisplayString);
        
        if (numberOfGuessesRemaining == 0) {
            numberOfLosses++;
            alert('Sorry, you lose! The word was "' + currentWord + '"');
            console.log("number of losses: " + numberOfLosses);
            resetGame();
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

function updateRevealWord() {
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

function updateAlreadyGuessedString() {
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

// function updateDOM() {
//     document.getElementById("wins").innerHTML("Wins: " + numberOfWins);
// }

//Browser generates random word from pre-determined list (array) and generates an underscore for each letter.
    
//Player is given ten opportunities to guess letters

//Player selects a letter by pressing that letter key on keyboard

//Guessed letter is compared to letters in selected word

//If letter is in selected word, letter appears in corresponding place in word (replacing underscore), player can no longer guess that letter, and player continues guessing

//If letter is not in selected word, player loses one of their ten guesses, incorrectly guessed letter appears in "letters already guessed," and player can no longer guess that letter.

//If player correctly guesses all letters in selected word within the ten guess limit, alert "You win!"

//If player uses up all ten guesses without guessing word, alert "Sorry, you lose."

//When player acknowledges alert box, game resets, another word is randomly chosen from array, and play begins again.
