var colorGame = {}, gameID = "2", centerX = 540/2, centerY = 960/2, graphics, errors, levelNum, nextLevelText, userID, time, 
    sessionData, levelData, lastLevel = 3, currentdate, gameTimer, gameTimerEvent, picsJSONstructure, gameDurationInSeconds, progressBar, progressBarStroke, progressBarLoop, progressBarWidth, endGameProgressBarWidth, pauseState, pauseBtn, gameContainer, pauseContainer, resumeGameBtn, howToBtn, startAgainBtn, backHomeBtn, selectedPicName, timeWord, header, star, nextLevelContainer, starLines, timeIsOut = false, levelText, pauseText, levelTextMask, last10seconds, lastGameLastLevel = 0;

var colorsArray, difficultyLevel, selectedMeaningLocation, selectedColorLocation, meaning_text, meaning_color, color_text, color_color, colorTextbox, meaningTextbox1, colorCircle1, colorTextbox1, meaningTextbox2, colorCircle2, colorTextbox2, meaningTextbox3, colorCircle3, colorTextbox3, NoBtn, yesBtn, card1, card2, card3, cardBg, cardsArray = [], currentCardNum, cardsGroup, feedback, redFeed, currentTopCard, correctsCounter, last3Corrects, colorTooltip, meaningTooltip, instructionsTooltip1, instructionsTooltip2, cardY, cardX, isMatch, checkMatchCounter, checkMatchNum;

//var picsArray= ["pic1.jpg", "pic2.jpg", "pic3.jpg"];
var picsArray= [];

WebFontConfig = {

    //  load Google Font
    google: {
        families: ['Heebo']
    }
};

colorGame.colorGame = function () {};
colorGame.colorGame.prototype = {

    //****************************************PRELOAD*********************************************

    preload: function () {

    
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
        colorsArray = [["כחול", "#0000ff"],["אדום", "#ff0000"], ["ירוק", "#00ff00"], ["צהוב", "#fcd503"], ["סגול","#a64dff"], ["כתום", "#ff9900"], ["שחור", "#000000"]];
        difficultyLevel = 1;
        selectedPicName = chooseRandomPic(); //choosing a random picture for the end of game feedback
        currentCardNum = 1;
        correctsCounter = 0;
        last3Corrects = 0;
        checkMatchCounter = 0;
        checkMatchNum = 2;

        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        game.load.image('timeWord', '../assets/allGames/sprites/timeWord.png');
        game.load.image('resumeGameBtn', '../assets/colorGame/sprites/resumeGameBtn.png');
        game.load.image('howToBtn', '../assets/colorGame/sprites/howToBtn.png');    
        game.load.image('startAgainBtn', '../assets/colorGame/sprites/startAgainBtn.png');
        game.load.image('backHomeBtn', '../assets/colorGame/sprites/backHomeBtn.png');    

        game.load.spritesheet('pauseBtn', '../assets/allGames/spriteSheets/pausePlay.png', 40, 40);
        game.load.image('progressBarStroke', '../assets/allGames/sprites/timeBarStroke.png');    


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

        instructionsTooltip1 = game.add.sprite(44, 120, 'instructionsTooltip1');
        instructionsTooltip2 = game.add.sprite(20, 120, 'instructionsTooltip2');
        instructionsTooltip2.alpha = 0;

        // Create a custom timer
        gameTimer = game.time.create();
        // Create a delayed event 2m and 30s from now
        gameTimerEvent = gameTimer.add(Phaser.Timer.SECOND * gameDurationInSeconds, endTimer, this);
        // Start the timer
        gameTimer.start();

        timeWord = game.add.sprite(487.171, 72, 'timeWord');

        progressBar = game.add.graphics(11, 85);
        progressBar.beginFill(0x685d5e, 1);
        progressBar.drawRoundedRect(0, 0, 456, 12, 7);
        progressBarWidth = progressBar.width;

        //        progressBarStroke = game.add.graphics(11, 85);
        //        progressBarStroke.lineStyle(3, 0x000000, 0.5);
        //        progressBarStroke.drawRoundedRect(0, 0, 456, 12, 7);
        progressBarStroke = game.add.sprite(9, 84, 'progressBarStroke');

        // creates a loop event for the progress bar
        progressBarLoop = game.time.events.loop(100, shrinkProgressBar, this);

        noBtn = game.add.button(12.915, 847, 'yesNoBtn', noBtnFunc.bind(this, "button"));
        noBtn.frame = 1;
        yesBtn = game.add.button(276.905, 847, 'yesNoBtn', yesBtnFunc.bind(this, "button")); 
        yesBtn.frame = 3;
        noBtn.onInputDown.add(function(){noBtn.frame = 0;}, noBtn);
        noBtn.onInputUp.add(function(){noBtn.frame = 1;}, noBtn);
        yesBtn.onInputDown.add(function(){yesBtn.frame = 2;}, yesBtn);
        yesBtn.onInputUp.add(function(){yesBtn.frame = 3;}, yesBtn);

        meaningTooltip = game.add.sprite(174.91, 220, 'gameTooltips');
        meaningTooltip.frame = 1;
        colorTooltip = game.add.sprite(174.91, 694, 'gameTooltips');
        colorTooltip.frame = 0;


        feedback = game.add.sprite(centerX, 180, 'feedback'); 
        feedback.anchor.set(0.5);
        feedback.scale.set(0);

        redFeed = game.add.graphics(0, 0);
        redFeed.beginFill(0xff0000);
        redFeed.alpha=0;
        redFeed.drawRect(0, 0, 540, 960);

        cardsGroup = game.add.group();
        currentTopCard = game.add.group();

        createCardsStructure();

        enableCardDrag(currentTopCard);

        //            cardsArray = [card1, card2, card3];

        gameContainer = game.add.group();
        gameContainer.add(progressBar);
        gameContainer.add(progressBarStroke);
        gameContainer.add(timeWord);
        gameContainer.add(noBtn);
        gameContainer.add(yesBtn);
        gameContainer.add(instructionsTooltip1);
        gameContainer.add(instructionsTooltip2);
        gameContainer.add(meaningTooltip);
        gameContainer.add(colorTooltip);
        gameContainer.add(feedback);
        gameContainer.add(cardsGroup);
        gameContainer.add(redFeed);

        createPauseScreen();
    },

    //****************************************UPDATE*********************************************

    update: function () {
        currentTopCard.children[1].x = currentTopCard.children[0].x;
        currentTopCard.children[2].x = currentTopCard.children[0].x;
        currentTopCard.children[3].x = currentTopCard.children[0].x;
        currentTopCard.children[1].y = currentTopCard.children[0].y - 78;
        currentTopCard.children[2].y = currentTopCard.children[0].y + 82;        
        currentTopCard.children[3].y = currentTopCard.children[0].y + 82;
    }, 

    //**************************************** SHUTDOWN *********************************************

    shutdown: function () {

    }
};

function createCardsStructure(){
    card1 = game.add.group();
    card2 = game.add.group();
    card3 = game.add.group();

    card1.name = "card1";
    card2.name = "card2";
    card3.name = "card3";

    card3 = createCard(difficultyLevel, card3);
    card2 = createCard(difficultyLevel, card2);
    card1 = createCard(difficultyLevel, card1);

    game.physics.enable([card1, card2, card3], Phaser.Physics.ARCADE);

    card1.x = 160;
    card1.scale.set(1);

    card2.scale.set(0.95);
    card2.x = 166;
    card2.y = 7;

    card3.scale.set(0.95);
    card3.x = 166;
    card3.y = 7;

    cardsGroup.add(card3);
    cardsGroup.add(card2);
    cardsGroup.add(card1);

    currentTopCard = card1;
    currentCardNum = 1;
}

//****************************************CREATE CARD*********************************************
function createCard(currentlevel, currentCard){
    meaningTextbox = game.add.text(centerX-160, 435, '', {fontSize: '55px', fontWeight: '800', font: 'Heebo'});
    colorTextbox = game.add.text(centerX-160, 595, '', {fontSize: '55px', fontWeight: '800', font: 'Heebo'});
    colorCircle = game.add.graphics(centerX-160, 595);
    colorCircle.anchor.set(0.5);

    cardBg = game.add.sprite(centerX-160, 513, 'card');
    cardBg.anchor.set(0.5);

    var card = game.add.group();
    card.add(cardBg);
    card.add(meaningTextbox);
    card.add(colorCircle);
    card.add(colorTextbox);

    card.match = createCardContent(currentlevel, currentCard, meaningTextbox, colorCircle, colorTextbox);

    return(card);

}

//****************************************CREATE CARD CONTENT*********************************************

function createCardContent(currentlevel, currentCard, meaningTextbox, colorCircle, colorTextbox){

    //---getting random numbers---    
    selectedMeaningLocation = getRandomNumber(0, colorsArray.length - 1);
    selectedColorLocation = getRandomNumber(0, colorsArray.length - 1);

    //---checks if it's a match---
    if (selectedMeaningLocation == selectedColorLocation) {
        currentCard.match = true;
        isMatch = true;
    } else {
        currentCard.match = false;
    }

    checkMatchCounter++;

    if(checkMatchCounter == checkMatchNum){  //it's the forth card
        checkMatchCounter = 0;
        checkMatchNum = getRandomNumber(2, 3);  

        if (isMatch == false){ //if there was no match -> creating a match
            console.log("there was no match");
            selectedMeaningLocation = getRandomNumber(0, colorsArray.length - 1);
            selectedColorLocation = selectedMeaningLocation; 
            currentCard.match = true;
        }else{ //there was a match
            isMatch = false;
            console.log("was a match!!!");
        }
    }   


    //---top part---
    meaning_text = colorsArray[selectedMeaningLocation][0];
    if (currentlevel != 3) {     //sets the text color according to the current level
        meaning_color = "#000000";
    } else {
        meaning_color = colorsArray[getRandomNumber(0, colorsArray.length - 1)][1];
    }

    //---bottom part---
    color_color = colorsArray[selectedColorLocation][1];
    color_text = colorsArray[getRandomNumber(0, colorsArray.length - 1)][0];

    // ---add meaning part content to card---
    meaningTextbox.text = meaning_text;
    meaningTextbox.fill = meaning_color; 
    meaningTextbox.anchor.set(0.5);

    // ---add color part content to card---
    if (currentlevel == 1) {
        //add as color circle
        colorCircle.alpha = 1;
        colorTextbox.alpha = 0;
        color_color = color_color.replace("#", "0x");
        colorCircle.beginFill(color_color);
        colorCircle.drawCircle(0, 0, 70);
    } else {
        //add as colored word 
        colorTextbox.alpha = 1;
        colorCircle.alpha = 0;
        colorTextbox.text = color_text;
        colorTextbox.fill = color_color; 
        colorTextbox.anchor.set(0.5);
    }


    return (currentCard.match);
}

//****************************************YES/NO BUTTONS*********************************************

function yesBtnFunc(clickSource) {
    console.log("clickSource =" + clickSource);

    instructionsTooltip1.alpha = 0;
    instructionsTooltip2.alpha = 0;
    yesBtn.input.enabled = false;
    noBtn.input.enabled = false;
    var moveCard;

    if (currentTopCard.match == true) { //the card is a match
        correctFeedback();
        if (clickSource == "button"){ // the user clicked the button
            moveCard = game.add.tween(currentTopCard).to({x:660, y:120}, 400, Phaser.Easing.Back.Out, true, 0, 0, false);

        }else{ // the user dragged the card
            if(cardY < 513){ //card is in the top half of the screen
                moveCard = game.add.tween(currentTopCard).to({x:660, y:-120}, 400, Phaser.Easing.Back.Out, true, 0, 0, false);
            }else{ // bottom half
                moveCard = game.add.tween(currentTopCard).to({x:660, y:120}, 400, Phaser.Easing.Back.Out, true, 0, 0, false);
            }
        }
    } else { // the card is not a match
        errorFeedback();

        if (clickSource == "button"){ // the user clicked the button
            moveCard = game.add.tween(currentTopCard).to({x:250, y:50}, 400, Phaser.Easing.Back.Out).to({x:-340}, 400, Phaser.Easing.Back.Out).start();
        }else{ // the user dragged the card
            if(cardY < 513){ //card is in the top half of the screen
                moveCard = game.add.tween(currentTopCard).to({x:-1000, y:-50}, 600, Phaser.Easing.Circular.Out).start(); 
            }else{ // bottom half
                moveCard = game.add.tween(currentTopCard).to({x:-1000, y:50}, 600, Phaser.Easing.Circular.Out).start(); 
            }
        }
    }
    growCard();

    moveCard.onComplete.add(enableButtons, this);
}


function noBtnFunc(clickSource) {
    instructionsTooltip1.alpha = 0;
    instructionsTooltip2.alpha = 0;
    noBtn.input.enabled = false;
    yesBtn.input.enabled = false;
    var moveCard;

    if (currentTopCard.match == false) { // the card is not a match - user was correct
        correctFeedback();

        if (clickSource == "button"){ // the user clicked the button
            moveCard = game.add.tween(currentTopCard).to({x:-340, y:120}, 400, Phaser.Easing.Back.Out, true, 0, 0, false);
        }else{ // the user dragged the card
            if(cardY < 513){ // card is in the top half of the screen
                moveCard = game.add.tween(currentTopCard).to({x:-340, y:-120}, 400, Phaser.Easing.Back.Out, true, 0, 0, false);
            }else{ // bottom half
                moveCard = game.add.tween(currentTopCard).to({x:-340, y:120}, 400, Phaser.Easing.Back.Out, true, 0, 0, false);
            }
        }

    } else { // the card is a match - user was wrong
        errorFeedback();

        if (clickSource == "button"){ // the user clicked the button
            moveCard = game.add.tween(currentTopCard).to({x:30, y:50}, 400, Phaser.Easing.Back.Out).to({x:660, y:120}, 400, Phaser.Easing.Back.Out).start();
        }else{ // the user dragged the card
            if(cardY < 513){ //card is in the top half of the screen
                moveCard = game.add.tween(currentTopCard).to({x:1200, y:-50}, 500, Phaser.Easing.Circular.Out).start(); 
            }else{ // bottom half
                moveCard = game.add.tween(currentTopCard).to({x:1200, y:50}, 500, Phaser.Easing.Circular.Out).start(); 
            }
        }
    }
    growCard();

    moveCard.onComplete.add(enableButtons, this);
}

//****************************************ENABLE BUTTONS*********************************************

function enableButtons(){                 
    changeCard();    

    if(last3Corrects != 3){
        yesBtn.input.enabled = true;
        noBtn.input.enabled = true;
        enableCardDrag(currentTopCard);

    }else{
        last3Corrects = 0;
    }   
}

//****************************************CHANGE CARD*********************************************

function changeCard(){
    if(currentCardNum == 1){
        card1.match = createCardContent(difficultyLevel, card1, card1.children[1], card1.children[2], card1.children[3]);
        cardsGroup.sendToBack(card1);

        card1.scale.set(0.95);
        card1.x = 166;
        card1.y = 7;  
        returnCardToPlace(card1);
        currentCardNum = 2;

    }else if(currentCardNum == 2){
        card2.match = createCardContent(difficultyLevel, card2, card2.children[1], card2.children[2], card2.children[3]);
        cardsGroup.sendToBack(card2);
        card2.scale.set(0.95);
        card2.x = 166;
        card2.y = 7;   
        returnCardToPlace(card2);
        currentCardNum = 3;

    }else{
        card3.match = createCardContent(difficultyLevel, card3, card3.children[1], card3.children[2], card3.children[3]);
        cardsGroup.sendToBack(card3);
        card3.scale.set(0.95);
        card3.x = 166;
        card3.y = 7; 
        returnCardToPlace(card3);
        currentCardNum = 1; 
    }  
}

function growCard(){
    if(currentCardNum == 1){
        game.add.tween(card2.scale).to({x:1, y:1}, 200, Phaser.Easing.Back.Out, true, 0, 0, false);
        game.add.tween(card2).to({x:160, y:0}, 200, Phaser.Easing.Back.Out, true, 0, 0, false);

        //            currentCardNum = 2;
        currentTopCard = card2;

    }else if(currentCardNum == 2){
        game.add.tween(card3.scale).to({x:1, y:1}, 200, Phaser.Easing.Back.Out, true, 0, 0, false);
        game.add.tween(card3).to({x:160, y:0}, 200, Phaser.Easing.Back.Out, true, 0, 0, false);

        //         currentCardNum = 3;
        currentTopCard = card3;

    }else{

        game.add.tween(card1.scale).to({x:1, y:1}, 200, Phaser.Easing.Back.Out, true, 0, 0, false);
        game.add.tween(card1).to({x:160, y:0}, 200, Phaser.Easing.Back.Out, true, 0, 0, false);

        //         currentCardNum = 1; 
        currentTopCard = card1;

    }   
}

//****************************************RETURN THE DRAGGED CARD TO ITS ORIGINAL PLACE*********************************************

function returnCardToPlace(card){
    for(var i=0; i<4; i++){
        card.children[i].x = centerX-160
    }
    card.children[0].y= 513;
    card.children[1].y= 435;
    card.children[2].y= 595;
    card.children[3].y= 595;
}

//****************************************ENABLE CARD DRAG*********************************************

function enableCardDrag(currentTopCard){
    currentTopCard.children[0].inputEnabled = true;
    currentTopCard.children[0].input.start(0, true);
    currentTopCard.children[0].input.enableDrag(false, false, true);    
    currentTopCard.children[0].events.onDragStop.add(onDragStop, this);

}

//****************************************DISABLE CARD DRAG*********************************************

function disableCardDrag(currentTopCard){
    currentTopCard.children[0].inputEnabled = false;
}

//****************************************ON DRAG STOP*********************************************

function onDragStop(){
    if((currentTopCard.children[0].x != centerX-160) && (currentTopCard.children[0].y != 0)){
        console.log("card disabled");
        disableCardDrag(currentTopCard);
    }
    cardY = currentTopCard.children[0].y;
    cardX = currentTopCard.children[0].x;
    if(currentTopCard.children[0].x > centerX-160){
        yesBtnFunc("drag");
    }else if (currentTopCard.children[0].x < centerX-160){
        noBtnFunc("drag");
    }
}

//****************************************FEEDBACK*********************************************

function correctFeedback(){
    correctsCounter++;
    //    correctSound.play();

    if (correctsCounter >= 13){
        last3Corrects ++;
    }

    console.log("corrects: " + correctsCounter);
    console.log("last3Corrects: " + last3Corrects);

    if((levelNum == lastLevel) && (last3Corrects == 3)){
        addLevelData();
        finishGame();
    }else{
        if(last3Corrects == 3){
            nextLevel();
        } 
    }

    console.log("correct");  
    feedback.frame = 1;
    var showFeed = game.add.tween(feedback.scale).to({x:1, y:1}, 200, Phaser.Easing.Back.Out, true, 0, 0, false);
    showFeed.onComplete.add(hideFeedback, this);

    function hideFeedback(){
        game.add.tween(feedback.scale).to({x:0, y:0}, 200, Phaser.Easing.Circular.InOut, true, 300, 0, false);
    }
}

function errorFeedback(){
    errors++;
    //     errorSound.play();
    console.log("error");  
    last3Corrects = 0;
    feedback.frame = 0;
    var showFeed = game.add.tween(feedback.scale).to({x:1, y:1}, 200, Phaser.Easing.Back.Out, true, 0, 0, false);
    showFeed.onComplete.add(function(){game.add.tween(feedback.scale).to({x:0, y:0}, 300, Phaser.Easing.Circular.InOut, true, 400, 0, false);}, this);
    var showRedRect = game.add.tween(redFeed).to({alpha:0.3}, 200, Phaser.Easing.Back.Out, true, 0, 0, false);
    showRedRect.onComplete.add(hideRedRectangle, this);

    function hideRedRectangle(){
        game.add.tween(redFeed).to({alpha:0}, 300, Phaser.Easing.Circular.InOut, true, 400, 0, false);
    }
}

//****************************************NEXT LEVEL*********************************************

function nextLevel(){
    //VVV delete the line below after connect to server
    //    correctsCounter = 0;
    addLevelData();
    levelNum++;
    levelText.text = 'שלב ' + lastLevel + ' / ' + levelNum;
    difficultyLevel++;   //increasing the difficulty level

    star = game.add.sprite(0, 0, 'star');
    starLines = game.add.sprite(0, 0, 'starLines');
    starLines.alpha = 0;

    nextLevelText = game.add.text(130, 120, '', {fontSize: '30px', font: 'Heebo', fill: '#fff'});
    nextLevelText.text = "שלב " + levelNum;

    nextLevelContainer = game.add.group();
    nextLevelContainer.add(star);
    nextLevelContainer.add(starLines);
    nextLevelContainer.add(nextLevelText);     

//         game.world.add(currentTopCard);
    cardsContainer = game.add.group();
    cardsContainer.add(meaningTooltip);
    cardsContainer.add(colorTooltip);
    cardsContainer.add(cardsGroup);

    //      cardsContainer.alpha = 0;

    nextLevelContainer.x = 100;
    nextLevelContainer.y = 1500;

    gameContainer.add(nextLevelContainer);
    gameContainer.add(cardsContainer);

    //        afterCard();
    var cardsTween = game.add.tween(cardsContainer).to({y:-900}, 700, Phaser.Easing.Circular.Out, true, 200);
    //      var cardsTween = game.add.tween(cardsContainer).to({alpha:0}, 100, Phaser.Easing.Circular.Out, true, 600);
    cardsTween.onComplete.add(afterCard, this);

    gameContainer.bringToTop(progressBar); 
    gameContainer.bringToTop(progressBarStroke); 
    gameContainer.bringToTop(timeWord);
    gameContainer.bringToTop(yesBtn);
    gameContainer.bringToTop(noBtn);
    gameContainer.bringToTop(redFeed);

    game.world.bringToTop(header);
    game.world.bringToTop(pauseBtn);
    game.world.bringToTop(pauseText);
    game.world.bringToTop(levelText);


}
function afterCard(){
    card1.destroy();
    card2.destroy();
    card3.destroy(); 
    createCardsStructure();

    var starTweenA =game.add.tween(nextLevelContainer).to({y:300}, 1000, Phaser.Easing.Circular.Out, true, 100);
    starTweenA.onComplete.add(activateStarTweenB, this);   
}

//****************************************ADD LEVEL DATA*********************************************

function addLevelData(){
    // get current data   
    var totalCardsPerLevel = parseInt(correctsCounter) + parseInt(errors);
    levelData = '{"countPerLevel":' + totalCardsPerLevel + ',"errorsPerLevel":' + errors + '},';

    // add the data to the full JSON string
    sessionData += levelData;  
    errors = 0;
    correctsCounter = 0;
    totalCardsPerLevel = 0;   
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
    if(pauseState){

        game.add.tween(pauseContainer).to({x:0}, 500, Phaser.Easing.Circular.Out, true, 0, 0, false);
        game.add.tween(gameContainer).to({x:-540}, 500, Phaser.Easing.Circular.Out, true, 0, 0, false);
        gameTimer.pause();
        game.time.events.pause();
        pauseBtn.frame = 1;
        game.add.tween(pauseText).to({y:13}, 700, Phaser.Easing.Exponential.Out, true, 0, 0, false); 
        game.add.tween(levelText).to({y:-44}, 700, Phaser.Easing.Exponential.Out, true, 0, 0, false); 

    }else{
        game.add.tween(pauseContainer).to( {x: 540}, 500, Phaser.Easing.Circular.Out, true, 0, 0, false);
        game.add.tween(gameContainer).to( { x: 0 }, 500, Phaser.Easing.Circular.Out, true, 0, 0, false);            
        gameTimer.resume();
        game.time.events.resume();
        pauseBtn.frame = 0;

        game.add.tween(pauseText).to({y:70}, 700, Phaser.Easing.Exponential.Out, true, 0, 0, false); 
        game.add.tween(levelText).to({y:13}, 700, Phaser.Easing.Exponential.Out, true, 0, 0, false);

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
    game.state.start('colorGameCountDown');
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
    game.state.start('colorGameTutorial');
}

//****************************************END OF GAME*****************************************

function Finish(state) {
    sessionData = sessionData.substring(0, sessionData.length - 1);
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

    if (state == "timeOut") {
        timeIsOut = true;
    } else {
        gameIsOn = false;
        endGameProgressBarWidth = progressBar.width;
    }

    game.world.add(progressBar);
    game.world.add(progressBarStroke);
    game.world.add(timeWord);

    pauseText.alpha = 0;
    game.add.tween(levelText).to({ alpha: 0 }, 700, Phaser.Easing.Linear.In, true, 0, 0, false);
    game.add.tween(pauseBtn).to({ alpha: 0 }, 700, Phaser.Easing.Linear.In, true, 0, 0, false);

    //   cardsGroup.alpha = 0;
//    var cardsTween = game.add.tween(cardsContainer).to({y:-900}, 700, Phaser.Easing.Circular.Out, true, 200);
//    cardsTween.onComplete.add(removeContainer, this);

//    function removeContainer() {
            setTimeout(function(){cardsGroup.alpha = 0;}, 300);   
    
        var containerTween = game.add.tween(gameContainer).to({ alpha: 0 }, 400, Phaser.Easing.Linear.In, true, 300, 0, false);
        containerTween.onComplete.add(changeState, this);

        function changeState() {
            
            game.state.start('colorGameEndGame');
        }
//    }
}

//************************************************ TIME OUT SCREEN **************************************************
function timeOut() {
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

//****************************************TINT*********************************************

function tint(){
    this.tint = 0xbbbbbb;
}

function unTint(){
    this.tint = 0xFFFFFF;

}

//****************************************CHOOSE RANDOM PICTURE*****************************************

function chooseRandomPic() {
    if(picsArray.length>0){
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


//****************************************enterFullScreen *********************************************

function enterFullScreen() {
    document.documentElement.webkitRequestFullscreen();
}