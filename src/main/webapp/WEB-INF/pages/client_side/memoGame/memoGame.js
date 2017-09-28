var memoGame = {}, centerX = 540/2, centerY = 960/2, graphics, errors, levelNum, nextLevelText, levelData, gameTimer, gameTimerEvent, gameDurationInSeconds, progressBar, progressBarStroke, progressBarLoop, progressBarWidth, endGameProgressBarWidth, pauseState, pauseBtn, gameContainer, pauseContainer, resumeGameBtn, howToBtn, startAgainBtn, backHomeBtn, selectedPicName, timeWord, header, star, nextLevelContainer, starLines, timeIsOut, levelText, pauseText, levelTextMask, last10seconds, brick, bricksStructureArray = [], difficultyLevel, currentLevel, colNum, rowNum, coloredBricksNum, coloredBricksArray, userWasCorrect, brickSize, stageWidth, stageHeight, bricksStructureWidth, bricksStructureHeight, bricksStartPointX, bricksStartPointY, myInterval, bricksCounter, doTutorial, userWasWrong, tappedBricksArray = [], popup, popupBg, popupNoBtn, popupYesBtn, xBtn;

var lastLevel = 10;

var levelsArray=[{colNum:3,rowNum:4,coloredBricksNum:4},
                 {colNum:3,rowNum:4,coloredBricksNum:5},
                 {colNum:4,rowNum:4,coloredBricksNum:6},
                 {colNum:4,rowNum:4,coloredBricksNum:6},
                 {colNum:4,rowNum:5,coloredBricksNum:6},
                 {colNum:4,rowNum:5,coloredBricksNum:7},
                 {colNum:5,rowNum:5,coloredBricksNum:7},
                 {colNum:5,rowNum:5,coloredBricksNum:7},
                 {colNum:5,rowNum:6,coloredBricksNum:8},
                 {colNum:6,rowNum:6,coloredBricksNum:8}];


memoGame.memoGame = function () {};
memoGame.memoGame.prototype = {

    //****************************************PRELOAD*********************************************

    preload: function () {

        gameDurationInSeconds = 150;   //2.5 minutes
        userStartPoint = 1;

        if (userStartPoint == 1){
            difficultyLevel = 1;
        }else if (userStartPoint == 2){
            difficultyLevel = 3;
        }else if(userStartPoint == 3){
            difficultyLevel = 5;
        }

        pauseState = false;
        errors = 0;
        levelNum = 1;
        levelData = "";
        gameIsOn = true; 
        last10seconds = true
        userWasCorrect = 0;
        bricksCounter = 0;
        doTutorial = false;
        userWasWrong = false;
        whereIs = "game";
        counter = 0;
        timeIsOut = false;

        selectedPicName = chooseRandomPic(); //choosing a random picture for the end of game feedback

        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        game.load.image('timeWord', '../assets/allGames/sprites/timeWord.png');
        game.load.image('resumeGameBtn', '../assets/memoGame/sprites/resumeGameBtn.png');
        game.load.image('howToBtn', '../assets/memoGame/sprites/howToBtn.png');    
        game.load.image('startAgainBtn', '../assets/memoGame/sprites/startAgainBtn.png');
        game.load.image('backHomeBtn', '../assets/memoGame/sprites/backHomeBtn.png');    
        game.load.image('progressBarStroke', '../assets/allGames/sprites/timeBarStroke.png');  

        game.load.image('backHomePopup', '../assets/allGames/sprites/backHomePopup.png');    
        game.load.image('popupBtn', '../assets/allGames/sprites/popupBtn.png');
    },

    //****************************************CREATE*********************************************

    create: function () {

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.world.setBounds(0, 0, 540, 960);

        // adding pics to the stage
        var BgTop = game.add.sprite(0, 65, 'Bg');
        BgTop.frame = 0;
        var BgBottom = game.add.sprite(0, 512, 'Bg');
        BgBottom.frame = 1;
        header = game.add.sprite(0, 0, 'header');

        levelText = game.add.text(80, 13, '', {fontSize: '30px', fill:'#fff', font: 'Heebo'});
        levelText.text = 'שלב ' + lastLevel + ' / ' + levelNum;            

        pauseText = game.add.text(80, 70, '', {fontSize: '30px', fill:'#fff', font: 'Heebo'});
        pauseText.text = 'המשחק מושהה';

        levelTextMask = game.add.graphics(65, 0);
        levelTextMask.beginFill(0xffffff);
        levelTextMask.drawRect(0, 0, 250, 62);
        levelText.mask = levelTextMask;
        pauseText.mask = levelTextMask;

        pauseBtn = game.add.button(11, 11, 'pauseBtn', togglePause); 
        pauseBtn.frame = 0; //setting the specific frame of the spriteSheet
        pauseBtn.onInputDown.add(tint,pauseBtn);
        pauseBtn.onInputUp.add(unTint,pauseBtn);

        // Create a custom timer
        gameTimer = game.time.create();
        gameTimerEvent = gameTimer.add(Phaser.Timer.SECOND * gameDurationInSeconds, endTimer, this);
        gameTimer.start();

        timeWord = game.add.sprite(487.171, 72, 'timeWord');

        progressBar = game.add.graphics(11, 85);
        progressBar.beginFill(0x23b6b1, 1);
        progressBar.drawRoundedRect(0, 0, 456, 12, 7);
        progressBarWidth = progressBar.width;

        progressBarStroke = game.add.sprite(9, 84, 'progressBarStroke');

        // creates a loop event for the progress bar
        progressBarLoop = game.time.events.loop(100, shrinkProgressBar, this);

        gameContainer = game.add.group();
        gameContainer.add(progressBar);
        gameContainer.add(progressBarStroke);
        gameContainer.add(timeWord);

        createPauseScreen();

        currentLevel = levelsArray[difficultyLevel];
        colNum = currentLevel.colNum;
        rowNum = currentLevel.rowNum;
        coloredBricksNum = currentLevel.coloredBricksNum;

        popupBg = game.add.sprite(0, 65, 'backHomePopup');
        popupYesBtn = game.add.button(274.53 , 423, 'popupBtn', backHome);
        popupNoBtn = game.add.button(83.43, 423, 'popupBtn', backToPauseScreen);
        xBtn = game.add.button(404, 243, 'popupBtn', backToPauseScreen);
        xBtn.width = 65;
        xBtn.height = 65;
        popup = game.add.group(); 
        popup.add(popupBg);
        popup.add(popupNoBtn);
        popup.add(popupYesBtn);
        popup.add(xBtn);
        popup.alpha = 0;
        popupYesBtn.input.enabled = false;
        popupNoBtn.input.enabled = false;
        xBtn.input.enabled = false;

        createBoard(difficultyLevel);
    },

    //****************************************UPDATE*********************************************

    update: function () {

    }, 

    //**************************************** SHUTDOWN *********************************************

    shutdown: function () {

    }
};

//****************************************CREATE BOARD*********************************************
function createBoard(difficultyLevel){
    bricksStructureWidth = brickSize * colNum;
    bricksStructureHeight = brickSize * rowNum;
    bricksStartPointX = (stageWidth / 2) - (bricksStructureWidth / 2) + (brickSize / 2) - brickSize;
    bricksStartPointY = (stageHeight / 2) - (bricksStructureHeight / 2) + (brickSize / 2) - brickSize + 65;

    feedback = game.add.sprite(centerX, bricksStartPointY-15, 'feedback'); 
    feedback.anchor.set(0.5);
    feedback.scale.set(0);
    feedback.frame = 1;
    if(whereIs == "game"){
        gameContainer.add(feedback);
    }

    bricksStructureArray = new Array(colNum);
    for (var h = 0; h < colNum; h++) {
        bricksStructureArray[h] = new Array(rowNum);
    }

    for(var i = 1; i < colNum + 1; i++){

        for (var j = 1; j < rowNum + 1; j++){
            brick = game.add.sprite(bricksStartPointX+(brickSize*i), bricksStartPointY+(brickSize*j), 'brick');
            brick.frame = 1;   
            brick.anchor.set(0.5);

            brick.name = "brick" + i + j;
            brick.events.onInputDown.add(brickTap); 
            brick.scale.set(0);
            if(whereIs == "game"){
                gameContainer.add(brick);
            }
            bricksStructureArray[i-1][j-1] = brick;
        }
    }

    if((timeIsOut) || (pauseState)){
        console.log("return from createBoard");
        return;
    }

    replaceBoard("startLevel");
}


function turnBricksToColor(){
    setColoredBricksLocations();
    if((timeIsOut) || (pauseState)){
        console.log("return from turnBricksToColor");
        return;
    }
    for(var i = 0; i < coloredBricksArray.length; i++){
        turnToColor(coloredBricksArray[i], "false");
    }
}

function turnToColor(currentBrick, userTapped){
    wooshSound.play();

    if((timeIsOut) || (pauseState)){
        console.log("return from turnToColor");
        return;
    }
    var brickTurnTween1 = game.add.tween((currentBrick).scale).to({x:0}, 300, Phaser.Easing.Circular.Out, true);
    brickTurnTween1.onComplete.add(showColoredBrick, this);

    function showColoredBrick(){
        currentBrick.frame = 0;    
        var brickTurnTween2 = game.add.tween((currentBrick).scale).to({x:1}, 300, Phaser.Easing.Circular.Out, true, 0); 
        if(userTapped == "false"){
            if((timeIsOut) || (pauseState)){
                console.log("return from showColoredBrick");
                return;
            }
            brickTurnTween2.onComplete.add(turnBricksBack.bind(this, currentBrick), this);
        }
    }
}

function turnBricksBack(currentBrick){
    var brickAppearanceTime = 1000;
    if((timeIsOut) || (pauseState)){
        console.log("return from turnBricksBack");
        return;
    }
    var brickTurnBackTween1 = game.add.tween((currentBrick).scale).to({x:0}, 300, Phaser.Easing.Circular.Out, true, brickAppearanceTime);
    brickTurnBackTween1.onComplete.add(showWhiteBrick, this);

    function showWhiteBrick(){
        counter++;
        currentBrick.frame = 1;
        if((timeIsOut) || (pauseState)){
            console.log("return from showWhiteBrick");
            return;
        }
        var brickTurnBackTween2 = game.add.tween((currentBrick).scale).to({x:1}, 300, Phaser.Easing.Circular.Out, true);
        brickTurnBackTween2.onComplete.add(function(){

            enableBricksTap(); 
            if (counter == 2){
                doTutorial = true;
            }
        }, this);

    }
}

//****************************************SET COLORED BRICKS LOCATIONS*********************************************

function setColoredBricksLocations(){
    var randCol;
    var randRow; 
    coloredBricksArray = new Array(coloredBricksNum);

    for(var i = 0; i < coloredBricksNum; i++){

        randCol = getRandomNumber(0, colNum-1);
        randRow = getRandomNumber(0, rowNum-1);
        var currentColoredBrick = bricksStructureArray[randCol][randRow];

        for (var j = 0; j < coloredBricksArray.length; j++){ //checks if the brick that was chosen was chosen before
            if (currentColoredBrick == coloredBricksArray[j]){
                randCol = getRandomNumber(0, colNum-1);
                randRow = getRandomNumber(0, rowNum-1);
                currentColoredBrick = bricksStructureArray[randCol][randRow]; 
                j = -1;
            }
        }
        coloredBricksArray[i] = currentColoredBrick;
    }
}

//****************************************GER READY FOR A NEW STAGE*********************************************

function getReadyForNewStage(){
    bricksStructureArray = [];
    coloredBricksArray = [];
    tappedBricksArray = [];
    userWasCorrect = 0;
    currentLevel = levelsArray[difficultyLevel];
    colNum = currentLevel.colNum;
    rowNum = currentLevel.rowNum;
    coloredBricksNum = currentLevel.coloredBricksNum;
}

//****************************************TAP ON BRICK*********************************************

function brickTap(tappedBrick){
    var correctBrick = false;
    tappedBricksArray.push(tappedBrick);

    for (var i = 0; i < coloredBricksArray.length; i++){
        if(tappedBrick == coloredBricksArray[i]){
            correctBrick = true;
        }
    }

    if(correctBrick == true){
        turnToColor(tappedBrick, "true");
        userWasCorrect++;
        tappedBrick.inputEnabled = false;
    }else{ //user tapped a wrong brick
        errorFeedback(tappedBrick);
    }    

    if(userWasCorrect == coloredBricksNum){//end of level
        disableBricksTap();
        correctFeedback();
    }
}

//****************************************CORRECT FEEDBACK*********************************************

function correctFeedback(){
    correctSound.play();

    var showFeed = game.add.tween(feedback.scale).to({x:1, y:1}, 300, Phaser.Easing.Back.Out, true, 400, 0, false);
    showFeed.onComplete.add(hideFeedback, this);

    function hideFeedback(){
        var hideFeed = game.add.tween(feedback.scale).to({x:0, y:0}, 300, Phaser.Easing.Circular.InOut, true, 900, 0, false);
        if(levelNum == lastLevel){
            hideFeed.onComplete.add(function(){           
                addLevelData();
                finishGame();
            }, this);

        }else{
            if(whereIs == "game"){
                hideFeed.onComplete.add(nextLevel, this);
            }else{
                hideFeed.onComplete.add(tutorialNextLevel, this);
            }
        }
    }
}

function errorFeedback(tappedBrick){
    errorSound.play();
    errorSound.volume=0.3;

    tappedBrick.frame = 2;
    disableBricksTap();
    userWasWrong = true;
    var brickIsAlreadyColored = false;

    for(var i = 0; i < coloredBricksArray.length; i++){
        brickIsAlreadyColored = false;
        for(var j = 0; j < tappedBricksArray.length; j++){
            if(coloredBricksArray[i] == tappedBricksArray[j]){
                brickIsAlreadyColored = true;
            }
        }

        if(brickIsAlreadyColored == false){
            turnToColor(coloredBricksArray[i], "true");
        }
    }        
    errors++;
    if(whereIs == "game"){
        setTimeout(function(){replaceBoard("endLevel");}, 1000);   
    }else{

        doTutorial = true;
        setTimeout(function(){
            replaceBoard("endLevel");
        }, 2500);   

    }
}


function enableBricksTap(){
    for(var i = 0; i < bricksStructureArray.length; i++){
        for(var j = 0; j < bricksStructureArray[0].length; j++){
            bricksStructureArray[i][j].inputEnabled = true;
        }
    } 
}

function disableBricksTap(){
    for(var i = 0; i < bricksStructureArray.length; i++){
        for(var j = 0; j < bricksStructureArray[0].length; j++){
            bricksStructureArray[i][j].inputEnabled = false;
        }
    } 
}

//****************************************REPLACE BOARD*********************************************
function replaceBoard(state){
    if((timeIsOut) || (pauseState)){
        console.log("return from replaceBoard");
        return;
    }
    if( difficultyLevel < 7){
        setTimeout(function(){ myInterval = setInterval(bricksTweens, 80, state); }, 500);
    }else{
        setTimeout(function(){ myInterval = setInterval(bricksTweens, 50, state); }, 500);
    }
    disableBricksTap();
}

//***********************************BRICKS TWEENS FOR APPEARING / HIDING*************************

function bricksTweens(state){
    var bricksNum = colNum * rowNum;
    var currBrick;
    var goodBrick = false;
    var col;
    var row;

    if(bricksCounter == bricksNum){ //if all the bricks are done
        clearInterval(myInterval); 
        bricksCounter = 0;
        if((timeIsOut) || (pauseState)){
            console.log("return from bricksTweens");
            return;
        }
        if(state == "startLevel"){ //if the bricks are appearing
            setTimeout(function(){ turnBricksToColor(); }, 1000);
        }else{ //if the bricks are hiding
            getReadyForNewStage();
            createBoard(difficultyLevel);
        }
    }else{
        while(goodBrick == false){ //do while the brick that was randomized was chosen before
            //randomize a brick
            col = getRandomNumber(0, colNum-1);
            row = getRandomNumber(0, rowNum-1);
            currBrick = bricksStructureArray[col][row];

            if (state == "startLevel"){ //if the bricks are appearing
                if(currBrick.scale.x == 0){ //if the brick that was randomized is not showing yet - show it
                    goodBrick = true;
                    game.add.tween((currBrick).scale).to({x:1, y:1}, 300, Phaser.Easing.Circular.Out, true, 0);
                    bricksCounter++;
                }
            }else{ //if the bricks are hiding
                if(currBrick.scale.x == 1){ //if the brick that was randomized is not hidden yet - hide it
                    goodBrick = true;
                    var brickTween = game.add.tween((currBrick).scale).to({x:0, y:0}, 300, Phaser.Easing.Circular.Out, true, 0);
                    brickTween.onComplete.add(function(){currBrick.destroy();}, this);
                    bricksCounter++;
                }
            }    
        }
    }
}


//****************************************NEXT LEVEL*********************************************

function nextLevel(){
    difficultyLevel++;
    replaceBoard("endLevel");
    addLevelData();

    levelNum++;
    levelUpSound.play();
    star = game.add.sprite(84, 28, 'star');
    star.anchor.set(0.5);
    star.angle = -15;
    star.scale.set(0.28);

    nextLevelText = game.add.text(80, 13, '', {fontSize: '30px', font: 'Heebo', fill: '#fff'});
    nextLevelText.text = levelNum;

    nextLevelContainer = game.add.group();
    nextLevelContainer.add(star);
    nextLevelContainer.add(nextLevelText);
    nextLevelContainer.y = -80;

    gameContainer.add(nextLevelContainer);

    var starTweenA = game.add.tween(nextLevelContainer).to({y:0}, 600, Phaser.Easing.Bounce.Out, true, 0, 0, false);
    starTweenA.onComplete.add(starFunction2, this);

    function starFunction2(){
        levelText.text = 'שלב ' + lastLevel + ' / ' + levelNum;
        var starTweenB = game.add.tween(star).to({y:-80}, 150, Phaser.Easing.Linear.Out, true, 600, 0, false);
        starTweenB.onComplete.add(function(){nextLevelText.alpha = 0;}, this);
    }
}

//****************************************ADD LEVEL DATA*********************************************

function addLevelData(){
    var totalCardsPerLevel = parseInt(errors) + 1;

    // get current data 
    levelData = '{"countPerLevel":' + totalCardsPerLevel + ',"errorsPerLevel":' + errors + '},';

    // add the data to the full JSON string
    sessionData += levelData;
    errors = 0;
}

//****************************************TIME FUNCTIONS*********************************************

function endTimer() {
    // Stop the timer when the delayed event triggers
    gameTimer.stop();
    addLevelData();
    timeOut();
}

//happens every 100 ms (loop interval)
function shrinkProgressBar() {
    if (gameTimer.running) {
        progressBar.width -=  progressBarWidth/(gameDurationInSeconds*10); 
    }
    else {
        game.time.events.remove(progressBarLoop);
    }   

    if ((progressBar.width <= ((progressBarWidth / gameDurationInSeconds) * 10)) && (last10seconds == true)){
        last10seconds = false;
        game.add.tween(progressBar).to({alpha:0.4}, 400, Phaser.Easing.Linear.In, true, 0, 20, true);
    }
}

//****************************************PAUSE FUNCTIONS*********************************************

function togglePause() {
    btnSound.play();
    game.physics.arcade.isPaused = (game.physics.arcade.isPaused) ? false : true;
    pauseState = !pauseState;
    if(pauseState){ //enter pause state 
        pauseBtn.inputEnabled = false;
        game.add.tween(pauseContainer).to({x:0}, 500, Phaser.Easing.Circular.Out, true, 0, 0, false);
        var gameContainerTween = game.add.tween(gameContainer).to({x:-540}, 500, Phaser.Easing.Circular.Out, true, 0, 0, false);

        gameContainerTween.onComplete.add(function(){
            removeBricks(); 
        }, this);

        gameTimer.pause();
        game.time.events.pause();
        pauseBtn.frame = 1;
        game.add.tween(pauseText).to({y:13}, 700, Phaser.Easing.Exponential.Out, true, 0, 0, false); 
        game.add.tween(levelText).to({y:-44}, 700, Phaser.Easing.Exponential.Out, true, 0, 0, false); 


    }else{ //exit pause state
        game.add.tween(pauseContainer).to( {x: 540}, 500, Phaser.Easing.Circular.Out, true, 0, 0, false);
        game.add.tween(gameContainer).to( { x: 0 }, 500, Phaser.Easing.Circular.Out, true, 0, 0, false);            
        gameTimer.resume();
        game.time.events.resume();
        pauseBtn.frame = 0;

        game.add.tween(pauseText).to({y:70}, 700, Phaser.Easing.Exponential.Out, true, 0, 0, false); 
        game.add.tween(levelText).to({y:13}, 700, Phaser.Easing.Exponential.Out, true, 0, 0, false);

        disableBricksTap();           
        getReadyForNewStage();
        createBoard(difficultyLevel);
    }

    function removeBricks(){
        for(var i = 0; i < bricksStructureArray.length; i++){
            for(var j = 0; j < bricksStructureArray[0].length; j++){
                bricksStructureArray[i][j].scale.set(0);
            }
        }
        pauseBtn.inputEnabled = true;
    }
}

function createPauseScreen(){

    resumeGameBtn = game.add.button(86, 230, 'resumeGameBtn', togglePause);
    startAgainBtn = game.add.button(86, 330, 'startAgainBtn', startAgain)
    howToBtn = game.add.button(86, 430, 'howToBtn', startTutorial);
    backHomeBtn = game.add.button(86, 530, 'backHomeBtn' , areYouSure);

    pauseContainer = game.add.group();       
    pauseContainer.x = 540;
    pauseContainer.add(resumeGameBtn);
    pauseContainer.add(howToBtn);
    pauseContainer.add(startAgainBtn);
    pauseContainer.add(backHomeBtn);
}

//**************************************** START AGAIN *************************************

function startAgain(){
    btnSound.play();
    game.physics.arcade.isPaused = (game.physics.arcade.isPaused) ? false : true;
    pauseState = !pauseState;
    gameTimer.resume();
    game.time.events.resume();
    pauseBtn.frame = 0;
    cameFromGameToPlayAgain = true;
    game.state.start('preloader');
}

function backHome(){
    btnSound.play();
    gameIsOn = false;
    window.location ="../../client_side/homePage.html";
}

function backToPauseScreen(){
    popup.alpha = 0;
}

function areYouSure(){
    popupYesBtn.input.enabled = true;
    popupNoBtn.input.enabled = true;
    xBtn.input.enabled = true;
    popup.alpha = 1;
}

function startTutorial(){
    btnSound.play();
    gameTimer.resume();
    game.time.events.resume();
    gameIsOn = false;
    cameFromGameToTutorial = true;
    game.state.start('memoGameTutorial');
}

function Finish(state) {
    if (state == "finishGame") {
        levelData = '{"countPerLevel":' + 0 + ', "errorsPerLevel":' + 0 + '},';
        sessionData += levelData;
    }

    sessionData = sessionData.substring(0, sessionData.length - 1);
    sessionData += ']}}';

    $.ajax({
        url: "http://project-most.herokuapp.com/game/addresult",
        type: "POST",
        data: sessionData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            console.log("Data: " + data + "\nStatus: " + status);
        }
    });

    game.world.add(progressBar);
    game.world.add(progressBarStroke);
    game.world.add(timeWord);

    pauseText.alpha = 0;
    game.add.tween(levelText).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.In, true, 500, 0, false);
    game.add.tween(pauseBtn).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.In, true, 500, 0, false);
    var containerTween = game.add.tween(gameContainer).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.In, true, 500, 0, false);
    containerTween.onComplete.add(changeState, this);

    if (state == "timeOut") {

    } else {
        gameIsOn = false;
        endGameProgressBarWidth = progressBar.width;
    }
    function changeState() {
        game.state.start('memoGameEndGame');
    }
}

//************************************************ TIME OUT SCREEN **************************************************
function timeOut() {
    timeIsOut = true;
    clearInterval(myInterval);
    Finish("timeOut");
}

//****************************************FINISH GAME*********************************************

function finishGame(){   
    Finish("finishGame");  
}

//****************************************GET RANDOM NUMBER*********************************************

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function tint(){
    this.tint = 0xbbbbbb;
}

function unTint(){
    this.tint = 0xFFFFFF;
}

//****************************************CHOOSE RANDOM PICTURE*****************************************

function chooseRandomPic() {
    if(picsArray.length > 0){
        var picNum = getRandomNumber(0, picsArray.length-1);
        return picsArray[picNum];
    }else{
        var picName = "default.jpg"
        return picName;
    }
}