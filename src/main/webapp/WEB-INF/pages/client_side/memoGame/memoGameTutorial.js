var tapToContinue, tapToContinueText, BgTop, BgBottom, tutorialProgessCounter, tooltip1, tooltip2, tooltip3, tooltip4, tooltip5, tooltip6, tooltip7, arrow, tutorialHeader, gameHeader, skipBtn, star, starLines, wellDoneText, nextLevelContainer, gameIsOn = false, letsStart, startGameBtn, needTapToContinueText = false, tapToContinueTimer, btnSound, brickSize, stageWidth, stageHeight, difficultyLevel, TcurrentLevel, TcolNum, TrowNum, TcoloredBricksNum, bricksCounter, whereIs, userWasCorrect, successCounter, tool1Sound, tool2Sound, tool3Sound, tool4Sound, tool5Sound, letsBeginSound, greatJobSound, correctSound, errorSound, showBrickSound, levelUpSound, wooshSound, cameFromGameToTutorial = false, cameFromGameToPlayAgain = false, counter, tutorialIsSkipped;

var TutorialLevelsArray = [
    {
        colNum: 2,
        rowNum: 2,
        coloredBricksNum: 2
    },
    {
        colNum: 3,
        rowNum: 3,
        coloredBricksNum: 3
    }];


WebFontConfig = {
    //  load Google Font
    google: {
        families: ['Heebo']
    }
};

memoGame.memoGameTutorial = function () {};
memoGame.memoGameTutorial.prototype = {

    //****************************************PRELOAD*********************************************

    preload: function () {
        tutorialProgessCounter = 1;

        brickSize = 83.75;
        stageWidth = 540;
        stageHeight = 895;
        bricksCounter = 0;
        doTutorial = false;
        whereIs = "tutorial";
        userWasCorrect = 0;
        successCounter = 0;
        userWasWrong = false;
        counter = 0;
        levelNum = 1;
        pauseState = false;
        tutorialIsSkipped = false;

        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        game.load.spritesheet('pauseBtn', '../assets/allGames/spriteSheets/pausePlay.png', 40, 40);

        game.load.spritesheet('Bg', '../assets/memoGame/backgrounds/bg.jpg', 540, 447.5);
        game.load.image('tutorialHeader', '../assets/memoGame/backgrounds/tutorialHeader.png');
        game.load.image('header', '../assets/memoGame/backgrounds/header.jpg');

        game.load.image('skipBtn', '../assets/allGames/sprites/skipBtn.png');
        game.load.image('star', '../assets/memoGame/sprites/star.png');    
        game.load.image('starLines', '../assets/allGames/sprites/star_lines.png');
        game.load.image('letsStart', '../assets/allGames/sprites/letsStart.png');

        game.load.spritesheet('startGameBtn', '../assets/memoGame/spriteSheets/startGameBtn.png', 220, 220);
        game.load.spritesheet('brick', '../assets/memoGame/spriteSheets/brick.png', 84, 84);
        game.load.spritesheet('feedback', '../assets/allGames/spriteSheets/feedback.png',56, 56);

        game.load.image('tooltip1', '../assets/memoGame/sprites/tooltip1.png');
        game.load.image('tooltip2', '../assets/memoGame/sprites/tooltip2.png');
        game.load.image('tooltip3', '../assets/memoGame/sprites/tooltip3.png');
        game.load.image('tooltip4', '../assets/memoGame/sprites/tooltip4.png');
        game.load.image('tooltip5', '../assets/memoGame/sprites/tooltip5.png');

        game.load.audio('btnSound', '../assets/allGames/sounds/pressBtn.mp3');
        game.load.audio('tool1Sound', '../assets/memoGame/sounds/tooltip1.mp3'); 
        game.load.audio('tool2Sound', '../assets/memoGame/sounds/tooltip2.mp3'); 
        game.load.audio('tool3Sound', '../assets/memoGame/sounds/tooltip3.mp3'); 
        game.load.audio('tool4Sound', '../assets/memoGame/sounds/tooltip4.mp3'); 
        game.load.audio('tool5Sound', '../assets/memoGame/sounds/tooltip5.mp3'); 

        game.load.audio('letsBegin', '../assets/allGames/sounds/letsStart.mp3'); 
        game.load.audio('greatJob', '../assets/allGames/sounds/greatJob.mp3'); 

        game.load.audio('correct', '../assets/memoGame/sounds/correct.mp3');
        game.load.audio('error', '../assets/memoGame/sounds/error.mp3'); 
        game.load.audio('showBrick', '../assets/memoGame/sounds/showBrick.mp3');
        game.load.audio('levelUp', '../assets/memoGame/sounds/levelUp.mp3');
        game.load.audio('woosh', '../assets/memoGame/sounds/woosh.mp3');

    },

    //****************************************CREATE*********************************************

    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.world.setBounds(0, 0, 540, 960);

        tool1Sound =  game.add.audio('tool1Sound');
        tool2Sound =  game.add.audio('tool2Sound');
        tool3Sound =  game.add.audio('tool3Sound');
        tool4Sound =  game.add.audio('tool4Sound');
        tool5Sound =  game.add.audio('tool5Sound');

        btnSound = game.add.audio('btnSound');
        levelUpSound = game.add.audio('levelUp');
        wooshSound = game.add.audio('woosh');
        wooshSound.volume =0.5;
        correctSound = game.add.audio('correct');
        errorSound = game.add.audio('error');
        showBrickSound = game.add.audio('showBrick');

        letsBeginSound = game.add.audio('letsBegin');
        greatJobSound = game.add.audio('greatJob');

        BgTop = game.add.sprite(0, 65, 'Bg');
        BgTop.frame = 0;
        BgBottom = game.add.sprite(0, 512, 'Bg');
        BgBottom.frame = 1;

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

        pauseBtn = game.add.button(11, 11, 'pauseBtn', togglePause); 
        pauseBtn.alpha = 0;

        letsStart = game.add.sprite(104.041, 1000, 'letsStart');
        startGameBtn = game.add.button(159.99, 1095, 'startGameBtn', startGame);
        startGameBtn.frame = 0;
        startGameBtn.onInputDown.add(function(){startGameBtn.frame = 1;}, startGameBtn);
        startGameBtn.onInputUp.add(function(){startGameBtn.frame = 0;}, startGameBtn);

        difficultyLevel = 0;
        currentLevel = levelsArray[difficultyLevel];
        colNum = currentLevel.colNum;
        rowNum = currentLevel.rowNum;
        coloredBricksNum = currentLevel.coloredBricksNum;

        gameHeader = game.add.sprite(0, 0, 'header');
        tutorialHeader = game.add.sprite(0, 0, 'tutorialHeader');

        tapToContinue = game.add.graphics(0, 0);
        tapToContinue.beginFill(0x874e9b, 0);
        tapToContinue.drawRect(0, 0, 540, 960);
        tapToContinue.inputEnabled = true;   

        //timer for the gate to turn red when the ball hits it        
        tapToContinueTimer = game.time.create(false);

        skipBtn = game.add.button(540, 0, 'skipBtn', startGame);
        skipBtn.anchor.setTo(1, 0);

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

        if(lastGameLastLevel == 0 || cameFromGameToTutorial == true){
            cameFromGameToTutorial = false;
            tutorialSequence();  
        } else if((lastGameLastLevel != 0) && (cameFromGameToTutorial == false)){
            game.state.start('memoGameCountDown');    
        } else if(cameFromGameToPlayAgain == true){
            cameFromGameToPlayAgain = false;
            game.state.start('memoGameCountDown'); 
        }   

    },

    //****************************************UPDATE*********************************************

    update: function () {
        if (doTutorial == true){
            tutorialSequence();
        }
    }    
};

//****************************************TUTORIAL SEQUENCE*********************************************

function tutorialSequence(){

    tapToContinueTimer.stop();

    //----------------------------------------1 ברוכים הבאים למשחק זיכרון בריבוע------------------------------------------

    if (tutorialProgessCounter == 1){

        tool1Sound.play();

        game.add.tween(tooltip1).to({alpha:1}, 600, Phaser.Easing.Linear.In, true, 0, 0, false);

        tapToContinueText = game.add.text(99, 480, '', {fontSize: '35px', fill:'#3b3838', font: 'Heebo', align: 'center'});
        tapToContinueText.text = 'כדי להתקדם - געו במסך';
        tapToContinueText.alpha = 0;
        difficultyLevel = 0;

        var textTween = game.add.tween(tapToContinueText).to({alpha:1}, 600, Phaser.Easing.Linear.In, true, 1100, 0, false);
        textTween.onComplete.add(function(){
            tapToContinue.events.onInputDown.add(tutorialSequence); 
        }, this);

        tutorialProgessCounter++;  

        //----------------------------------------2 זכרו את המיקום של הלבנים הכחולות------------------------------------------

    }else if (tutorialProgessCounter == 2){
        tool1Sound.stop();
        skipBtn.input.enabled = false;

        setTimeout(function(){ 
            tool2Sound.play();
        }, 1000);

        createBoard(difficultyLevel);
        tapToContinue.destroy();

        game.add.tween(tapToContinueText).to({alpha:0}, 600, Phaser.Easing.Linear.In, true, 0, 0, false);
        game.add.tween(tooltip1).to({alpha:0}, 600, Phaser.Easing.Linear.In, true, 0, 0, false);
        game.add.tween(tooltip2).to({alpha:1}, 600, Phaser.Easing.Linear.In, true, 800, 0, false);

        tutorialProgessCounter++;  

        //----------------------------------------3 לחצו על הלבנים שהיו כחולות------------------------------------------

    }else if (tutorialProgessCounter == 3){
        disableBricksTap();
        tool2Sound.stop();
            setTimeout(function(){ 
                tool3Sound.play();
                tool3Sound.onStop.addOnce(enableBricksTap, this);
            }, 900);

        doTutorial = false;

        game.add.tween(tooltip2).to({alpha:0}, 500, Phaser.Easing.Linear.In, true, 0, 0, false);
        var tween = game.add.tween(tooltip3).to({alpha:1}, 500, Phaser.Easing.Linear.In, true, 600, 0, false);
        tween.onComplete.add(function(){
            skipBtn.input.enabled = true;
        }, this);

        tutorialProgessCounter++;

        //----------------------------------------4 זכרו את המיקום של הלבנים הכחולות ושחזרו אותו------------------------------------------

    }else if (tutorialProgessCounter == 4){
        tool3Sound.stop();

        doTutorial = false;

        game.add.tween(tooltip3).to({alpha:0}, 500, Phaser.Easing.Linear.In, true, 0, 0, false);

        if(userWasWrong == true){

            setTimeout(function(){ 
                tool5Sound.play();
            }, 1000);
            game.add.tween(tooltip4).to({alpha:0}, 600, Phaser.Easing.Linear.In, true, 0, 0, false);
            //אופס, בחרתם בלבנה שגויה 5
            var tween = game.add.tween(tooltip5).to({alpha:1}, 600, Phaser.Easing.Linear.In, false, 500, 0, false).to({alpha:0}, 600, Phaser.Easing.Linear.In, false, 1600, 0, false).start();
            tween.onComplete.add(function(){
                game.add.tween(tooltip4).to({alpha:1}, 600, Phaser.Easing.Linear.In, true, 1000, 0, false);
                setTimeout(function(){tool4Sound.play();}, 1000)    
            }, this);
        }else{
            setTimeout(function(){ 
                tool4Sound.play();
            }, 2000);
            game.add.tween(tooltip4).to({alpha:0}, 500, Phaser.Easing.Linear.In, false, 600, 0, false).to({alpha:1}, 600, Phaser.Easing.Linear.In, false, 600, 0, false).start();
        }

        //----------------------------------------5 כל הכבוד, בואו נתחיל------------------------------------------
    }else if (tutorialProgessCounter == 5){
        tool4Sound.stop();

        game.add.tween(tutorialHeader).to({y:-300}, 600, Phaser.Easing.Linear.In, true, 0, 0, false);
        game.add.tween(skipBtn).to({y:-287}, 600, Phaser.Easing.Linear.In, true, 0, 0, false);
        game.add.tween(tooltip4).to({alpha:0}, 600, Phaser.Easing.Linear.In, true, 0, 0, false);

        var starTweenA = game.add.tween(nextLevelContainer).to({y:300}, 1000, Phaser.Easing.Circular.Out, true, 100);
        starTweenA.onComplete.add(activateStarTweenB, this);
    }
}

//****************************************TWEENS*********************************************

function activateStarTweenB () {
    greatJobSound.play();  
    nextLevelContainer.y = 300;
    game.add.tween(starLines).to({alpha:1}, 600, Phaser.Easing.Sinusoidal.Out, true, 0); 
    var starTweenB =  game.add.tween(nextLevelContainer).to({y:-400}, 700, Phaser.Easing.Circular.Out, true, 1000); 
    starTweenB.onComplete.add(afterStar, this);
}

function afterStar () {
    game.add.tween(letsStart).to({y:312}, 600, Phaser.Easing.Sinusoidal.Out, true, 0); 
    game.add.tween(startGameBtn).to({y:397}, 600, Phaser.Easing.Sinusoidal.Out, true, 0); 
    letsBeginSound.play();
}

//****************************************START GAME*********************************************

function startGame(){
    pauseState = true;
    tool1Sound.stop();
    tool2Sound.stop();
    tool3Sound.stop();
    tool4Sound.stop();
    tool5Sound.stop();

    btnSound.play();
    game.state.start('memoGameCountDown');
}

//****************************************tutorialNextLevel*********************************************

function tutorialNextLevel(){
    successCounter++;
    userWasWrong = false;

    if (successCounter == 1){
        tutorialProgessCounter = 4;
        tutorialSequence();
        difficultyLevel++;
        replaceBoard("endLevel");
    }else{
        for(var i = 0; i < bricksStructureArray.length; i++){
            for(var j = 0; j < bricksStructureArray[0].length; j++){
                var brickTween = game.add.tween((bricksStructureArray[i][j]).scale).to({x:0, y:0}, 300, Phaser.Easing.Circular.Out, true, 0);
            }
        } 

        tutorialProgessCounter = 5;
        tutorialSequence();
    }
}