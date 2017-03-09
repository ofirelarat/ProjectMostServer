var tapToContinue, tapToContinueText, BgTop, BgBottom, rightGate, leftGate, sliderBtn, gateMask, gateWidth = 130, tutorialProgessCounter, tooltip1, tooltip2, tooltip3, tooltip4, tooltip5, tooltip6, tooltip7, arrow, tutorialHeader, gameHeader, gateColorTimer, sliderBtnStrokeTween, skipBtn, star, starLines, wellDoneText, nextLevelContainer, gameIsOn = false, letsStart, startGameBtn, needTapToContinueText = false, tapToContinueTimer, screenPatch, btnSound,hitGateSound, hitWallsSound,errorSound, correctSound, tutorialCardsArray, tutorialGroupsArray, tCard1, tCard2, tCard3, tCard4, tCard5, tCard6, tCard7, tCardsGroup, tYesBtn, tNoBtn, tutorialCurrentCardNum, userWasCorrect, emptyCard1, emptyCard2, emptyCard3, wordTextbox1, wordTextbox2, tutorialCurrentCard, tutorialNotCurrentCard, endOfTutorial, tutorialMoveCard, tool1Sound, tool2Sound, tool3Sound,tool4Sound,tool5Sound, tool6Sound, cameFromGame=false;


colorGame.colorGameTutorial = function () {};
colorGame.colorGameTutorial.prototype = {

    //****************************************PRELOAD*********************************************

    preload: function () {
        tutorialProgessCounter = 1;
        tutorialCardsArray = [["כחול", "#0000ff", "true"],["אדום", "#ff0000", "true"], ["ירוק", "#00ff00", "true"], ["צהוב", "#ff0000", "false"], ["סגול","#ff9900", "false"], ["שחור", "#ffff00", "false"], ["כתום", "#ff9900", "true"]];
        tutorialCurrentCardNum = -1;
        userWasCorrect = false;
        endOfTutorial = false; 

        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        game.load.spritesheet('Bg', '../assets/colorGame/backgrounds/bg.jpg', 540, 447.5);
        game.load.image('tutorialHeader', '../assets/colorGame/backgrounds/tutorialHeader.png');
        game.load.image('header', '../assets/colorGame/backgrounds/header.jpg');
        game.load.image('tooltip1', '../assets/colorGame/sprites/tooltip1.png');
        game.load.image('tooltip2', '../assets/colorGame/sprites/tooltip2.png');
        game.load.image('tooltip3', '../assets/colorGame/sprites/tooltip3.png');
        game.load.image('tooltip4', '../assets/colorGame/sprites/tooltip4.png');
        game.load.image('tooltip5', '../assets/colorGame/sprites/tooltip5.png');
        game.load.image('tooltip6', '../assets/colorGame/sprites/tooltip6.png');
        game.load.image('arrow', '../assets/colorGame/sprites/arrow.png');
        game.load.spritesheet('startGameBtn', '../assets/colorGame/spriteSheets/startGameBtn.png', 220, 220);

        game.load.image('card', '../assets/colorGame/sprites/card.png');
        game.load.image('emptyCard', '../assets/colorGame/sprites/emptyCard.png');
        game.load.image('instructionsTooltip1', '../assets/colorGame/sprites/instructionsTooltip1.png');
        game.load.image('instructionsTooltip2', '../assets/colorGame/sprites/instructionsTooltip2.png');
        game.load.spritesheet('yesNoBtn', '../assets/colorGame/spriteSheets/yesNoBtn.png', 250, 100);
        game.load.spritesheet('gameTooltips', '../assets/colorGame/spriteSheets/gameTooltips.png', 190, 100);

        game.load.spritesheet('feedback', '../assets/allGames/spriteSheets/feedback.png',56, 56);
        game.load.image('skipBtn', '../assets/allGames/sprites/skipBtn.png');
        game.load.image('star', '../assets/colorGame/sprites/star.png');    
        game.load.image('starLines', '../assets/allGames/sprites/star_lines.png');
        game.load.image('letsStart', '../assets/allGames/sprites/letsStart.png');

        game.load.audio('error', '../assets/colorGame/sounds/error.mp3'); 
        game.load.audio('correct', '../assets/colorGame/sounds/correct.mp3');

        game.load.audio('tool1Sound', '../assets/colorGame/sounds/tooltip1.mp3'); 
        game.load.audio('tool2Sound', '../assets/colorGame/sounds/tooltip2.mp3'); 
        game.load.audio('tool3Sound', '../assets/colorGame/sounds/tooltip3.mp3'); 
        game.load.audio('tool4Sound', '../assets/colorGame/sounds/tooltip4.mp3'); 
        game.load.audio('tool5Sound', '../assets/colorGame/sounds/tooltip5.mp3'); 
        game.load.audio('tool6Sound', '../assets/colorGame/sounds/tooltip6.mp3'); 

    },

    //****************************************CREATE*********************************************

    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.world.setBounds(0, 0, 540, 960);

        btnSound = game.add.audio('btnSound');

        tool1Sound =  game.add.audio('tool1Sound');
        tool2Sound =  game.add.audio('tool2Sound');
        tool3Sound =  game.add.audio('tool3Sound');
        tool4Sound =  game.add.audio('tool4Sound');
        tool5Sound =  game.add.audio('tool5Sound');
        tool6Sound =  game.add.audio('tool6Sound');   

        BgTop = game.add.sprite(0, 65, 'Bg');
        BgTop.frame = 0;
        BgBottom = game.add.sprite(0, 512, 'Bg');
        BgBottom.frame = 1;

        emptyCard3 = game.add.sprite(centerX, 523, 'emptyCard');
        emptyCard3.anchor.set(0.5);
        emptyCard3.scale.set(0.95);

        tCardsGroup = game.add.group();
        tCard2 = game.add.group();
        tCard1 = game.add.group();
        game.physics.enable([tCard1, tCard2], Phaser.Physics.ARCADE);

        tutorialCurrentCard = game.add.group();
        tutorialNotCurrentCard = game.add.group();
        tCardsGroup.add(emptyCard3);
        tCardsGroup.add(tCard2);
        tCardsGroup.add(tCard1);
        tCardsGroup.alpha = 0;

        emptyCard1 = game.add.sprite(centerX-160, 543, 'emptyCard');
        emptyCard1.anchor.set(0.5);
        wordTextbox1 = game.add.text(centerX-160, 550, '', {fontSize: '55px', fontWeight: '800', font: 'Heebo'});
        wordTextbox1.anchor.set(0.5);
        tCard1.add(emptyCard1);
        tCard1.add(wordTextbox1);
        tCard1.children[1].text = tutorialCardsArray[0][0];
        tCard1.children[1].fill = tutorialCardsArray[0][1];
        tCard1.x = 160;

        emptyCard2 = game.add.sprite(centerX-160, 543, 'emptyCard');
        emptyCard2.anchor.set(0.5);
        wordTextbox2 = game.add.text((centerX-160), 550, '', {fontSize: '55px', fontWeight: '800', font: 'Heebo'});
        wordTextbox2.anchor.set(0.5);
        tCard2.add(emptyCard2);
        tCard2.add(wordTextbox2);
        tCard2.scale.set(0.95);
        tCard2.x = 166;
        tCard2.y = 7;

        tutorialCurrentCard = tCard1;
        tutorialNotCurrentCard = tCard2;

        star = game.add.sprite(0, 0, 'star');
        starLines = game.add.sprite(0, 0, 'starLines');
        starLines.alpha = 0;

        wellDoneText = game.add.text(110, 130, '', {fontSize: '30px', font: 'Heebo', fill: '#fff'});
        wellDoneText.text = "!כל הכבוד";

        nextLevelContainer = game.add.group();

        nextLevelContainer.add(star);
        nextLevelContainer.add(starLines);
        nextLevelContainer.add(wellDoneText);

        nextLevelContainer.x = 100;
        nextLevelContainer.y = 1500;

        letsStart = game.add.sprite(104.041, 1000, 'letsStart');
        startGameBtn = game.add.button(159.99, 1095, 'startGameBtn', startGame);
        startGameBtn.frame = 0;
        startGameBtn.onInputDown.add(function(){startGameBtn.frame = 1;}, startGameBtn);
        startGameBtn.onInputUp.add(function(){startGameBtn.frame = 0;}, startGameBtn);

        gameHeader = game.add.sprite(0, 0, 'header');
        tutorialHeader = game.add.sprite(0, 0, 'tutorialHeader');

        tapToContinue = game.add.graphics(0, 0);
        tapToContinue.beginFill(0x874e9b, 0);
        tapToContinue.drawRect(0, 0, 540, 960);
        tapToContinue.inputEnabled = true;   

        //timer for the gate to turn red when the ball hits it        
        gateColorTimer = game.time.create(false);
        tapToContinueTimer = game.time.create(false);

        skipBtn = game.add.button(540, 0, 'skipBtn', startGame);
        skipBtn.anchor.setTo(1, 0);

        correctSound = game.add.audio('correct');
        errorSound = game.add.audio('error');


        tNoBtn = game.add.button(12.915, 970, 'yesNoBtn', tutorialNoBtn.bind(this, "button"));
        tNoBtn.frame = 1;
        tYesBtn = game.add.button(276.905, 970, 'yesNoBtn', tutorialYesBtn); 
        tYesBtn.frame = 3;
        tNoBtn.onInputDown.add(function(){tNoBtn.frame = 0;}, tNoBtn);
        tNoBtn.onInputUp.add(function(){tNoBtn.frame = 1;}, tNoBtn);
        tYesBtn.onInputDown.add(function(){tYesBtn.frame = 2;}, tYesBtn);
        tYesBtn.onInputUp.add(function(){tYesBtn.frame = 3;}, tYesBtn);

        feedback = game.add.sprite(centerX, 320, 'feedback'); 
        feedback.anchor.set(0.5);
        feedback.scale.set(0);

        redFeed = game.add.graphics(0, 0);
        redFeed.beginFill(0xff0000);
        redFeed.alpha=0;
        redFeed.drawRect(0, 0, 540, 960);

        tooltip1 = game.add.sprite(44, 162, 'tooltip1');
        tooltip1.alpha = 0;
        tooltip2 = game.add.sprite(44, 162, 'tooltip2');
        tooltip2.alpha = 0;
        tooltip3 = game.add.sprite(44, 162, 'tooltip3');
        tooltip3.alpha = 0;
        tooltip4 = game.add.sprite(44, 162, 'tooltip4');
        tooltip4.alpha = 0;
        tooltip5 = game.add.sprite(44, 162, 'tooltip5');
        tooltip5.alpha = 0;
        tooltip6 = game.add.sprite(44, 162, 'tooltip6');
        tooltip6.alpha = 0;

        if(Cookies.get('first-time-color') == undefined || cameFromGame==true){
            tutorialSequence();  
        }
        if (Cookies.get('first-time-color') == undefined)
        {
            Cookies.set('first-time-color', 'true');
        }else if(Cookies.get('first-time-color') != undefined && (cameFromGame==false)){
            game.state.start('colorGameCountDown');    
        }   
    },

    //****************************************UPDATE*********************************************

    update: function () {
        tutorialCurrentCard.children[1].x = tutorialCurrentCard.children[0].x;
        tutorialCurrentCard.children[1].y = tutorialCurrentCard.children[0].y + 7;

    }    
};

//****************************************CREATE TUTORIAL CARDS*********************************************

function createTutorialCards(userWasCorrect){
    tutorialCurrentCardNum++;
    console.log("tutorialCurrentCardNum" + tutorialCurrentCardNum);

    if((userWasCorrect) && (tutorialCurrentCardNum < 3)){
        tutorialCurrentCardNum = 3
        tutorialSequence();
    }else if((userWasCorrect) && (tutorialCurrentCardNum > 3) && (tutorialCurrentCardNum < 6)){
        tutorialCurrentCardNum = 6;
        tutorialProgessCounter = 4;
        tutorialSequence();

    }else if((userWasCorrect) && (tutorialCurrentCardNum == 3)){
        tutorialSequence(); 
    }else if((userWasCorrect) && (tutorialCurrentCardNum == 6)){
        tutorialSequence(); 

    }

    tutorialNotCurrentCard.children[1].text = tutorialCardsArray[tutorialCurrentCardNum][0];
    tutorialNotCurrentCard.children[1].fill = tutorialCardsArray[tutorialCurrentCardNum][1];
    tCardsGroup.sendToBack(tutorialNotCurrentCard);
    tCardsGroup.sendToBack(emptyCard3);
    tutorialNotCurrentCard.x = 166; 
    tutorialNotCurrentCard.y = 7;    
    tutorialCurrentCard.x = 160; 
    tutorialCurrentCard.y = 0; 
}

function switchCards(){
    if(tutorialCurrentCard == tCard1){
        tutorialCurrentCard = tCard2;
        tutorialNotCurrentCard = tCard1;

    }else{
        tutorialNotCurrentCard = tCard2;
        tutorialCurrentCard = tCard1;
    }
    tutorialNotCurrentCard.scale.set(0.95);
    game.add.tween(tutorialCurrentCard.scale).to({x:1, y:1}, 200, Phaser.Easing.Back.Out, true, 0, 0, false);
    game.add.tween(tutorialCurrentCard).to({x:160, y:0}, 200, Phaser.Easing.Back.Out, true, 0, 0, false);

    tYesBtn.input.enabled = true;
    tNoBtn.input.enabled = true;

    if (tutorialCurrentCardNum == 6){
        tutorialCurrentCard.children[0].inputEnabled = true;
        tutorialCurrentCard.children[0].input.start(0, true);
        tutorialCurrentCard.children[0].input.enableDrag(false, false, true);
        tutorialCurrentCard.children[0].events.onDragStop.add(tutorialOnDragStop, this);


        tYesBtn.input.enabled = false;
        tNoBtn.input.enabled = false;
        tNoBtn.frame = 4;
        tYesBtn.frame = 5;

    }
}

function tutorialYesBtn(){
    tool1Sound.stop();
    tool2Sound.stop();
    tool3Sound.stop();
    tool4Sound.stop();
    tool5Sound.stop();
    tool6Sound.stop();

    tYesBtn.input.enabled = false;
    tNoBtn.input.enabled = false;

    if (tutorialCardsArray[tutorialCurrentCardNum][2] == "true"){
        userWasCorrect = true;
        correctFeedback();
        tutorialMoveCard = game.add.tween(tutorialCurrentCard).to({x:900, y:120}, 800, Phaser.Easing.Back.Out, true, 0, 0, false);
    }else{
        userWasCorrect = false;

        tutorialErrorFeedback();
        tutorialMoveCard = game.add.tween(tutorialCurrentCard).to({x:332, y:50}, 200, Phaser.Easing.Back.Out).to({x:166, y:0}, 400, Phaser.Easing.Back.Out).to({x:-660, y:50}, 400, Phaser.Easing.Back.Out, false, 1000).start();
        tooltip2.alpha = 0;
        tooltip3.alpha = 0;
        tooltip4.alpha = 0;
        tooltip5.alpha = 1;
        tool5Sound.play();

        game.add.tween(tooltip5).to({alpha:0}, 400, Phaser.Easing.Linear.In, true, 1200, 0, false);

        if (tutorialCurrentCardNum == 5){
            emptyCard3.alpha = 0;
            var tween = game.add.tween(tooltip4).to({alpha:1}, 400, Phaser.Easing.Linear.In, true, 1700, 0, false);

            tween.onComplete.add(function(){

                setTimeout(function(){ 
                    tool4Sound.play();
                }, 400);
            }, this);


        }else{
            var tween2 = game.add.tween(tooltip2).to({alpha:1}, 400, Phaser.Easing.Linear.In, true, 1700, 0, false);

            tween2.onComplete.add(function(){

                setTimeout(function(){ 
                    tool2Sound.play();
                }, 400);
            }, this)
        }
    } 

    if (endOfTutorial == false){
        createTutorialCards(userWasCorrect);
        tutorialMoveCard.onComplete.add(switchCards, this);
    }else{
        tutorialProgessCounter = 5;
        tutorialSequence();
    }  

}

function tutorialNoBtn(){
    tool1Sound.stop();
    tool2Sound.stop();
    tool3Sound.stop();
    tool4Sound.stop();
    tool5Sound.stop();
    tool6Sound.stop();


    tYesBtn.input.enabled = false;
    tNoBtn.input.enabled = false;

    if (tutorialCardsArray[tutorialCurrentCardNum][2] == "false"){
        userWasCorrect = true;
        correctFeedback();
        tutorialMoveCard = game.add.tween(tutorialCurrentCard).to({x:-900, y:120}, 800, Phaser.Easing.Back.Out, true, 0, 0, false);

    }else{
        userWasCorrect = false;
        tutorialErrorFeedback();
        tutorialMoveCard = game.add.tween(tutorialCurrentCard).to({x:0, y:50}, 200, Phaser.Easing.Back.Out).to({x:166, y:0}, 400, Phaser.Easing.Back.Out).to({x:660, y:50}, 400, Phaser.Easing.Back.Out, false, 1000).start();

        tooltip2.alpha = 0;
        tooltip4.alpha = 0;
        tooltip6.alpha = 1;

        tool6Sound.play();

        var tween = game.add.tween(tooltip6).to({alpha:0}, 400, Phaser.Easing.Linear.In, true, 1200, 0, false);
        game.add.tween(tooltip2).to({alpha:1}, 400, Phaser.Easing.Linear.In, true, 1700, 0, false);

        tween.onComplete.add(function(){

            setTimeout(function(){ 
                tool2Sound.play();
            }, 400);
        }, this)


    }

    if (endOfTutorial == false){
        createTutorialCards(userWasCorrect);
        tutorialMoveCard.onComplete.add(switchCards, this);

    }else{
        tutorialProgessCounter = 5;
        tutorialSequence();
    }

}

function tutorialErrorFeedback(){
    //    errorSound.play();
    feedback.frame = 0;
    var showFeed = game.add.tween(feedback.scale).to({x:1, y:1}, 200, Phaser.Easing.Back.Out, true, 0, 0, false);
    showFeed.onComplete.add(function(){game.add.tween(feedback.scale).to({x:0, y:0}, 300, Phaser.Easing.Circular.InOut, true, 1100, 0, false);}, this);
    var showRedRect = game.add.tween(redFeed).to({alpha:0.3}, 200, Phaser.Easing.Back.Out, true, 0, 0, false);
    showRedRect.onComplete.add(hideRedRectangle, this);

    function hideRedRectangle(){
        game.add.tween(redFeed).to({alpha:0}, 300, Phaser.Easing.Circular.InOut, true, 1100, 0, false);
    }
}

//****************************************TUTORIAL SEQUENCE*********************************************

function tutorialSequence(){

    //--------------------ברוכים הבאים למשחק הצבעים 1-------------------------------
    if (tutorialProgessCounter == 1){

        tool1Sound.play();


        tapToContinueText = game.add.text(99, 320, '', {fontSize: '35px', fill:'#3b3838', font: 'Heebo', align: 'center'});
        tapToContinueText.text = 'כדי להתקדם - געו במסך';
        tapToContinueText.alpha = 0;


        game.add.tween(tooltip1).to({alpha:1}, 400, Phaser.Easing.Linear.In, true, 0, 0, false);

        var textTween = game.add.tween(tapToContinueText).to({alpha:1}, 600, Phaser.Easing.Linear.In, true, 1100, 0, false);
        textTween.onComplete.add(function(){
            tapToContinue.events.onInputDown.add(tutorialSequence); 
        }, this);

        tutorialProgessCounter++;  

        //------------------------------האם המשמעות של המילה מתאימה לצבע של הטקסט שלה? 2-----------------------------

    }else if (tutorialProgessCounter == 2){

        tool1Sound.stop();

        tapToContinue.events.onInputDown.removeAll();  
        game.add.tween(tapToContinueText).to({alpha:0}, 400, Phaser.Easing.Linear.In, true, 0, 0, false);
        game.world.sendToBack(tapToContinue);

        game.add.tween(tooltip1).to({alpha:0}, 400, Phaser.Easing.Linear.In, true, 0, 0, false);
        game.add.tween(tooltip2).to({alpha:1}, 400, Phaser.Easing.Linear.In, true, 800, 0, false);


        setTimeout(function(){ 
            tool2Sound.play();

        }, 1000);

        createTutorialCards(userWasCorrect);

        tCardsGroup.alpha = 1;
        tCardsGroup.y = 800;
        game.add.tween(tCardsGroup).to({y:0}, 400, Phaser.Easing.Linear.In, true, 800, 0, false);
        game.add.tween(tYesBtn).to({y:847}, 400, Phaser.Easing.Linear.In, true, 800, 0, false);
        game.add.tween(tNoBtn).to({y:847}, 400, Phaser.Easing.Linear.In, true, 800, 0, false);

        tutorialProgessCounter++;  

        //----------------------------------------3 ועכשיו?------------------------------------------

    }else if (tutorialProgessCounter == 3){

        tool2Sound.stop();
        tool6Sound.stop();

        game.add.tween(tooltip2).to({alpha:0}, 400, Phaser.Easing.Linear.In, true, 0, 0, false);
        game.add.tween(tooltip6).to({alpha:0}, 400, Phaser.Easing.Linear.In, true, 0, 0, false);
        game.add.tween(tooltip3).to({alpha:1}, 400, Phaser.Easing.Linear.In, true, 600, 0, false);

        setTimeout(function(){ 
            tool3Sound.play();
        }, 1000);

        tutorialProgessCounter++;    

        //-----------------------------------4 אפשר גם להחליק את הקלף לצד המתאים כדי לענות------------------------------

    }else if (tutorialProgessCounter == 4){
        emptyCard3.alpha = 0;
        console.log("alpha=" + emptyCard3.alpha);
        tYesBtn.input.enabled = false;
        tNoBtn.input.enabled = false;

        tool2Sound.stop();
        tool3Sound.stop();
        tool5Sound.stop();


        game.add.tween(tooltip2).to({alpha:0}, 400, Phaser.Easing.Linear.In, true, 0, 0, false);
        game.add.tween(tooltip3).to({alpha:0}, 400, Phaser.Easing.Linear.In, true, 0, 0, false);
        game.add.tween(tooltip5).to({alpha:0}, 400, Phaser.Easing.Linear.In, true, 0, 0, false);
        game.add.tween(tooltip4).to({alpha:1}, 400, Phaser.Easing.Linear.In, true, 800, 0, false);


        setTimeout(function(){ 
            tool4Sound.play();
        }, 1000);

        console.log("card =" + tutorialCurrentCard);

        //----------------------------------------5------------------------------------------
    }else if (tutorialProgessCounter == 5){

        tool4Sound.stop();

        game.add.tween(tooltip4).to({alpha:0}, 400, Phaser.Easing.Linear.In, true, 1000, 0, false);
        game.add.tween(tYesBtn).to({y:1000}, 400, Phaser.Easing.Linear.In, true, 1000, 0, false);
        game.add.tween(tNoBtn).to({y:1000}, 400, Phaser.Easing.Linear.In, true, 1000, 0, false);
        game.add.tween(tutorialHeader).to({y:-300}, 400, Phaser.Easing.Linear.In, true, 1000, 0, false);
        game.add.tween(skipBtn).to({y:-287}, 400, Phaser.Easing.Linear.In, true, 1000, 0, false);


        var starTweenA = game.add.tween(nextLevelContainer).to({y:300}, 1000, Phaser.Easing.Circular.Out, true, 1600);
        starTweenA.onComplete.add(activateStarTweenB, this);
    }
}


//****************************************TWEENS*********************************************

function activateStarTweenB () {
    nextLevelContainer.y=300;
    game.add.tween(starLines).to({alpha:1}, 600, Phaser.Easing.Sinusoidal.Out, true, 0); 
    var starTweenB =  game.add.tween(nextLevelContainer).to({y:-400}, 1000, Phaser.Easing.Circular.Out, true, 1000); 
    starTweenB.onComplete.add(afterStar, this);
}

function afterStar () {
    starLines.alpha = 0;
    if (gameIsOn){
        //            if(pauseState == false){
        //              currentBall = createBall();
        //                createCardsStructure();
        cardsContainer.y = 900;
        cardsContainer.alpha = 1;
        var cardsReturn = game.add.tween(cardsContainer).to({y:0}, 600, Phaser.Easing.Circular.Out, true, 0); 
        cardsReturn.onComplete.add(function(){
            yesBtn.input.enabled = true;
            noBtn.input.enabled = true;
            enableCardDrag(currentTopCard);
            game.add.tween(instructionsTooltip2).to({alpha:1}, 600, Phaser.Easing.Circular.Out, true, 0);

        }, this);

        //            }       
    }else{
        tutorialProgessCounter++;
        game.add.tween(letsStart).to({y:312}, 600, Phaser.Easing.Sinusoidal.Out, true, 0); 
        game.add.tween(startGameBtn).to({y:397}, 600, Phaser.Easing.Sinusoidal.Out, true, 0); 

    }
}

//****************************************ON DRAG STOP*********************************************

function tutorialOnDragStop(){
    //    disableCardDrag(currentTopCard);
    if(tutorialCurrentCard.children[0].x > centerX-160){
        console.log("right");
        //        emptyCard3.alpha = 0;
        correctFeedback();
        tutorialMoveCard = game.add.tween(tutorialCurrentCard).to({x:660, y:120}, 400, Phaser.Easing.Back.Out, true, 0, 0, false);
    }else if (tutorialCurrentCard.children[0].x < centerX-160){
        console.log("left");
        tutorialErrorFeedback();
        game.add.tween(tutorialCurrentCard).to({x:0}, 200, Phaser.Easing.Back.Out).to({x:1300}, 600, Phaser.Easing.Back.Out, false, 0).start();

    }
    tutorialProgessCounter = 5;
    tutorialSequence();
}

//****************************************START GAME*********************************************

function startGame(){
    //    btnSound.play();
    tool1Sound.stop();
    tool2Sound.stop();
    tool3Sound.stop();
    tool4Sound.stop();
    tool5Sound.stop();
    tool6Sound.stop();

    game.state.start('colorGameCountDown');
}