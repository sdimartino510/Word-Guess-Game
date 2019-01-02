//1. filter out anything not alphabetic
//2. convert keyup event to lower case
//3. convert lettersAlreadyGuessed to upper case
//4. insert spaces in lettersAlreadyGuessed
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

const wordsToGuess = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto', 'europa', 'titan', 'ganymedes', 'astronomy', 'stargazing', 'callisto', 'nebula', 'telescope', 'phobos', 'deimos', 'galileo', 'hubble', 'intergalactic', 'planetary', 'lunar', 'solar', 'quasar', 'pulsar', 'supernova', 'astrophysics', 'constellation', 'kepler', 'observatory', 'orion', 'cancer', 'aries', 'polaris', 'planetarium', 'planet', 'planetoid', 'satellite', 'umbra', 'terrestrial', 'triton', 'virgo'];

window.addEventListener("keyup", event => {
    playGame(event.key);
    console.log(event.key);
});

function playGame(guess) {
    if (currentWord == null) {
        resetGame();
    } else {
        takeAGuess(guess);
    }
}

function resetGame() {
    currentWord = selectWord();
    revealWord = updateRevealWord(currentWord);
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
        revealWord = updateRevealWord(currentWord);
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
        
        if (numberOfGuessesRemaining == 0) {
            alert('Sorry, you lose! The word was "' + currentWord + '"');
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

function updateRevealWord(fromWord) {
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
