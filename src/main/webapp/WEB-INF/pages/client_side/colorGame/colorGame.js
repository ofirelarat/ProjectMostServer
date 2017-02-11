var colorGame = {}, gameID = "2", centerX = 540/2, centerY = 960/2, graphics, ballBgFront, errors, levelNum, nextLevelText, userID, time, 
sessionData, levelData, lastLevel = 3, currentdate, gameTimer, gameTimerEvent, picsJSONstructure, gameDurationInSeconds, progressBar, progressBarStroke, progressBarLoop, progressBarWidth, endGameProgressBarWidth, pauseState, pauseBtn, gameContainer, pauseContainer, resumeGameBtn, howToBtn, startAgainBtn, backHomeBtn, picsArray= ["pic1.jpg", "pic2.jpg", "pic3.jpg"], selectedPicName, timeWord, header, star, nextLevelContainer, starLines, timeIsOut = false, levelText, pauseText, levelTextMask, last10seconds, meaningTextbox, NoBtn, yesBtn, card;

var colorsArray, difficultyLevel, selectedMeaningLocation, selectedColorLocation, isMatch, meaning_text, meaning_color, color_text, color_color;
    
    
var roundsCounter = 0;
var correctsCounter = 0;



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
   errors = 0;
   levelNum = 1;
   sessionData = "";
   levelData = "";
   gameIsOn = true; 
   currentdate = new Date();
   picsJSONstructure = "";
   gameDurationInSeconds = 100;   
   last10seconds = true
   colorsArray = [["כחול", "0x0000ff"], ["אדום", "0xff0000"], ["צהוב", "0xf8c101"], ["ירוק", "0x00ff00"]];
   difficultyLevel = 1;
    
    
    
    selectedPicName = chooseRandomPic(); //choosing a random picture for the end of game feedback
        
    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
       
    game.load.image('timeWord', '../assets/allGames/sprites/timeWord.png');
    game.load.image('resumeGameBtn', '../assets/colorGame/sprites/resumeGameBtn.png');
    game.load.image('howToBtn', '../assets/colorGame/sprites/howToBtn.png');    
    game.load.image('startAgainBtn', '../assets/colorGame/sprites/startAgainBtn.png');
    game.load.image('backHomeBtn', '../assets/colorGame/sprites/backHomeBtn.png');    
        
    game.load.spritesheet('pauseBtn', '../assets/allGames/spriteSheets/pausePlay.png', 40, 40);
   
       
    //-------------------------------move to tutorial---------------------------------------
    game.load.spritesheet('colorBg', '../assets/colorGame/backgrounds/bg.jpg', 540, 447.5);
    game.load.image('tutorialHeader', '../assets/colorGame/backgrounds/TutorialHeader.png');
    game.load.image('header', '../assets/colorGame/backgrounds/header.jpg');

    game.load.image('skipBtn', '../assets/allGames/sprites/skipBtn.png');
    game.load.image('star', '../assets/colorGame/sprites/star.png');    
    game.load.image('starLines', '../assets/allGames/sprites/star_lines.png');
    game.load.image('letsStart', '../assets/allGames/sprites/letsStart.png');
    game.load.image('card', '../assets/colorGame/sprites/card.png');
    
    game.load.spritesheet('yesNoBtn', '../assets/colorGame/spriteSheets/yesNoBtn.png', 250, 100);
    game.load.spritesheet('gameTooltips', '../assets/colorGame/spriteSheets/gameTooltips.png', 190, 100);

    game.load.spritesheet('startGameBtn', '../assets/colorGame/spriteSheets/startGameBtn.png', 220.015, 220.015);
        
//    game.load.audio('btnSound', '../assets/ballGame/sounds/pressBtn.wav'); 
//    game.load.audio('hitWallsSound', '../assets/ballGame/sounds/hitWallsSound.mp3'); 
//    game.load.audio('hitGateSound', '../assets/ballGame/sounds/hitGateSound.mp3'); 
       
       //---------------------------------------------------------------------------------------------
       
       
//    fromServer();
        
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
        var colorBgTop = game.add.sprite(0, 65, 'colorBg');
            colorBgTop.frame = 0;
        var colorBgBottom = game.add.sprite(0, 512, 'colorBg');
            colorBgBottom.frame = 1;
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
            
//            game.physics.enable([topWall, leftWall, bottomWall, rightWall, rightGate, leftGate, sliderBtn], Phaser.Physics.ARCADE);

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
            progressBar.beginFill(0x685d5e, 1);
            progressBar.drawRoundedRect(0, 0, 456, 12, 7);
            progressBarWidth = progressBar.width;

            progressBarStroke = game.add.graphics(11, 85);
            progressBarStroke.lineStyle(3, 0x000000, 0.5);
            progressBarStroke.drawRoundedRect(0, 0, 456, 12, 7);
            
            // creates a loop event for the progress bar
            progressBarLoop = game.time.events.loop(100, shrinkProgressBar, this);

            noBtn = game.add.button(12.915, 847, 'yesNoBtn', noBtnFunc);
            noBtn.frame = 1;
            yesBtn = game.add.button(276.905, 847, 'yesNoBtn', yesBtnFunc); 
            yesBtn.frame = 3;
            noBtn.onInputDown.add(function(){noBtn.frame = 0;}, noBtn);
            noBtn.onInputUp.add(function(){noBtn.frame = 1;}, noBtn);
            yesBtn.onInputDown.add(function(){yesBtn.frame = 2;}, yesBtn);
            yesBtn.onInputUp.add(function(){yesBtn.frame = 3;}, yesBtn);
            
            meaningTooltip = game.add.sprite(174.91, 214, 'gameTooltips');
            meaningTooltip.frame = 1;
            colorTooltip = game.add.sprite(174.91, 703, 'gameTooltips');
            colorTooltip.frame = 0;

            card = game.add.sprite(centerX, 498, 'card');
            card.anchor.set(0.5);
            
            gameContainer = game.add.group();
            gameContainer.add(progressBar);
            gameContainer.add(progressBarStroke);
            gameContainer.add(timeWord);
            gameContainer.add(noBtn);
            gameContainer.add(yesBtn);
            gameContainer.add(meaningTooltip);
            gameContainer.add(colorTooltip);
                       
            createPauseScreen();
            createCard(difficultyLevel);

        
        },
     
//****************************************UPDATE*********************************************
    
    update: function () {
     
     
        
    }, 
    
  //**************************************** SHUTDOWN *********************************************
   
   shutdown: function () {
       
   }
};


//****************************************CREATE CARD*********************************************
function createCard(currentlevel) {
    //---top part---
    selectedMeaningLocation = getRandomNumber(0, colorsArray.length - 1);
    meaning_text = colorsArray[selectedMeaningLocation][0];
    //sets the text color according to the current level
    if (currentlevel != 3) {
        meaning_color = "0x000000";
    } else {
        meaning_color = colorsArray[getRandomNumber(0, colorsArray.length - 1)][1];
    }

    //---bottom part---
    selectedColorLocation = getRandomNumber(0, colorsArray.length - 1);
    color_color = colorsArray[selectedColorLocation][1];
    color_text = colorsArray[getRandomNumber(0, colorsArray.length - 1)][0];

    //---checks if it's a match---
    if (selectedMeaningLocation == selectedColorLocation) {
        isMatch = true;
    } else {
        isMatch = false;
    }

    // ---add meaning part content to card---
      meaningTextbox = game.add.text(centerX, 420, '', {fontSize: '55px', fontWeight: '800', fill: meaning_color, font: 'Heebo'});
      meaningTextbox.text = meaning_text;
      meaningTextbox.anchor.set(0.5);

    // ---add color part content to card---
    if (currentlevel == 1) {
        //--add as color circle--
     var colorCircle = game.add.graphics(centerX, 580);
        colorCircle.beginFill(color_color);
        colorCircle.drawCircle(0, 0, 70);
        colorCircle.anchor.set(0.5);
        
    } else {
        //--add as colored word--
                
       var colorTextbox = game.add.text(centerX, 580, '', {fontSize: '55px', fontWeight: 'bold', fill: color_color, font: 'Heebo'});
       colorTextbox.text = meaning_text;
       colorTextbox.anchor.set(0.5);

    }
}


//yes/no buttons functions
function yesBtnFunc() {
    if (isMatch == true) {
        correctFeedback();
    } else {
        errorFeedback();
    }
}

function noBtnFunc() {
    if (isMatch == false) {
        correctFeedback();
    } else {
        errorFeedback();
    }
}



//****************************************NEXT LEVEL*********************************************

function nextLevel(){
    
           
    
   game.world.bringToTop(header);

   //kills the "3 balls"
   killBalls();
   currentBallIsAlive = false;

  //increasing the difficulty level
   if (levelNum % 2 == 0){
       velocity = velocity * 1.1;   
   }else{
       gateWidth = gateWidth * 0.9;   
   }
       
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
   
       gameContainer.add(nextLevelContainer);
    
       gameContainer.bringToTop(ballBgFront); 
       gameContainer.bringToTop(slider); 
       gameContainer.bringToTop(sliderBtn); 
       gameContainer.bringToTop(progressBar); 
       gameContainer.bringToTop(progressBarStroke); 
       gameContainer.bringToTop(timeWord);
    
       game.world.bringToTop(gameContainer);
       game.world.bringToTop(header);
       game.world.bringToTop(pauseBtn);
       game.world.bringToTop(pauseText);
       game.world.bringToTop(levelText);
   
   
    var starTweenA =game.add.tween(nextLevelContainer).to({y:300}, 1000, Phaser.Easing.Circular.Out, true, 100);
    starTweenA.onComplete.add(activateStarTweenB, this);
   
}

//****************************************ADD LEVEL DATA*********************************************

function addLevelData(){
    // get current data 
    levelData = '{"errorsPerLevel":' + errors + ',"ballsPerLevel":' + levelBallsNum + '},' 
    // add the data to the full JSON string
    sessionData += levelData;
    
    errors = 0;
    levelBallsNum = 0;
        if(levelNum != lastLevel){
        levelNum++;
        levelText.text = 'שלב ' + lastLevel + ' / ' + levelNum;            

        }
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
    game.state.start('ballGameCountDown');
    
}

function backHome(){
    gameIsOn = false;
    console.log("go to home page");
}

function startTutorial(){
    gameTimer.resume();
    game.time.events.resume();
    gameIsOn = false;
    game.state.start('ballGameTutorial');
}

//****************************************END OF TIME SCREEN*****************************************

    function timeOut() {

        timeIsOut = true;
        currentBall.body.velocity = 0;
 
        game.world.add(progressBarStroke);
        game.world.add(timeWord);
        
        pauseText.alpha = 0;
        game.add.tween(levelText).to({alpha:0}, 1000, Phaser.Easing.Linear.In, true, 500, 0, false);
        game.add.tween(pauseBtn).to({alpha:0}, 1000, Phaser.Easing.Linear.In, true, 500, 0, false);
        var containerTween = game.add.tween(gameContainer).to({alpha:0}, 1000, Phaser.Easing.Linear.In, true, 500, 0, false); 
        containerTween.onComplete.add(goToTimeOutScreen, this);
        
        function goToTimeOutScreen(){

        game.state.start('ballGameEndGame');
            
        }
    }

//****************************************FINISH GAME*********************************************

function finishGame(){
            sessionData = sessionData.substring(0, sessionData.length-1);
            sessionData += "]}}"     
            //sessionData = eval ("(" + sessionData + ")");

            $.post("getData.aspx",
        {
            JSONsessionData: sessionData
        },
        function (data, status) {
            alert("Data: " + data + "\nStatus: " + status);
        });

       gameIsOn = false;
    
       endGameProgressBarWidth = progressBar.width;
   
       game.world.add(progressBarStroke);
       game.world.add(progressBar);
       game.world.add(timeWord);
    
        pauseText.alpha = 0;
        game.add.tween(levelText).to({alpha:0}, 1000, Phaser.Easing.Linear.In, true, 500, 0, false);
        game.add.tween(pauseBtn).to({alpha:0}, 1000, Phaser.Easing.Linear.In, true, 500, 0, false);
        var containerTween = game.add.tween(gameContainer).to({alpha:0}, 1000, Phaser.Easing.Linear.In, true, 500, 0, false);  
        containerTween.onComplete.add(endGameScreen, this);
        
    
        function endGameScreen(){
            
        game.state.start('ballGameEndGame');
            
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
        var picNum = getRandomNumber(0, picsArray.length-1);
        return picsArray[picNum];
    }

//****************************************FROM SERVER*********************************************

function fromServer() {
  
//preparing to call server side page
var xmlhttp = new XMLHttpRequest();

   //PLEASE VERIFY THAT PORT NUMBER IS CORRECT	
      //*****************************************************************
       
var url = "http://localhost:60290/ballGame/gameLogin.aspx";
       
//      *****************************************************************
       
xmlhttp.onreadystatechange = function () {
  
// וידוא שניתן לקרוא את הפונקציה
if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    myFunction(xmlhttp.responseText);
}
}

xmlhttp.open("GET", url, true);
xmlhttp.send();

//this function retreives information received from server side
//received information is inside 'response'

function myFunction(response) {
           
   myJSON = eval("(" + response + ")");
//   console.log(myJSON);

   //preparing from received information a table

   userID = myJSON.userID;
   gameID = myJSON.gameID;

   //creats the array of pictures names - to use in feedbacks
   for (var i = 0; i < myJSON.userPics.length; i++) {
       picsArray.push(myJSON.userPics[i].picName)
   }

   //creates the structure to return at the end of the game
   for (var j = 0; j < picsArray.length; j++) {
      // alert(picsJSONstructure)
     picsJSONstructure += '{"picName":"' + picsArray[j] +'"},';
     }
    picsJSONstructure = picsJSONstructure.substring(0, picsJSONstructure.length - 1);

               // creat new JSON structure
                time = "'" + currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " - " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds() + "'";
                sessionData = '{ "gameID" :' + gameID + ',"userID" :' + userID + ',"time":' + time + ',"userPics" :[' + picsJSONstructure + '],"data": {"levels":[';

    }
}


//****************************************enterFullScreen *********************************************

function enterFullScreen() {
      document.documentElement.webkitRequestFullscreen();
}