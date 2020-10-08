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

//Sounds
let gameSounds = {
    topSound: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
    rightSound: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
    bottomSound: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
    leftSound: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
}

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
    choices: [topSwitch, rightSwitch, bottomSwitch, leftSwitch], 
}


/*----- app's state (variables) -----*/

let compColorArray = [];
let playerChoiceArray = [];
let compChoices = [];
let areSame = false;
let playerChoice;
let correct;
let playerTurn;
let compTurn;
let win;
let timer = 0
let score = 0


/*----- cached element references -----*/
//score
let playerScore = document.getElementById("count");
// let highScore = ;

//play swtiches
let playSwitch = document.getElementById("middle-switch");

//game messages
let messages = document.getElementById("message");
let text = document.getElementById("text");


/*----- event listeners -----*/
topSwitch.addEventListener('click', flashTopSwitch);
topSwitch.addEventListener('click', playerSelect);
rightSwitch.addEventListener('click', flashRightSwitch);
rightSwitch.addEventListener('click', playerSelect);
bottomSwitch.addEventListener('click', flashBottomSwitch);
bottomSwitch.addEventListener('click', playerSelect);
leftSwitch.addEventListener('click', flashLeftSwitch);
leftSwitch.addEventListener('click', playerSelect);
playSwitch.addEventListener('click', pressPlay);


/*----- functions -----*/

function reInit(){
    playSwitch.classList.remove('hidden');
    score = 0
    compChoices = []
    compColorArray = [];
    playerChoiceArray = [];
    playerScore.innerHTML = score;
    text.textContent = "WATCH"
}


function pressPlay(){
    //hide play
    playSwitch.classList.add('hidden');
    //start game
    setTimeout(gameStart, 400)
}


//Show switches
function flashTopSwitch(){
    gameSounds.topSound.play();
    topSwitch.classList.remove('hollow');
    setTimeout(hideTS, 400);
    function hideTS(){
        topSwitch.classList.add('hollow');
    }
}

function flashRightSwitch(){
    gameSounds.rightSound.play();
    rightSwitch.classList.remove('hollow');
    setTimeout(hideRS, 400);
    function hideRS(){
        rightSwitch.classList.add('hollow');
    }
}

function flashBottomSwitch(){
    gameSounds.bottomSound.play();
    bottomSwitch.classList.remove('hollow');
    setTimeout(hideBS, 400);
    function hideBS(){
        bottomSwitch.classList.add('hollow');
    }
}

function flashLeftSwitch(){
    gameSounds.leftSound.play();
    leftSwitch.classList.remove('hollow');
    setTimeout(hideLS, 400);
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

//display Loser message
function showLoserMessage() {
    // if(playSwitch.classList.contains('hidden') == false) return;
    text.textContent = "NUH-UH!";
    messages.classList.remove('game-message');
    setTimeout(flashMessage, 2000)
    function flashMessage() {
        messages.classList.add('game-message');
    }
}

//display Successful attempt message
function showSuccessMessage(){
    text.textContent = "NICE!";
    messages.classList.remove('game-message');
    setTimeout(flashMessage, 1000)
    function flashMessage() {
        messages.classList.add('game-message');
    }
}


//display computer's choice(s)
function showCompChoice() {
    currentTimer = timer
    compColorArray.forEach(function (el){
        currentTimer += 800;
        setTimeout(flashSwitch, currentTimer);
        function flashSwitch() {
            if(el.classList.contains('top-switch')){
                gameSounds.topSound.play();
            }if(el.classList.contains('right-switch')){
                gameSounds.rightSound.play();
            }if(el.classList.contains('bottom-switch')){
                gameSounds.bottomSound.play();
            }if(el.classList.contains('left-switch')){
                gameSounds.leftSound.play();
            }
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
    text.textContent = "WATCH"
    playerChoiceArray = [];
    compColorArray = [];
    compChoices.push(Math.floor(Math.random()*4))
    compChoices.forEach(function (num){
        compColorArray.push(gameBoard.choices[num]);
    })
    showWatchMessage();
    setTimeout(showCompChoice, 500);
    //need a way to let user know it's their turn to try after the sequence is shown
}

//player event handler
function playerSelect(evt) {
    if(evt.target.id === "main-container") return;
    if(!playSwitch.classList.contains("hidden")) return;
    if(evt.target.id === "top-switch"){
        playerChoice = 0;
    }if(evt.target.id === "right-switch"){
        playerChoice = 1;
    }if(evt.target.id === "bottom-switch"){
        playerChoice = 2;
    }if(evt.target.id === "left-switch"){
        playerChoice = 3;
    }
    // playerChoice = evt.target
    playerChoiceArray.push(playerChoice);
    console.log(playerChoiceArray);
    compareChoices();
    if(areSame == true && playerChoiceArray < compChoices){
        return
    }else if (areSame == true) {
        score++
        playerScore.innerHTML = score;
        showSuccessMessage()
        setTimeout(compSequence, 1100);
    }else{
        showLoserMessage()
        setTimeout(reInit, 2000);
        // console.log("na-uh")
    }
}

//comparing player input to computer sequence
function compareChoices() {
    for(let j = 0; j < playerChoiceArray.length; j++){
        if(playerChoiceArray[j] === compChoices[j]){
            areSame = true;
        }else{
            areSame = false;
            break
        }
    }
    return areSame
}

function gameStart() {
    compColorArray = [];
    playerChoiceArray = [];
    score = 0;
    compSequence();
}
