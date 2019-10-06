var inquirer = require("inquirer");

var Word = require("./Word.js");


var guesses = 10;
var points = 0;

var wordsToGuess = ["Don't Speak", "I'm Just a Girl", "It's My Life", "Spiderwebs", "Hey Baby", "Tragic Kingdom", "Ex-Girlfriend", "Simple Kind Of Life", "New", "Trapped In A Box", "Rock Steady"];
var randomWord;
var chosenWord;

function startGame() {

    console.log("It's time to guess the 'No Doubt' songs!");
}

function chooseRandomWord() {

    randomWord = wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)]

    chosenWord = new Word(randomWord);
}

function guessWord() {

    if (guesses > 0 && points < 5) {

        console.log(chosenWord.display());
    

        inquirer.prompt([
            {
                name: "txt",
                message: "Guess a letter!",
                validate: function validate(strValue) {
                  var objRegExp  = /^[a-z\u00C0-\u00ff]+$/;
                  return objRegExp.test(strValue);
                }
                

            }

        ]).then(function (guessedLetter) {

            var guess = guessedLetter.txt;

            chosenWord.checkGuess(guess);

            if (randomWord.toLowerCase().indexOf(guess.toLowerCase()) === -1) {
                guesses--;
                console.log("INCORRECT! " + guesses + " guesses remaining")
            } 
            else {
                if (points < 5) {
                console.log("CORRECT!")
                }
            }

            if (randomWord === chosenWord.display()) {
                console.log(chosenWord.display());
                guesses = 10;
                points++;

                if (points < 5) {
                    console.log("CORRECT! Next song!");
                    chooseRandomWord();
                }

                else {
                    winGame();
                }
            }

            if (guesses === 0) {
                loseGame();
            }

            guessWord();

        });
    }

}

function loseGame() {
    console.log("GAME OVER!");
    inquirer.prompt([
        {
            name: "confirm",
            type: "confirm",
            message: "Play again?",
            default: true
        }
    ])
        .then(function (inquirerResponse) {
            if (inquirerResponse.confirm) {
                guesses = 10;
                points = 0;
                chooseRandomWord();
                guessWord();
            }
            else {
                console.log("lolzzzz");
                process.exit();
            }
        })
}

function winGame() {

    

    inquirer.prompt([
        {
            name: "confirm",
            type: "confirm",
            message: "Play again?",
            default: true
        }
    ])
        .then(function (inquirerResponse) {
            if (inquirerResponse.confirm) {
                guesses = 10;
                points = 0;
                chooseRandomWord();
                guessWord();
            }
            else {
                console.log("K fine.. It's YOUR life.")
                process.exit();
            }
        })

}


startGame();
chooseRandomWord();
guessWord();