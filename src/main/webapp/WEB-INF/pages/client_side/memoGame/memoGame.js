var memoGame = {}, gameID = "4", centerX = 540/2, centerY = 960/2, graphics, ballBgFront, errors, levelNum, nextLevelText, userID, time, 
    sessionData, levelData, lastLevel = 3, currentdate, gameTimer, gameTimerEvent, picsJSONstructure, gameDurationInSeconds, progressBar, progressBarStroke, progressBarLoop, progressBarWidth, endGameProgressBarWidth, pauseState, pauseBtn, gameContainer, pauseContainer, resumeGameBtn, howToBtn, startAgainBtn, backHomeBtn, selectedPicName, timeWord, header, star, nextLevelContainer, starLines, timeIsOut = false, levelText, pauseText, levelTextMask, last10seconds, brick, bricksStructureArray = [], difficultyLevel, currentLevel, colNum, rowNum, coloredBricksNum, coloredBricksArray, userWasCorrect, brickSize, stageWidth, stageHeight, bricksStructureWidth, bricksStructureHeight, bricksStartPointX, bricksStartPointY, myInterval, bricksCounter, lastGameLastLevel = 4, doTutorial, userWasWrong, tappedBricksArray = [];


//var picsArray= ["pic1.jpg", "pic2.jpg", "pic3.jpg"];
var picsArray= [];

var levelsArray = [
    {
        colNum: 2,
        rowNum: 2,
        coloredBricksNum: 2
    },
    {
        colNum: 3,
        rowNum: 3,
        coloredBricksNum: 3
    },
    {
        colNum: 3,
        rowNum: 3,
        coloredBricksNum: 4
    },
    {
        colNum: 3,
        rowNum: 4,
        coloredBricksNum: 4
    },
    {
        colNum: 4,
        rowNum: 4,
        coloredBricksNum: 4
    },
    {
        colNum: 4,
        rowNum: 4,
        coloredBricksNum: 5
    },
    {
        colNum: 4,
        rowNum: 5,
        coloredBricksNum: 5
    },
    {
        colNum: 4,
        rowNum: 5,
        coloredBricksNum: 6
    },
    {
        colNum: 5,
        rowNum: 5,
        coloredBricksNum: 6
    },
    {
        colNum: 5,
        rowNum: 6,
        coloredBricksNum: 6
    },
    {
        colNum: 5,
        rowNum: 6,
        coloredBricksNum: 7
    },
    {
        colNum: 6,
        rowNum: 6,
        coloredBricksNum: 7
    },
    {
        colNum: 6,
        rowNum: 6,
        coloredBricksNum: 8
    },
    {
        colNum: 6,
        rowNum: 7,
        coloredBricksNum: 8
    },
    {
        colNum: 6,
        rowNum: 7,
        coloredBricksNum: 9
    },
    {
        colNum: 7,
        rowNum: 7,
        coloredBricksNum: 9
    }
];


WebFontConfig = {

    //  load Google Font
    google: {
        families: ['Heebo']
    }
};

memoGame.memoGame = function () {};
memoGame.memoGame.prototype = {

    //****************************************PRELOAD*********************************************

    preload: function () {

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
        sessionData = "";
        levelData = "";
        gameIsOn = true; 
        currentdate = new Date();
        picsJSONstructure = "";
        gameDurationInSeconds = 100;   
        last10seconds = true
        //   difficultyLevel = 1;
        userWasCorrect = 0;
        bricksCounter = 0;
        doTutorial = false;
        userWasWrong = false;
        whereIs = "game";
        counter = 0;

        selectedPicName = chooseRandomPic(); //choosing a random picture for the end of game feedback

        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        game.load.image('timeWord', '../assets/allGames/sprites/timeWord.png');
        game.load.image('resumeGameBtn', '../assets/memoGame/sprites/resumeGameBtn.png');
        game.load.image('howToBtn', '../assets/memoGame/sprites/howToBtn.png');    
        game.load.image('startAgainBtn', '../assets/memoGame/sprites/startAgainBtn.png');
        game.load.image('backHomeBtn', '../assets/memoGame/sprites/backHomeBtn.png');    
        game.load.image('progressBarStroke', '../assets/allGames/sprites/timeBarStroke.png');  



        //    game.load.audio('btnSound', '../assets/ballGame/sounds/pressBtn.wav'); 
        //    game.load.audio('hitWallsSound', '../assets/ballGame/sounds/hitWallsSound.mp3'); 
        //    game.load.audio('hitGateSound', '../assets/ballGame/sounds/hitGateSound.mp3'); 

        //---------------------------------------------------------------------------------------------


        fromServer();

    },

    //****************************************CREATE*********************************************

    create: function () {

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.world.setBounds(0, 0, 540, 960);


        //            btnSound = game.add.audio('btnSound');
        //            hitGateSound = game.add.audio('hitGateSound');
        //            hitWallsSound = game.add.audio('hitWallsSound'); 
        //            hitWallsSound.volume = 0.1;


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

//        difficultyLevel = 1;
        currentLevel = levelsArray[difficultyLevel];
        colNum = currentLevel.colNum;
        rowNum = currentLevel.rowNum;
        coloredBricksNum = currentLevel.coloredBricksNum;

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

    //    brickSize = 67;
    //    stageWidth = 540;
    //    stageHeight = 895;
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
            //            brick.inputEnabled = true;
            brick.events.onInputDown.add(brickTap); 
            brick.scale.set(0);
            if(whereIs == "game"){
                gameContainer.add(brick);
            }
            bricksStructureArray[i-1][j-1] = brick;
        }
    }

    replaceBoard("startLevel");
}


function turnBricksToColor(){
    //    console.log(" =" + );
    setColoredBricksLocations();
    for(var i = 0; i < coloredBricksArray.length; i++){
        turnToColor(coloredBricksArray[i], "false");
    }
}

function turnToColor(currentBrick, userTapped){
    var brickTurnTween1 = game.add.tween((currentBrick).scale).to({x:0}, 300, Phaser.Easing.Circular.Out, true);
    brickTurnTween1.onComplete.add(showColoredBrick, this);

    function showColoredBrick(){
        currentBrick.frame = 0;    
        var brickTurnTween2 = game.add.tween((currentBrick).scale).to({x:1}, 300, Phaser.Easing.Circular.Out, true, 0); 
        if(userTapped == "false"){
            brickTurnTween2.onComplete.add(turnBricksBack.bind(this, currentBrick), this);
        }
    }
}

function turnBricksBack(currentBrick){
    var brickAppearanceTime = 1000;
    var brickTurnBackTween1 = game.add.tween((currentBrick).scale).to({x:0}, 300, Phaser.Easing.Circular.Out, true, brickAppearanceTime);
    brickTurnBackTween1.onComplete.add(showWhiteBrick, this);

    function showWhiteBrick(){
        counter++;
        console.log(counter);
        currentBrick.frame = 1;
        var brickTurnBackTween2 = game.add.tween((currentBrick).scale).to({x:1}, 300, Phaser.Easing.Circular.Out, true);
        brickTurnBackTween2.onComplete.add(function(){
            enableBricksTap(); 
            console.log("counter = " + counter);
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
            console.log("loop");
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
    console.log(tappedBrick.name);
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
    console.log(userWasCorrect);
    console.log(coloredBricksNum);
    if(userWasCorrect == coloredBricksNum){//end of level
        disableBricksTap();
        correctFeedback();
    }
}

//****************************************CORRECT FEEDBACK*********************************************

function correctFeedback(){
    console.log("correct");

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
    tappedBrick.frame = 2;
    disableBricksTap();
    userWasWrong = true;
    var brickIsAlreadyColored = false;

    for(var i = 0; i < coloredBricksArray.length; i++){
        brickIsAlreadyColored = false;
        for(var j = 0; j < tappedBricksArray.length; j++){
            if(coloredBricksArray[i] == tappedBricksArray[j]){
                brickIsAlreadyColored = true;
                console.log("brickIsAlreadyColored");
            }
        }

        if(brickIsAlreadyColored == false){
            turnToColor(coloredBricksArray[i], "true");
        }
    }        
    errors++;
    console.log("errors= " + errors);
    if(whereIs == "game"){
        setTimeout(function(){replaceBoard("endLevel");}, 1000);   
    }else{

        doTutorial = true;
        setTimeout(function(){
//            getReadyForNewStage();
            replaceBoard("endLevel");
        }, 2500);   

    }
}


function enableBricksTap(){
    console.log("enabled");
    for(var i = 0; i < bricksStructureArray.length; i++){
        for(var j = 0; j < bricksStructureArray[0].length; j++){
            bricksStructureArray[i][j].inputEnabled = true;
        }
    } 
    pauseBtn.inputEnabled = true;
    game.add.tween(pauseBtn).to({alpha: 1}, 500, Phaser.Easing.Circular.Out, true, 0);

}

function disableBricksTap(){
    console.log("disabled");

    for(var i = 0; i < bricksStructureArray.length; i++){
        for(var j = 0; j < bricksStructureArray[0].length; j++){
            bricksStructureArray[i][j].inputEnabled = false;
        }
    } 
    pauseBtn.inputEnabled = false;
    game.add.tween(pauseBtn).to({alpha: 0.3}, 500, Phaser.Easing.Circular.Out, true, 0);
}


//********************************************TRIAL*******************************************************
//    var bricksNum;
//    var currBrick;

//********************************************TRIAL*******************************************************************
//
//****************************************REPLACE BOARD*********************************************
//function replaceBoard(state){
////    setTimeout(function(){ myInterval = setInterval(bricksTweens, 100, "endLevel"); }, 1000);
//    console.log("state1= " + state);
//
//    bricksNum = colNum * rowNum;
//    disableBricksTap();
//    onLoop(state);
//}
//
////****************************************ON LOOP*********************************************
//
//function onLoop(state){
//    console.log("state2= " + state);
//    var goodBrick = false;
//    var col;
//    var row;
//
//      if(bricksCounter < bricksNum){
//            while(goodBrick == false){ //do while the brick that was randomized was chosen before
//            //randomize a brick
//            col = getRandomNumber(0, colNum-1);
//            row = getRandomNumber(0, rowNum-1);
//            currBrick = bricksStructureArray[col][row];
//
//                if (state == "startLevel"){ //if the bricks are appearing
//                     if(currBrick.scale.x == 0){ //if the brick that was randomized is not showing yet - show it
//                        goodBrick = true;
//                        
//                    }
//                }else{ //if the bricks are hiding
//                    if(currBrick.scale.x == 1){ //if the brick that was randomized is not hidden yet - hide it
//                        goodBrick = true;
//                    }
//                }    
//            }
//     }
//       bricksCounter++;   
//       bricksTweens(state);
//       console.log("looping!");
//}
//
////**********************************BRICKS TWEENS FOR APPEARING / HIDING********************************
//
//function bricksTweens(state){
//    
//    if((bricksCounter-1) == bricksNum){ //if all the bricks are done
//        console.log("interval cleared naturaly");
//        bricksCounter = 0;
//        if(state == "startLevel"){ //if the bricks are appearing
//            setTimeout(function(){ turnBricksToColor(); }, 1000);
//            
//        }else{ //if the bricks are hiding
//            getReadyForNewStage();
//            createBoard(difficultyLevel);
//        }
//    }else{
//       
//            if (state == "startLevel"){ //if the bricks are appearing
//                    var brickTween = game.add.tween((currBrick).scale).to({x:1, y:1}, 150, Phaser.Easing.Circular.Out, true, 0);
//            }else{ //if the bricks are hiding
//                    var brickTween = game.add.tween((currBrick).scale).to({x:0, y:0}, 150, Phaser.Easing.Circular.Out, true, 0);
//        }
//             brickTween.onComplete.add(onLoop.bind(this, state), this);
//    }
//    
//}

//********************************************TRIAL*************************************************************************



//********************************************INTERVAL***********************************************************************


//****************************************REPLACE BOARD*********************************************
function replaceBoard(state){
    pauseBtn.inputEnabled = false;
    setTimeout(function(){ myInterval = setInterval(bricksTweens, 100, state); }, 500);
    disableBricksTap();
}

//***********************************BRICKS TWEENS FOR APPEARING / HIDING*************************

function bricksTweens(state){
//    console.log("colNum = " + colNum);
//    console.log("rowNum = " + rowNum);
    var bricksNum = colNum * rowNum;
    var currBrick;
    var goodBrick = false;
    var col;
    var row;

//    console.log("bricksNum= " + bricksNum);
//    console.log("bricksCounter= " + bricksCounter);

    if(bricksCounter == bricksNum){ //if all the bricks are done
        clearInterval(myInterval); 
        console.log("interval cleared naturaly");
        bricksCounter = 0;
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

//********************************************INTERVAL*******************************************************



//****************************************NEXT LEVEL*********************************************

function nextLevel(){
    difficultyLevel++;
    replaceBoard("endLevel");
    addLevelData();

    if(levelNum != lastLevel){
        levelNum++;
    }

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
    // get current data 
    levelData = '{"countPerLevel":' + 0 + ',"errorsPerLevel":' + errors + '},';

    // add the data to the full JSON string
    sessionData += levelData;
    errors = 0;
}

//****************************************TIME FUNCTIONS*********************************************

function endTimer() {
    // Stop the timer when the delayed event triggers
    gameTimer.stop();
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
        //           bricksCounter = 0;
        game.add.tween(pauseContainer).to( {x: 540}, 500, Phaser.Easing.Circular.Out, true, 0, 0, false);
        game.add.tween(gameContainer).to( { x: 0 }, 500, Phaser.Easing.Circular.Out, true, 0, 0, false);            
        gameTimer.resume();
        game.time.events.resume();
        pauseBtn.frame = 0;

        game.add.tween(pauseText).to({y:70}, 700, Phaser.Easing.Exponential.Out, true, 0, 0, false); 
        game.add.tween(levelText).to({y:13}, 700, Phaser.Easing.Exponential.Out, true, 0, 0, false);

        //           setTimeout(function(){ myInterval = setInterval(bricksTweens, 100, "startLevel"); }, 1000);
        //           removeBricks();
        disableBricksTap();           
        getReadyForNewStage();
        createBoard(difficultyLevel);
        //           replaceBoard("startLevel");
    }

    function removeBricks(){
        //            clearInterval(myInterval);
        console.log("intarval cleared");
        //        bricksCounter = bricksNum;
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
    backHomeBtn = game.add.button(86, 530, 'backHomeBtn' , backHome);

    pauseContainer = game.add.group();       
    pauseContainer.x = 540;
    pauseContainer.add(resumeGameBtn);
    pauseContainer.add(howToBtn);
    pauseContainer.add(startAgainBtn);
    pauseContainer.add(backHomeBtn);
}

//**************************************** START AGAIN *************************************

function startAgain(){
    game.physics.arcade.isPaused = (game.physics.arcade.isPaused) ? false : true;
    pauseState = !pauseState;
    gameTimer.resume();
    game.time.events.resume();
    pauseBtn.frame = 0;
    //   this.game.state.restart(true, false);  
    game.state.start('memoGameCountDown');
}

function backHome(){
    gameIsOn = false;
    window.location ="../../client_side/homePage.html";
    //    window.location ="../../homePage.html";
}

function startTutorial(){
    gameTimer.resume();
    game.time.events.resume();
    gameIsOn = false;
    cameFromGame=true;
    game.state.start('memoGameTutorial');
}

//****************************************END OF TIME SCREEN*****************************************

function timeOut() {

    timeIsOut = true;

    game.world.add(progressBarStroke);
    game.world.add(timeWord);

    pauseText.alpha = 0;
    game.add.tween(levelText).to({alpha:0}, 1000, Phaser.Easing.Linear.In, true, 500, 0, false);
    game.add.tween(pauseBtn).to({alpha:0}, 1000, Phaser.Easing.Linear.In, true, 500, 0, false);
    var containerTween = game.add.tween(gameContainer).to({alpha:0}, 1000, Phaser.Easing.Linear.In, true, 500, 0, false); 
    containerTween.onComplete.add(goToTimeOutScreen, this);

    function goToTimeOutScreen(){

        game.state.start('memoGameEndGame');

    }
}

//****************************************FINISH GAME*********************************************

function finishGame(){
    sessionData = sessionData.substring(0, sessionData.length-1);
    sessionData += "]}}"     
    //sessionData = eval ("(" + sessionData + ")");

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

    gameIsOn = false;

    endGameProgressBarWidth = progressBar.width;

    game.world.add(progressBar);
    game.world.add(progressBarStroke);
    game.world.add(timeWord);

    pauseText.alpha = 0;
    game.add.tween(levelText).to({alpha:0}, 1000, Phaser.Easing.Linear.In, true, 500, 0, false);
    game.add.tween(pauseBtn).to({alpha:0}, 1000, Phaser.Easing.Linear.In, true, 500, 0, false);
    var containerTween = game.add.tween(gameContainer).to({alpha:0}, 1000, Phaser.Easing.Linear.In, true, 500, 0, false);  
    containerTween.onComplete.add(endGameScreen, this);


    function endGameScreen(){

        game.state.start('memoGameEndGame');

    }

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

//****************************************FROM SERVER*********************************************

function fromServer() {

    //preparing to call server side page
    var xmlhttp = new XMLHttpRequest();

    //PLEASE VERIFY THAT PORT NUMBER IS CORRECT	
    // *****************************************************************

    var url = "http://project-most.herokuapp.com/userIdandLevel/" + gameID;

    // *****************************************************************

    xmlhttp.onreadystatechange = function () {

        // וידוא שניתן לקרוא את הפונקציה
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            myFunction(xmlhttp.responseText);
        }
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    //this function retreives information received from server side. received information is inside 'response'
    function myFunction(response) {
        var responseArray = response;      
        console.log(response);

        userID = responseArray[1];
        lastGameLastLevel = responseArray[3];      

        //creats the array of pictures names - to use in feedbacks
        //for (var i = 0; i < myJSON.userPics.length; i++) {
        //    picsArray.push(myJSON.userPics[i].picName)
        //}

        // creat new JSON structure
        time = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " - " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        sessionData = '{ "gameID": ' + gameID + ',"time": "' + time + '","userID": ' + userID + ',"data": {"levels": [';
    }
}