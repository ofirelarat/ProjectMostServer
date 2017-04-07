var rushGame = {}, centerX = 540/2, centerY = 960/2, graphics, levelNum, nextLevelText, levelData, gameTimer, gameTimerEvent, gameDurationInSeconds, progressBar, progressBarStroke, progressBarLoop, progressBarWidth, endGameProgressBarWidth, pauseState, pauseBtn, gameContainer, brickContainer, pauseContainer, resumeGameBtn, howToBtn, startAgainBtn, backHomeBtn, selectedPicName, timeWord, header, star, nextLevelContainer, starLines, timeIsOut, levelText, pauseText, levelTextMask, last10seconds, car, truck, levelArray, stepCounter, orangeCar, brickMask,brickHitSound, orangeBrickOutSound, restartBtnWasClicked, stepBackBtnWasClicked, startX, endX, startY, endY, currentBrick, tool1Sound, tool2Sound, tool3Sound, tool4Sound, tool5Sound, tool6Sound, difficultyLevel, userStartPoint, HORIZONTAL = 0, VERTICAL = 1, tileSize = 80, restarLevelBtn, stepBackBtn, orangeBrick, popup, popupBg, popupNoBtn, popupYesBtn, xBtn; 

var lastLevel = 10;

// these are the cars to place on the board.
// each car is an object with the following properties:
// row: car upper row
// col: car leftmost column
// dir: car direction, can be HORIZONTAL or VERTICAL
// spr: name of the image to assign to car sprite
var carsArray1=[{row:0,col:2,dir:VERTICAL,len:2,spr:"car"},{row:1,col:4,dir:HORIZONTAL,len:2,spr:"car"},{row:2,col:2,dir:HORIZONTAL,len:2,spr:"orangeCar"},{row:2,col:4,dir:VERTICAL,len:2,spr:"car"},{row:4,col:0,dir:HORIZONTAL,len:3,spr:"truck"},{row:4,col:3,dir:HORIZONTAL,len:2,spr:"car"}],carsArray2=[{row:0,col:0,dir:VERTICAL,len:3,spr:"truck"},{row:0,col:3,dir:VERTICAL,len:2,spr:"car"},{row:0,col:4,dir:HORIZONTAL,len:2,spr:"car"},{row:1,col:1,dir:HORIZONTAL,len:2,spr:"car"},{row:1,col:5,dir:VERTICAL,len:2,spr:"car"},{row:2,col:3,dir:HORIZONTAL,len:2,spr:"orangeCar"},{row:2,col:1,dir:VERTICAL,len:3,spr:"truck"},{row:2,col:2,dir:VERTICAL,len:2,spr:"car"},{row:3,col:3,dir:HORIZONTAL,len:3,spr:"truck"},{row:4,col:2,dir:VERTICAL,len:2,spr:"car"},{row:4,col:3,dir:HORIZONTAL,len:3,spr:"truck"}],carsArray3=[{row:0,col:1,dir:HORIZONTAL,len:2,spr:"car"},{row:0,col:3,dir:VERTICAL,len:2,spr:"car"},{row:2,col:2,dir:HORIZONTAL,len:2,spr:"orangeCar"},{row:1,col:1,dir:VERTICAL,len:2,spr:"car"},{row:1,col:4,dir:HORIZONTAL,len:2,spr:"car"},{row:2,col:5,dir:VERTICAL,len:2,spr:"car"},{row:4,col:5,dir:VERTICAL,len:2,spr:"car"},{row:4,col:0,dir:HORIZONTAL,len:2,spr:"car"},{row:4,col:2,dir:VERTICAL,len:2,spr:"car"}],carsArray4=[{row:0,col:0,dir:HORIZONTAL,len:3,spr:"truck"},{row:0,col:5,dir:VERTICAL,len:3,spr:"truck"},{row:1,col:2,dir:VERTICAL,len:3,spr:"truck"},{row:2,col:0,dir:HORIZONTAL,len:2,spr:"orangeCar"},{row:3,col:0,dir:VERTICAL,len:2,spr:"car"},{row:3,col:4,dir:HORIZONTAL,len:2,spr:"car"},{row:5,col:0,dir:HORIZONTAL,len:3,spr:"truck"},{row:4,col:4,dir:VERTICAL,len:2,spr:"car"}],carsArray5=[{row:0,col:0,dir:HORIZONTAL,len:2,spr:"car"},{row:1,col:0,dir:VERTICAL,len:3,spr:"truck"},{row:4,col:0,dir:VERTICAL,len:2,spr:"car"},{row:2,col:1,dir:HORIZONTAL,len:2,spr:"orangeCar"},{row:1,col:3,dir:VERTICAL,len:3,spr:"truck"},{row:5,col:2,dir:HORIZONTAL,len:3,spr:"truck"},{row:0,col:5,dir:VERTICAL,len:3,spr:"truck"},{row:4,col:4,dir:HORIZONTAL,len:2,spr:"car"}],carsArray6=[{row:1,col:3,dir:VERTICAL,len:3,spr:"truck"},{row:2,col:1,dir:HORIZONTAL,len:2,spr:"orangeCar"},{row:1,col:4,dir:VERTICAL,len:3,spr:"truck"},{row:3,col:0,dir:HORIZONTAL,len:2,spr:"car"},{row:3,col:2,dir:VERTICAL,len:2,spr:"car"},{row:4,col:1,dir:VERTICAL,len:2,spr:"car"},{row:5,col:2,dir:HORIZONTAL,len:2,spr:"car"}],carsArray7=[{row:0,col:0,dir:HORIZONTAL,len:2,spr:"car"},{row:1,col:0,dir:VERTICAL,len:3,spr:"truck"},{row:4,col:0,dir:VERTICAL,len:2,spr:"car"},{row:2,col:1,dir:HORIZONTAL,len:2,spr:"orangeCar"},{row:1,col:3,dir:VERTICAL,len:3,spr:"truck"},{row:5,col:2,dir:HORIZONTAL,len:3,spr:"truck"},{row:0,col:5,dir:VERTICAL,len:3,spr:"truck"},{row:4,col:4,dir:HORIZONTAL,len:2,spr:"car"}],carsArray8=[{row:2,col:1,dir:HORIZONTAL,len:2,spr:"orangeCar"},{row:3,col:1,dir:HORIZONTAL,len:2,spr:"car"},{row:4,col:1,dir:VERTICAL,len:2,spr:"car"},{row:2,col:3,dir:VERTICAL,len:3,spr:"truck"},{row:5,col:2,dir:HORIZONTAL,len:2,spr:"car"},{row:3,col:5,dir:VERTICAL,len:3,spr:"truck"}],carsArray9=[{row:0,col:0,dir:HORIZONTAL,len:2,spr:"car"},{row:0,col:3,dir:VERTICAL,len:3,spr:"truck"},{row:0,col:5,dir:VERTICAL,len:2,spr:"car"},{row:1,col:0,dir:VERTICAL,len:3,spr:"truck"},{row:1,col:4,dir:VERTICAL,len:3,spr:"truck"},{row:2,col:1,dir:HORIZONTAL,len:2,spr:"orangeCar"},{row:3,col:1,dir:HORIZONTAL,len:3,spr:"truck"},{row:2,col:5,dir:VERTICAL,len:2,spr:"car"},{row:4,col:0,dir:VERTICAL,len:2,spr:"car"},{row:4,col:4,dir:HORIZONTAL,len:2,spr:"car"},{row:5,col:4,dir:HORIZONTAL,len:2,spr:"car"}],carsArray10=[{row:0,col:0,dir:HORIZONTAL,len:2,spr:"car"},{row:1,col:0,dir:HORIZONTAL,len:2,spr:"car"},{row:0,col:3,dir:VERTICAL,len:2,spr:"car"},{row:1,col:4,dir:VERTICAL,len:3,spr:"truck"},{row:1,col:5,dir:VERTICAL,len:3,spr:"truck"},{row:2,col:1,dir:HORIZONTAL,len:2,spr:"orangeCar"},{row:2,col:3,dir:VERTICAL,len:3,spr:"truck"},{row:3,col:0,dir:HORIZONTAL,len:2,spr:"car"},{row:4,col:0,dir:VERTICAL,len:2,spr:"car"},{row:3,col:2,dir:VERTICAL,len:2,spr:"car"},{row:5,col:3,dir:HORIZONTAL,len:3,spr:"truck"}],carsArray11=[{row:0,col:1,dir:VERTICAL,len:2,spr:"car"},{row:0,col:2,dir:HORIZONTAL,len:2,spr:"car"},{row:0,col:4,dir:VERTICAL,len:2,spr:"car"},{row:0,col:5,dir:VERTICAL,len:2,spr:"car"},{row:2,col:1,dir:HORIZONTAL,len:2,spr:"orangeCar"},{row:1,col:3,dir:VERTICAL,len:2,spr:"car"},{row:2,col:5,dir:VERTICAL,len:2,spr:"car"},{row:3,col:2,dir:HORIZONTAL,len:2,spr:"car"},{row:4,col:3,dir:VERTICAL,len:2,spr:"car"}],carsArray12=[{row:0,col:3,dir:HORIZONTAL,len:2,spr:"car"},{row:0,col:5,dir:VERTICAL,len:3,spr:"truck"},{row:1,col:2,dir:HORIZONTAL,len:2,spr:"car"},{row:1,col:4,dir:VERTICAL,len:2,spr:"car"},{row:2,col:2,dir:VERTICAL,len:2,spr:"car"},{row:2,col:0,dir:HORIZONTAL,len:2,spr:"orangeCar"},{row:2,col:3,dir:VERTICAL,len:2,spr:"car"},{row:3,col:4,dir:HORIZONTAL,len:2,spr:"car"},{row:3,col:0,dir:HORIZONTAL,len:2,spr:"car"},{row:4,col:0,dir:HORIZONTAL,len:2,spr:"car"},{row:5,col:0,dir:HORIZONTAL,len:2,spr:"car"},{row:4,col:2,dir:VERTICAL,len:2,spr:"car"},{row:4,col:3,dir:HORIZONTAL,len:3,spr:"truck"},{row:5,col:3,dir:HORIZONTAL,len:3,spr:"truck"}],carsArray13=[{row:0,col:1,dir:VERTICAL,len:2,spr:"car"},{row:0,col:2,dir:HORIZONTAL,len:2,spr:"car"},{row:0,col:4,dir:HORIZONTAL,len:2,spr:"car"},{row:1,col:3,dir:VERTICAL,len:2,spr:"car"},{row:1,col:4,dir:HORIZONTAL,len:2,spr:"car"},{row:2,col:0,dir:HORIZONTAL,len:2,spr:"orangeCar"},{row:2,col:4,dir:VERTICAL,len:3,spr:"truck"},{row:2,col:5,dir:VERTICAL,len:2,spr:"car"},{row:3,col:0,dir:VERTICAL,len:3,spr:"truck"},{row:3,col:1,dir:HORIZONTAL,len:3,spr:"truck"},{row:4,col:2,dir:VERTICAL,len:2,spr:"car"},{row:4,col:5,dir:VERTICAL,len:2,spr:"car"}],carsArray14=[{row:0,col:0,dir:HORIZONTAL,len:2,spr:"car"},{row:0,col:2,dir:VERTICAL,len:2,spr:"car"},{row:0,col:4,dir:HORIZONTAL,len:2,spr:"car"},{row:1,col:0,dir:HORIZONTAL,len:2,spr:"car"},{row:1,col:5,dir:VERTICAL,len:3,spr:"truck"},{row:2,col:1,dir:HORIZONTAL,len:2,spr:"orangeCar"},{row:2,col:0,dir:VERTICAL,len:3,spr:"truck"},{row:3,col:1,dir:HORIZONTAL,len:3,spr:"truck"},{row:5,col:0,dir:HORIZONTAL,len:2,spr:"car"},{row:4,col:3,dir:VERTICAL,len:2,spr:"car"},{row:4,col:4,dir:HORIZONTAL,len:2,spr:"car"},{row:5,col:4,dir:HORIZONTAL,len:2,spr:"car"}],carsArray15=[{row:0,col:0,dir:VERTICAL,len:3,spr:"truck"},{row:0,col:1,dir:HORIZONTAL,len:2,spr:"car"},{row:0,col:3,dir:VERTICAL,len:3,spr:"truck"},{row:2,col:1,dir:HORIZONTAL,len:2,spr:"orangeCar"},{row:3,col:2,dir:VERTICAL,len:2,spr:"car"},{row:3,col:3,dir:HORIZONTAL,len:3,spr:"truck"},{row:5,col:2,dir:HORIZONTAL,len:3,spr:"truck"},{row:4,col:5,dir:VERTICAL,len:2,spr:"car"}],carsArray16=[{row:0,col:0,dir:VERTICAL,len:2,spr:"car"},{row:0,col:1,dir:HORIZONTAL,len:2,spr:"car"},{row:0,col:5,dir:VERTICAL,len:3,spr:"truck"},{row:2,col:0,dir:HORIZONTAL,len:2,spr:"orangeCar"},{row:1,col:2,dir:VERTICAL,len:3,spr:"truck"},{row:3,col:3,dir:HORIZONTAL,len:3,spr:"truck"},{row:5,col:0,dir:HORIZONTAL,len:3,spr:"truck"},{row:4,col:4,dir:VERTICAL,len:2,spr:"car"}],carsArray17=[{row:0,col:0,dir:HORIZONTAL,len:2,spr:"car"},{row:0,col:2,dir:HORIZONTAL,len:2,spr:"car"},{row:0,col:4,dir:VERTICAL,len:2,spr:"car"},{row:1,col:2,dir:VERTICAL,len:2,spr:"car"},{row:2,col:3,dir:HORIZONTAL,len:2,spr:"orangeCar"},{row:1,col:5,dir:VERTICAL,len:3,spr:"truck"},{row:2,col:1,dir:VERTICAL,len:2,spr:"car"},{row:3,col:3,dir:HORIZONTAL,len:2,spr:"car"},{row:3,col:0,dir:VERTICAL,len:3,spr:"truck"},{row:5,col:1,dir:HORIZONTAL,len:2,spr:"car"},{row:4,col:3,dir:VERTICAL,len:2,spr:"car"},{row:4,col:4,dir:HORIZONTAL,len:2,spr:"car"},{row:5,col:4,dir:HORIZONTAL,len:2,spr:"car"}],carsArray18=[{row:0,col:0,dir:HORIZONTAL,len:2,spr:"car"},{row:0,col:2,dir:VERTICAL,len:2,spr:"car"},{row:1,col:4,dir:HORIZONTAL,len:2,spr:"car"},{row:2,col:0,dir:VERTICAL,len:2,spr:"car"},{row:2,col:1,dir:VERTICAL,len:2,spr:"car"},{row:2,col:2,dir:HORIZONTAL,len:2,spr:"orangeCar"},{row:3,col:2,dir:HORIZONTAL,len:2,spr:"car"},{row:2,col:4,dir:VERTICAL,len:2,spr:"car"},{row:2,col:5,dir:VERTICAL,len:2,spr:"car"},{row:4,col:2,dir:VERTICAL,len:2,spr:"car"},{row:4,col:4,dir:HORIZONTAL,len:2,spr:"car"},{row:5,col:0,dir:HORIZONTAL,len:2,spr:"car"}],carsArray19=[{row:0,col:1,dir:HORIZONTAL,len:2,spr:"car"},{row:0,col:3,dir:HORIZONTAL,len:2,spr:"car"},{row:1,col:0,dir:HORIZONTAL,len:2,spr:"car"},{row:1,col:2,dir:HORIZONTAL,len:2,spr:"car"},{row:2,col:2,dir:HORIZONTAL,len:2,spr:"orangeCar"},{row:1,col:4,dir:VERTICAL,len:3,spr:"truck"},{row:1,col:5,dir:VERTICAL,len:3,spr:"truck"},{row:2,col:0,dir:VERTICAL,len:3,spr:"truck"},{row:2,col:1,dir:VERTICAL,len:3,spr:"truck"},{row:3,col:2,dir:VERTICAL,len:2,spr:"car"},{row:3,col:3,dir:VERTICAL,len:2,spr:"car"},{row:4,col:4,dir:HORIZONTAL,len:2,spr:"car"},{row:5,col:1,dir:HORIZONTAL,len:2,spr:"car"},{row:5,col:3,dir:HORIZONTAL,len:2,spr:"car"}],carsArray20=[{row:0,col:0,dir:HORIZONTAL,len:2,spr:"car"},{row:0,col:2,dir:HORIZONTAL,len:2,spr:"car"},{row:0,col:4,dir:VERTICAL,len:2,spr:"car"},{row:0,col:5,dir:VERTICAL,len:3,spr:"truck"},{row:1,col:2,dir:HORIZONTAL,len:2,spr:"car"},{row:2,col:3,dir:HORIZONTAL,len:2,spr:"orangeCar"},{row:1,col:0,dir:VERTICAL,len:2,spr:"car"},{row:2,col:1,dir:VERTICAL,len:2,spr:"car"},{row:2,col:2,dir:VERTICAL,len:3,spr:"truck"},{row:3,col:3,dir:HORIZONTAL,len:3,spr:"truck"},{row:5,col:0,dir:HORIZONTAL,len:2,spr:"car"}],carsArray21=[{row:0,col:0,dir:VERTICAL,len:2,spr:"car"},{row:0,col:1,dir:HORIZONTAL,len:3,spr:"truck"},{row:1,col:2,dir:HORIZONTAL,len:2,spr:"car"},{row:1,col:4,dir:HORIZONTAL,len:2,spr:"car"},{row:2,col:0,dir:HORIZONTAL,len:2,spr:"orangeCar"},{row:2,col:2,dir:VERTICAL,len:2,spr:"car"},{row:3,col:0,dir:HORIZONTAL,len:2,spr:"car"},{row:4,col:0,dir:HORIZONTAL,len:3,spr:"truck"},{row:5,col:0,dir:HORIZONTAL,len:3,spr:"truck"},{row:3,col:3,dir:VERTICAL,len:3,spr:"truck"},{row:4,col:4,dir:VERTICAL,len:2,spr:"car"},{row:4,col:5,dir:VERTICAL,len:2,spr:"car"}],carsArray22=[{row:0,col:2,dir:VERTICAL,len:2,spr:"car"},{row:0,col:3,dir:HORIZONTAL,len:2,spr:"car"},{row:1,col:4,dir:VERTICAL,len:2,spr:"car"},{row:2,col:1,dir:VERTICAL,len:2,spr:"car"},{row:2,col:2,dir:HORIZONTAL,len:2,spr:"orangeCar"},{row:3,col:2,dir:HORIZONTAL,len:2,spr:"car"},{row:3,col:4,dir:VERTICAL,len:2,spr:"car"},{row:4,col:1,dir:HORIZONTAL,len:3,spr:"truck"}],carsArray23=[{row:0,col:0,dir:HORIZONTAL,len:2,spr:"car"},{row:0,col:2,dir:VERTICAL,len:2,spr:"car"},{row:0,col:3,dir:VERTICAL,len:3,spr:"truck"},{row:1,col:0,dir:VERTICAL,len:3,spr:"truck"},{row:2,col:1,dir:HORIZONTAL,len:2,spr:"orangeCar"},{row:3,col:1,dir:HORIZONTAL,len:3,spr:"truck"},{row:5,col:3,dir:HORIZONTAL,len:3,spr:"truck"}],carsArray24=[{row:0,col:2,dir:HORIZONTAL,len:3,spr:"truck"},{row:0,col:5,dir:VERTICAL,len:3,spr:"truck"},{row:1,col:2,dir:VERTICAL,len:2,spr:"car"},{row:1,col:3,dir:HORIZONTAL,len:2,spr:"car"},{row:2,col:3,dir:HORIZONTAL,len:2,spr:"orangeCar"},{row:3,col:2,dir:VERTICAL,len:2,spr:"car"},{row:3,col:3,dir:VERTICAL,len:2,spr:"car"},{row:3,col:4,dir:HORIZONTAL,len:2,spr:"car"},{row:4,col:4,dir:HORIZONTAL,len:2,spr:"car"},{row:5,col:2,dir:HORIZONTAL,len:3,spr:"truck"}],carsArray25=[{row:0,col:0,dir:HORIZONTAL,len:2,spr:"car"},{row:1,col:0,dir:HORIZONTAL,len:2,spr:"car"},{row:0,col:2,dir:VERTICAL,len:2,spr:"car"},{row:0,col:4,dir:HORIZONTAL,len:2,spr:"car"},{row:2,col:1,dir:HORIZONTAL,len:2,spr:"orangeCar"},{row:2,col:0,dir:VERTICAL,len:3,spr:"truck"},{row:2,col:4,dir:VERTICAL,len:2,spr:"car"},{row:3,col:1,dir:HORIZONTAL,len:3,spr:"truck"},{row:1,col:5,dir:VERTICAL,len:3,spr:"truck"},{row:4,col:1,dir:VERTICAL,len:2,spr:"car"},{row:4,col:3,dir:VERTICAL,len:2,spr:"car"},{row:4,col:4,dir:HORIZONTAL,len:2,spr:"car"},{row:5,col:4,dir:HORIZONTAL,len:2,spr:"car"}],carsArray26=[{row:0,col:0,dir:VERTICAL,len:2,spr:"car"},{row:0,col:1,dir:HORIZONTAL,len:2,spr:"car"},{row:0,col:3,dir:VERTICAL,len:3,spr:"truck"},{row:1,col:1,dir:HORIZONTAL,len:2,spr:"car"},{row:2,col:0,dir:HORIZONTAL,len:2,spr:"orangeCar"},{row:2,col:2,dir:VERTICAL,len:2,spr:"car"},{row:3,col:3,dir:HORIZONTAL,len:2,spr:"car"},{row:2,col:5,dir:VERTICAL,len:3,spr:"truck"},{row:4,col:2,dir:VERTICAL,len:2,spr:"car"},{row:5,col:3,dir:HORIZONTAL,len:3,spr:"truck"}],carsArray27=[{row:0,col:2,dir:HORIZONTAL,len:3,spr:"truck"},{row:0,col:5,dir:VERTICAL,len:2,spr:"car"},{row:1,col:1,dir:HORIZONTAL,len:2,spr:"car"},{row:2,col:1,dir:HORIZONTAL,len:2,spr:"orangeCar"},{row:1,col:4,dir:VERTICAL,len:3,spr:"truck"},{row:2,col:5,dir:VERTICAL,len:2,spr:"car"},{row:3,col:0,dir:HORIZONTAL,len:2,spr:"car"},{row:3,col:2,dir:HORIZONTAL,len:2,spr:"car"},{row:4,col:2,dir:VERTICAL,len:2,spr:"car"},{row:4,col:3,dir:HORIZONTAL,len:3,spr:"truck"},{row:5,col:3,dir:HORIZONTAL,len:3,spr:"truck"}];

var levelsArray = [carsArray1 ,carsArray2, carsArray3, carsArray4, carsArray5, carsArray6, carsArray7,carsArray8 ,carsArray9, carsArray10, carsArray11, carsArray12, carsArray13, carsArray14, carsArray15 ,carsArray16, carsArray17, carsArray18, carsArray19, carsArray20, carsArray21, carsArray22, carsArray23,carsArray24,carsArray25,carsArray26,carsArray27];

rushGame.rushGame = function () {};
rushGame.rushGame.prototype = {

    //****************************************PRELOAD*********************************************
    preload: function () {

        userStartPoint = 1;

        if (userStartPoint == 1){
            difficultyLevel = 0;
        }else if (userStartPoint == 2){
            difficultyLevel = 5;
        }else if(userStartPoint == 3){
            difficultyLevel = 10;
        }

        pauseState = false;
        levelNum = 1;
        levelData = "";
        gameIsOn = true; 
        gameDurationInSeconds = 210;   //3.5 minutes
        last10seconds = true
        stepCounter=0;
        restartBtnWasClicked = false;
        stepBackBtnWasClicked=false;
        timeIsOut = false;

        selectedPicName = chooseRandomPic(); //choosing a random picture for the end of game feedback

        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        game.load.image('timeWord', '../assets/allGames/sprites/timeWord.png');
        game.load.image('resumeGameBtn', '../assets/rushGame/sprites/resumeGameBtn.png');
        game.load.image('howToBtn', '../assets/rushGame/sprites/howToBtn.png');    
        game.load.image('startAgainBtn', '../assets/rushGame/sprites/startAgainBtn.png');
        game.load.image('backHomeBtn', '../assets/rushGame/sprites/backHomeBtn.png');    

        game.load.image('backHomePopup', '../assets/allGames/sprites/backHomePopup.png');    
        game.load.image('popupBtn', '../assets/allGames/sprites/popupBtn.png'); 

        game.load.spritesheet('pauseBtn', '../assets/allGames/spriteSheets/pausePlay.png', 40, 40);
        game.load.image('progressBarStroke', '../assets/allGames/sprites/timeBarStroke.png');    
    },

    //****************************************CREATE*********************************************

    create: function () {

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.world.setBounds(0, 0, 540, 960);

        btnSound = game.add.audio('btnSound');

        orangeBrickOutSound = game.add.audio('orangeBrickOut');
        orangeBrickOutSound.volume = 0.3;       

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
        // Create a delayed event 2m and 30s from now
        gameTimerEvent = gameTimer.add(Phaser.Timer.SECOND * gameDurationInSeconds, endTimer, this);
        // Start the timer
        gameTimer.start();

        timeWord = game.add.sprite(487.171, 72, 'timeWord');

        progressBar = game.add.graphics(11, 85);
        progressBar.beginFill(0xEB9A2C, 1);
        progressBar.drawRoundedRect(0, 0, 456, 12, 10);
        progressBarWidth = progressBar.width;

        progressBarStroke = game.add.sprite(10.5, 84, 'progressBarStroke');

        // creates a loop event for the progress bar
        progressBarLoop = game.time.events.loop(100, shrinkProgressBar, this);

        //          $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

        restarLevelBtn = game.add.button(8.494, 875, 'bottomBtn', restarLevelFunc);
        stepBackBtn = game.add.button(274.506, 875, 'bottomBtn', stepBackFunc);


        restarLevelBtn.onInputDown.add(function(){restarLevelBtn.frame = 1;}, restarLevelBtn);
        restarLevelBtn.onInputUp.add(function(){if(restartBtnWasClicked =! true){restarLevelBtn.frame = 0;}}, restarLevelBtn);


        stepBackBtn.onInputDown.add(function(){stepBackBtn.frame = 4;}, stepBackBtn);
        stepBackBtn.onInputUp.add(function(){if(stepBackBtnWasClicked != true){stepBackBtn.frame = 3;}}, stepBackBtn);         

        restarLevelBtn.frame = 2;  
        stepBackBtn.frame = 5; 

        bgFront = game.add.sprite(24, 270, 'bgFront');
        gameContainer = game.add.group();


        createlevel(difficultyLevel);


        gameContainer.add(progressBar);
        gameContainer.add(progressBarStroke);
        gameContainer.add(timeWord);
        gameContainer.add(restarLevelBtn);
        gameContainer.add(stepBackBtn);
        gameContainer.add(bgFront);
        gameContainer.sendToBack(bgFront);

        createPauseScreen();  

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
    },

    //****************************************UPDATE*********************************************

    update: function () {        
        if(stepCounter==0){
            restarLevelBtn.input.enabled = false;  
            stepBackBtn.input.enabled = false;
        } 
    }, 

    //**************************************** SHUTDOWN *********************************************

    shutdown: function () {

    }
};


function createlevel(difficulty){

    // game board, it's a 6x6 array, initially all its items are set to zero = empty;

    levelArray = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
    ];

    brickContainer = game.add.group();
    brickContainer.x=29;
    brickContainer.y=1500;

    console.log("difficulty: " + difficulty);

    for(var i = 0; i < levelsArray[difficulty].length; i++){
        // to keep the code clear, I assign carsArray[i] to a variable simply called "car"
        var car = levelsArray[difficulty][i];
        // looping through car length


        for(var j = 0; j < car.len; j++){

            // if the car is horizontal
            if(car.dir == HORIZONTAL){
                // setting levelArray items overlapped by the car to 1 (not empty);
                levelArray[car.row][car.col + j] = 1;
            }
            // if the car is vertical... (I know I could have used "else" but being a tutorial it looks better this way)
            if(car.dir ==  VERTICAL){
                // setting levelArray items overlapped by the car to 1 (not empty);
                levelArray[car.row + j][car.col] = 1;     
            }     
        }
        // adding the sprite representing the car
        // notice car direction (car.dir) is also involved in the placement.
        var carSprite = game.add.sprite(tileSize * car.col + tileSize * car.dir, tileSize * car.row, car.spr);

        if(car.spr=="orangeCar"){
            orangeCar = carSprite;
        }

        // car sprite will be rotated by 90 degrees if the car is VERTICAL and by 0 degrees if the car is HORIZONTAL
        carSprite.angle = 90 * car.dir;
        // Assigning to car sprite some custom data, adding them as an object. We'll store car position, direction and length
        carSprite.data = {
            row: car.row,
            col: car.col,
            dir: car.dir,
            len: car.len
        }
        // assigning a random color to the car
        //               carSprite.tint = carColors[game.rnd.between(0, carColors.length - 1)];
        // the car has input enabled
        carSprite.inputEnabled = true;
        // the car can be dragged
        carSprite.input.enableDrag();
        // the car will snap to a tileSize * tileSize grid but only when it's released
        carSprite.input.enableSnap(tileSize, tileSize, false, true);
        // when the car starts to be dragged, call startDrag funcion
        carSprite.events.onDragStart.add(startDrag);
        // when the car stops to be dragged, call stopDrag function
        carSprite.events.onDragStop.add(stopDrag);
        // if car direction is VERTICAL then prevent the sprite to be dragged horizontally
        if(car.dir == VERTICAL){
            carSprite.input.allowHorizontalDrag = false;
        }
        // if car direction is HORIZONTAL then prevent the sprite to be dragged vertically
        if(car.dir == HORIZONTAL){
            carSprite.input.allowVerticalDrag = false;     
        }
        brickContainer.add(carSprite);
    }


    brickMask = game.add.graphics(0, 274);
    brickMask.beginFill(0xffffff);
    brickMask.drawRect(0, 0, 540, 480);
    brickContainer.mask = brickMask;


    gameContainer.add(brickContainer);

    restarLevelBtn.input.enabled = false;
    stepBackBtn.input.enabled = false;

    restarLevelBtn.frame = 2;  
    stepBackBtn.frame = 5;

    if(restartBtnWasClicked != true){

        var brickTweenA =game.add.tween(brickContainer).to({y:274}, 1000, Phaser.Easing.Circular.Out, true, 0);
        //    brickTweenA.onComplete.add(activateStarTween, this);
    }else{
        brickContainer.y=274;
        restartBtnWasClicked =false;
        stepBackBtnWasClicked = false;

    }



}


//**************************************** startDrag *********************************************


// function to be called when a car is dragged. "s" is the reference of the car itself
function startDrag(s){

    startX= s.x;
    startY= s.y;
    currentBrick = s;
    // declaring some variables here because I am using them 
    var i;
    var from;
    var to;
    // if the car is horizontal...
    if(s.data.dir == HORIZONTAL){
        // from is the leftmost column occupied by the car
        from = s.data.col;
        // to is the rightmost column occupied by the car
        to = s.data.col + s.data.len - 1;
        // now we are going from the leftmost column backward until column zero, the first column
        for(i = s.data.col - 1; i >= 0; i --){
            // if it's an empty spot, then we update "from" position
            if(levelArray[s.data.row][i] == 0){
                from = i;
            }
            // otherwise we exit the loop
            else{
                break;
            }
        }
        // now we are going from the rightmost column forward until column five, the last column
        for(i = s.data.col + s.data.len; i < 6; i ++){
            // if it's an empty spot, then we update "to" position
            if(levelArray[s.data.row][i] == 0){
                to = i;
            }
            // otherwise we exit the loop
            else{
                break;
            }
        }
        // at this time, we assign the car a bounding box which will limit its movements. Think about it as a fence,
        // the car cannot cross the fence
        s.input.boundsRect = new Phaser.Rectangle(from * tileSize, s.y, (to - from + 1) * tileSize, tileSize);
    }
    // the same thing applies to verical cars, just remember this time they are rotated by 90 degrees
    if(s.data.dir == VERTICAL){
        from = s.data.row;
        to = s.data.row + s.data.len - 1;
        for(i = s.data.row - 1; i >= 0; i --){
            if(levelArray[i][s.data.col] == 0){
                from = i;
            }
            else{
                break;
            }
        }
        for(i = s.data.row + s.data.len; i < 6; i ++){
            if(levelArray[i][s.data.col] == 0){
                to = i;
            }
            else{
                break;
            }
        }
        s.input.boundsRect = new Phaser.Rectangle(s.x, from * tileSize, s.x + s.data.len * tileSize, (to - from + 2 - s.data.len) * tileSize);
    }

}


//**************************************** stopDrag *********************************************

// function to be called when a car is not dragged anymore. "s" is the reference of the car itself
function stopDrag(s){
    endX= s.x;
    endY= s.y;

    var distanceX = startX-endX;
    var distanceY = startY-endY;


    // if the brick was only clicked but not dragged;
    if(distanceX != 0 || distanceY != 0){
        stepCounter++; 
        restarLevelBtn.frame = 0;  
        stepBackBtn.frame = 3;
        restarLevelBtn.input.enabled = true;
        stepBackBtn.input.enabled = true;
        brickHitSound.play();
    }

    if (orangeCar.x >300){
        var carOut =game.add.tween(orangeCar).to({x:600}, 300,  Phaser.Easing.Linear.In, true, 0);
        orangeBrickOutSound.play();


        if(levelNum == lastLevel){
            addLevelData();
            carOut.onComplete.add(finishGame, this);
        }else{
            carOut.onComplete.add(nextLevel, this);    
        }
    }
    console.log(stepCounter);
    // here we just update levelArray items according to the car we moved.
    // first, we set to zero all items where the car was initially placed
    for(var i = 0; i < s.data.len; i ++){
        if(s.data.dir == HORIZONTAL){
            levelArray[s.data.row][s.data.col + i] = 0;
        }
        if(s.data.dir == VERTICAL){
            levelArray[s.data.row + i][s.data.col] = 0;    
        }
    }
    // then we set to 1 all items where the car is placed now
    if(s.data.dir == HORIZONTAL){
        s.data.col = s.x / tileSize;
        for(i = 0; i < s.data.len; i++){
            levelArray[s.data.row][s.data.col + i] = 1;     
        }
    }
    if(s.data.dir == VERTICAL){
        s.data.row = s.y / tileSize;
        for(i = 0; i < s.data.len; i++){
            levelArray[s.data.row + i][s.data.col] = 1;     
        } 
    }



}




//**************************************** BUTTONS *********************************************
function restarLevelFunc() {
    btnSound.play();
    restartBtnWasClicked = true;
    brickContainer.destroy()
    createlevel(difficultyLevel);

    stepCounter=0;
}

function stepBackFunc() {
    btnSound.play();

    stepBackBtnWasClicked = true;
    stepBackBtn.input.enabled = false;
    stepBackBtn.frame = 5;

    if(stepCounter==1){
        restarLevelBtn.input.enabled = false;
        restarLevelBtn.frame =2;
    }

    currentBrick.x = startX;
    currentBrick.y = startY;

    for(var i = 0; i < currentBrick.data.len; i ++){
        if(currentBrick.data.dir == HORIZONTAL){
            levelArray[currentBrick.data.row][currentBrick.data.col + i] = 0;
        }
        if(currentBrick.data.dir == VERTICAL){
            levelArray[currentBrick.data.row + i][currentBrick.data.col] = 0;    
        }
    }
    // then we set to 1 all items where the car is placed now
    if(currentBrick.data.dir == HORIZONTAL){
        currentBrick.data.col = currentBrick.x / tileSize;
        for(i = 0; i < currentBrick.data.len; i++){
            levelArray[currentBrick.data.row][currentBrick.data.col + i] = 1;     
        }
    }
    if(currentBrick.data.dir == VERTICAL){
        currentBrick.data.row = currentBrick.y / tileSize;
        for(i = 0; i < currentBrick.data.len; i++){
            levelArray[currentBrick.data.row + i][currentBrick.data.col] = 1;     
        } 
    }

    stepCounter--;  
}

//****************************************NEXT LEVEL*********************************************

function nextLevel(){
    restarLevelBtn.input.enabled = false;
    stepBackBtn.input.enabled = false;

    levelNum++;
    difficultyLevel++;
    levelText.text = 'שלב ' + lastLevel + ' / ' + levelNum; 

    game.world.bringToTop(header);
    addLevelData();

    star = game.add.sprite(0, 0, 'star');
    starLines = game.add.sprite(0, 0, 'starLines');
    starLines.alpha = 0;

    nextLevelText = game.add.text(130, 120, '', {fontSize: '30px', font: 'Heebo', fill: '#fff'});
    nextLevelText.text = "שלב " + levelNum;

    nextLevelContainer = game.add.group();

    nextLevelContainer.add(star);
    nextLevelContainer.add(starLines);
    nextLevelContainer.add(nextLevelText);

    nextLevelContainer.x = 100;
    nextLevelContainer.y = 1500;
    nextLevelContainer.mask = brickMask;

    gameContainer.add(nextLevelContainer);

    game.world.bringToTop(pauseBtn);
    game.world.bringToTop(pauseText);
    game.world.bringToTop(levelText);  
    game.world.bringToTop(brickContainer);

    game.add.tween(restarLevelBtn).to({y:1000}, 700, Phaser.Easing.Circular.Out, true, 300);
    game.add.tween(stepBackBtn).to({y:1000}, 700, Phaser.Easing.Circular.Out, true, 300);

    var brickTweenA =game.add.tween(brickContainer).to({y:-500}, 1000, Phaser.Easing.Circular.Out, true, 0);
    brickTweenA.onComplete.add(activateStarTween, this);

    function activateStarTween(){
        starSound.play();
        var starTweenA = game.add.tween(nextLevelContainer).to({y:380}, 1000, Phaser.Easing.Circular.Out, true, 0);
        starTweenA.onComplete.add(activateStarTweenB, this);

        restarLevelBtn.enabled=false;
        stepBackBtn.enabled=false;

        restarLevelBtn.frame=2;
        stepBackBtn.frame=5;

        game.add.tween(restarLevelBtn).to({y:875}, 700, Phaser.Easing.Circular.Out, true, 3000);
        game.add.tween(stepBackBtn).to({y:875}, 700, Phaser.Easing.Circular.Out, true, 3000);
    }
}

//****************************************ADD LEVEL DATA*********************************************

function addLevelData(){
    // get current data 
    levelData = '{"countPerLevel":' + stepCounter + ',"errorsPerLevel":' + 0 + '},';

    // add the data to the full JSON string
    sessionData += levelData;
    stepCounter = 0;

    //    if(levelNum != lastLevel){
    //        levelNum++;
    //        console.log("difficulty-before:" + difficultyLevel)
    //        difficultyLevel++;
    //        console.log("difficulty-after:" + difficultyLevel)
    //
    //        levelText.text = 'שלב ' + lastLevel + ' / ' + levelNum;            
    //    }
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
    backHomeBtn = game.add.button(86, 530, 'backHomeBtn', areYouSure);

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
    //    window.location ="../../homePage.html"
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
    game.state.start('rushGameTutorial');
}


//****************************************END OF GAME*****************************************

function Finish(state) {
    if (state == "finishGame") {
        levelData = '{"countPerLevel":' + 0 + ', "errorsPerLevel":' + 0 + '},';
        sessionData += levelData;
    }

    sessionData = sessionData.substring(0, sessionData.length - 1);
    sessionData += "]}}"

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
        timeIsOut = true;
    } else {
        gameIsOn = false;
        endGameProgressBarWidth = progressBar.width;
    }
    function changeState() {
        game.state.start('rushGameEndGame');
    }
}

//************************************************ TIME OUT SCREEN **************************************************
function timeOut() {
    Finish("timeOut");
}

//****************************************FINISH GAME SCREEN *********************************************

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
    if(picsArray.length>0){
        var picNum = getRandomNumber(0, picsArray.length-1);
        return picsArray[picNum];
    }else{
        var picName = "default.jpg"
        return picName;
    }
}