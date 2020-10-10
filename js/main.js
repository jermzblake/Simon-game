//Sounds
let gameSounds = {
    topSound: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
    rightSound: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
    bottomSound: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
    leftSound: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
    successSound: new Audio("sounds/109662__grunz__success.wav"),
    failureSound: new Audio("sounds/trumpet__fail.mp3"),
    heatingUp: new Audio("sounds/heating-3.mp3"),
    onFire: new Audio("sounds/on-fire.mp3"),
    boomShakalaka: new Audio("sounds/boomshakalaka.mp3"),
    wooo: new Audio("sounds/woooooo.mp3")
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
let win;
let timer = 0
let score = 0
let compTurn; //if not using get rid of this


/*----- cached element references -----*/
//score
let playerScore = document.getElementById("count");
let highScore = document.getElementById("high-score");

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
    // if(playSwitch.classList.contains('hidden') == false) return;
    gameSounds.topSound.play();
    topSwitch.classList.remove('hollow');
    setTimeout(hideTS, 400);
    function hideTS(){
        topSwitch.classList.add('hollow');
    }
}

function flashRightSwitch(){
    // if(playSwitch.classList.contains('hidden') == false) return;
    gameSounds.rightSound.play();
    rightSwitch.classList.remove('hollow');
    setTimeout(hideRS, 400);
    function hideRS(){
        rightSwitch.classList.add('hollow');
    }
}

function flashBottomSwitch(){
    // if(playSwitch.classList.contains('hidden') == false) return;
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
    messages.classList.remove('game-message');
    setTimeout(flashMessage, 1000)
    function flashMessage() {
        messages.classList.add('game-message');
    }
}

//display Loser message
function showLoserMessage() {
    text.textContent = `NUH- UH!`;
    gameSounds.failureSound.play();
    messages.classList.remove('game-message');
    setTimeout(flashMessage, 2000)
    function flashMessage() {
        messages.classList.add('game-message');
    }
}

//display Successful attempt message
function showSuccessMessage(){
    text.textContent = "GOOD JOB!";
    messages.classList.remove('game-message');
    setTimeout(flashMessage, 1000)
    function flashMessage() {
        messages.classList.add('game-message');
    }
}

//successful attempt sounds
function playSuccessSound(){
    if(score == 3){
        gameSounds.heatingUp.play(); return
    }if(score == 5){
        gameSounds.onFire.play(); return
    }if(score == 10){
        gameSounds.boomShakalaka.play(); return
    }if(score == 15){
        gameSounds.wooo.play(); return
    }else{
        gameSounds.successSound.play()
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
            setTimeout(hideSwitch, 400);
            function hideSwitch(){
                el.classList.add('hollow');
            }
        }
    })

}

//make computer sequence
function generateCompSequence(){
    text.textContent = "WATCH"
    playerChoiceArray = [];
    compColorArray = [];
    compChoices.push(Math.floor(Math.random()*4))
    compChoices.forEach(function (num){
        compColorArray.push(gameBoard.choices[num]);
    })
    showWatchMessage();
    setTimeout(showCompChoice, 500);
}

//player event handler
function playerSelect(evt) {
    if(evt.target.id === "main-container") return;
    if(!playSwitch.classList.contains("hidden")) return;
    if(messages.classList.contains('hidden')) return;
    if(evt.target.id === "top-switch"){
        playerChoice = 0;
    }if(evt.target.id === "right-switch"){
        playerChoice = 1;
    }if(evt.target.id === "bottom-switch"){
        playerChoice = 2;
    }if(evt.target.id === "left-switch"){
        playerChoice = 3;
    }
    playerChoiceArray.push(playerChoice);
    compareChoices();
    if(areSame == true && playerChoiceArray < compChoices){
        return
    }else if (areSame == true) {
        score++
        localStorage.setItem('high-score', score);
        playSuccessSound()
        playerScore.innerHTML = score;
        highScoreCounter = Number(localStorage.getItem('high-score'));
        showSuccessMessage()
        setTimeout(generateCompSequence, 1100);
    }else{
        showLoserMessage()
        setTimeout(reInit, 2000);
        highScore.textContent = highScoreCounter
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
    generateCompSequence();
}
