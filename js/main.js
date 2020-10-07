/*
- a board with 4 distinct sections represented by medium sized circles

- one player(user)

- computer comes up with a sequence

- first it picks a number between 1 and 4

    - computer starts with an empty array
    - number is randomly generated and pushed to the array -that array is put through a function that includes a loop that displays each number (circle), through the DOM at a time
    - rendered as one of the medium sized circles to the user - will display as a hollow circle that fills in. - four coloured circles with a border. the circles will be hidden and only the boarder will be visible to start.

- prompt player to try (through the DOM)

- user clicks on the circle(s)

    - user starts with an empty array
    - user array gets filled with the input from their clicks -game compares user array to computer array (how do i get it to compare in real time?)

- if user gets the sequence correct the game continues

    -game compares user array to computer array

- computer than builds on the sequence by adding another number and displaying that as lit up circles.

    - another random number between 1 and 4 is added to the array -the circles are revealed with a slight pause inbetween. (in a rhythm).
    - need to have a delay between showing the different filled in circles so I believe this is where setTimeout or setInterval method comes into play -this process continues until the player makes a wrong choice or completes 25 turns (maybe more, maybe less depending on how easy/hard it is to code).
    - need instant feedback if player gets a part of the array wrong
    - after completing 25 turns message is displayed that user has won -a counter is displayed on screen showing how many turns the player has made
        (we have done something similar in one of the labs i believe)

- would like to include a high score if possilbe (local storage on web page?) -if the player makes a wrong choice the game is over and player must restart
-maybe have an option to start trying the same code again from the begining up until the turn the user got wrong
    -this would require a setting toggle between the two game modes
*/

//cached game switches
let topSwitch = document.getElementById("top-switch");
let rightSwitch = document.getElementById("right-switch");
let bottomSwitch = document.getElementById("bottom-switch");
let leftSwitch = document.getElementById("left-switch");

/*----- constants -----*/
let gameBoard = {
    top: 0,
    right: 1,
    bottom: 2,
    left: 3,
    choices: [topSwitch, rightSwitch, bottomSwitch, leftSwitch] 
}


/*----- app's state (variables) -----*/

let compColorArray = [];
let playerChoiceArray = [];
let correct;
let playerTurn;
let compTurn;
let win;
let timer = 0
let score = 0


/*----- cached element references -----*/
//score
let playerScore = document.getElementById("current-score-box")
// let highScore = ;

//play swtiches
let playSwitch = document.getElementById("middle-switch");

//game messages
let messages = document.getElementById("message");
let text = document.getElementById("text");


/*----- event listeners -----*/

topSwitch.addEventListener('click', flashTopSwitch);
rightSwitch.addEventListener('click', flashRightSwitch);
bottomSwitch.addEventListener('click', flashBottomSwitch);
leftSwitch.addEventListener('click', flashLeftSwitch);
playSwitch.addEventListener('click', pressPlay);


/*----- functions -----*/

function pressPlay(){
    //hide play
    playSwitch.classList.add('hidden');
    showWatchMessage()
    //start game
    gameStart()
}


//Show switches
function flashTopSwitch(){
    topSwitch.classList.remove('hollow');
    setTimeout(hideTS, 500);
    function hideTS(){
        topSwitch.classList.add('hollow');
    }
}

function flashRightSwitch(){
    rightSwitch.classList.remove('hollow');
    setTimeout(hideRS, 500);
    function hideRS(){
        rightSwitch.classList.add('hollow');
    }
}

function flashBottomSwitch(){
    bottomSwitch.classList.remove('hollow');
    setTimeout(hideBS, 500);
    function hideBS(){
        bottomSwitch.classList.add('hollow');
    }
}

function flashLeftSwitch(){
    leftSwitch.classList.remove('hollow');
    setTimeout(hideLS, 500);
    function hideLS(){
        leftSwitch.classList.add('hollow');
    }
}
//display initial watch message
function showWatchMessage() {
    if(playSwitch.classList.contains('hidden') == false) return;
    messages.classList.remove('game-message');
    setTimeout(flashMessage, 1000)
    function flashMessage() {
        messages.classList.add('game-message');
    }
}

//display 'your turn'
function showPlayerMessage() {
    // if(playSwitch.classList.contains('hidden') == false) return;
    text.textContent = "YOUR TURN";
    messages.classList.remove('game-message');
    setTimeout(flashMessage, 1000)
    function flashMessage() {
        messages.classList.add('game-message');
    }
}

function clearBoard() {
    compColorArray = [];
    
}

//display computer's choice(s)
function showCompChoice() {
    currentTimer = timer
    compColorArray.forEach(function (el){
        currentTimer += 1000;
        setTimeout(flashSwitch, currentTimer);
        function flashSwitch() {
            console.log(el)
            el.classList.remove('hollow');
            setTimeout(hideSwitch, 500);
            function hideSwitch(){
                el.classList.add('hollow');
            }
        }
    })
}

//make computer sequence
function compSequence(){
    compColorArray.push(gameBoard.choices[(Math.floor(Math.random()*4))]);
    showCompChoice();
    //need a way to let user know it's there turn to try after the sequence is shown
}

function playerSelect(evt) {
    if(evt.target.id === "main-container") return
    playerChoice = evt.target.id
    playerChoiceArray.push(playerChoice);
    checkChoice()
}

function checkChoice() {
    if(compColorArray.length > playerChoiceArray.length){
        for(let i = 0; i < compColorArray.length; i++){
            for(let j = 0; j < playerChoiceArray.length; j++){
                if(compColorArray[i] != playerChoiceArray[j]){
                    console.log("wrong");
                    gameStart()
                }
            }
        }
    }else return;
    if (compColorArray == playerChoiceArray){
        console.log("move on")
    }else{
        console.log("NOPE")
    }
}

function gameStart() {
    compColorArray = [];
    playerChoiceArray = [];
    score = 0;
    compSequence();
}
