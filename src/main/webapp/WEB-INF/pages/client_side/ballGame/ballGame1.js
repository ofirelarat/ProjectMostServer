var ballGame = {}, gameID = "1", currentBall, sliderBtn, slider, centerX = 540/2, centerY = 960/2, graphics, ballBgFront, topWall, bottomWall, rightWall, leftWall, rightGate, leftGate, velocity, errors, gateWidth, levelBallsNum, levelNum, nextLevelText, balls, userID, time, 
sessionData, levelData, lastLevel = 3, currentdate, gameTimer, gameTimerEvent, picsJSONstructure, gameDurationInSeconds, progressBar, progressBarStroke, progressBarLoop, progressBarWidth, endGameProgressBarWidth, pauseState, pauseBtn, gameContainer, pauseContainer, resumeGameBtn, howToBtn, startAgainBtn, backHomeBtn, picsArray= ["pic1.jpg", "pic2.jpg", "pic3.jpg"], selectedPicName, timeWord, header, star, nextLevelContainer, starLines, timeIsOut = false, levelText, pauseText, ballIcon1, ballIcon2, ballIcon3, catchedBallsCounter = 0, ballIconsArray = [], gateMask, currentBallIsAlive, levelTextMask, last10seconds;

WebFontConfig = {

    //  load Google Font
    google: {
      families: ['Heebo']
    }

};

ballGame.ballGame1 = function () {};
ballGame.ballGame1.prototype = {
    
//****************************************PRELOAD*********************************************

   preload: function () {
    
   pauseState = false;
   errors = 0;
   velocity = 300;
   errors = 0;
   gateWidth = 130;
   catchedBallsCounter = 0
   levelBallsNum = 0;
   levelNum = 1;
   sessionData = "";
   levelData = "";
   gameIsOn = true; 
   currentdate = new Date();
   picsJSONstructure = "";
   gameDurationInSeconds = 100;   
      last10seconds = true
        
    selectedPicName = chooseRandomPic(); //choosing a random picture for the end of game feedback
        
    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
       
    game.load.image('timeWord', '../assets/allGames/sprites/timeWord.png');
    game.load.image('resumeGameBtn', '../assets/ballGame/sprites/resumeGameBtn.png');
    game.load.image('howToBtn', '../assets/ballGame/sprites/howToBtn.png');    
    game.load.image('startAgainBtn', '../assets/ballGame/sprites/startAgainBtn.png');
    game.load.image('backHomeBtn', '../assets/ballGame/sprites/backHomeBtn.png');    
        
    game.load.spritesheet('pauseBtn', '../assets/allGames/spriteSheets/pausePlay.png', 40, 40);
   
//    fromServer();
        
    },
    
//****************************************CREATE*********************************************
    
        create: function () {
            
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.world.setBounds(0, 0, 540, 960);
        
            
            btnSound = game.add.audio('btnSound');
            hitGateSound = game.add.audio('hitGateSound');
            hitWallsSound = game.add.audio('hitWallsSound'); 
            hitWallsSound.volume = 0.1;

            
         // adding pics to the stage
        var ballBgTop = game.add.sprite(0, 65, 'ballBg');
            ballBgTop.frame = 0;
        var ballBgBottom = game.add.sprite(0, 512, 'ballBg');
            ballBgBottom.frame = 1;
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
            
            rightGate = game.add.sprite(240, 710, 'rightGate');
            rightGate.frame = 0; //setting the specific frame of the spriteSheet
            leftGate = game.add.sprite(-350, 710, 'leftGate');
            leftGate.frame = 0;
            leftGate.anchor.setTo(1, 0);
            ballBgFront = game.add.sprite(0, 65, 'ballFrontBg');
            
            slider = game.add.sprite(30, 890, 'slider');
            
            sliderBtn = game.add.sprite(centerX, 895, 'sliderBtn');
            sliderBtn.anchor.setTo(0.5, 0.5); //setting the anchor point to the middle of the shape
            sliderBtn.frame = 0; 
            
            topWall = game.add.sprite(30, 143, 'topBottomWall');
            bottomWall = game.add.sprite(0, 890, 'topBottomWall');
            rightWall = game.add.sprite(30, 143, 'rightLeftWall');
            leftWall = game.add.sprite(510, 143, 'rightLeftWall');
            bottomWall.scale.setTo(1.2, 1);

            balls = game.add.group(); //create balls group
            
            ballIcon1 = game.add.sprite(43.5, 786, 'ballsIcon');
            ballIcon2 = game.add.sprite(84.514, 786, 'ballsIcon');
            ballIcon3 = game.add.sprite(125.533, 786, 'ballsIcon');
            ballIcon1.alpha = 0;
            ballIcon2.alpha = 0;
            ballIcon3.alpha = 0;
            ballIcon1.frame = 0;
            ballIcon2.frame = 0;
            ballIcon3.frame = 0;
            
            ballIconsArray = [ballIcon1, ballIcon2, ballIcon3];
            
            game.physics.enable([topWall, leftWall, bottomWall, rightWall, rightGate, leftGate, sliderBtn], Phaser.Physics.ARCADE);

            topWall.body.immovable = true;
            leftWall.body.immovable = true;
            bottomWall.body.immovable = true;
            rightWall.body.immovable = true;        
            rightGate.body.immovable = true;        
            leftGate.body.immovable = true;    
            
            gateMask = game.add.graphics(30, 710);
            gateMask.beginFill(0xffffff);
            gateMask.drawRoundedRect(0, 0, 483, 50, 7);
            rightGate.mask = gateMask;
            leftGate.mask = gateMask;
            
            pauseBtn = game.add.button(11, 11, 'pauseBtn', togglePause); 
            pauseBtn.frame = 0; //setting the specific frame of the spriteSheet
            pauseBtn.onInputDown.add(tint,pauseBtn);
            pauseBtn.onInputUp.add(unTint,pauseBtn);
          
            //slider btn moves when dragging it
            sliderBtn.inputEnabled = true;
            sliderBtn.input.start(0, true);
            sliderBtn.input.enableDrag(false, true, true);
            sliderBtn.events.onDragStart.add(onDragStart, this);
            sliderBtn.events.onDragStop.add(onDragStop, this);
          
            
             // Create a custom timer
            gameTimer = game.time.create();

            // Create a delayed event 2m and 30s from now
            gameTimerEvent = gameTimer.add(Phaser.Timer.SECOND * gameDurationInSeconds, endTimer, this);
            
            // Start the timer
            gameTimer.start();
            
            timeWord = game.add.sprite(487.171, 72, 'timeWord');
            
            progressBar = game.add.graphics(11, 85);
//           progressBar.lineStyle(3, 0x874e9b, 1);
            progressBar.beginFill(0x874e9b, 1);
            progressBar.drawRoundedRect(0, 0, 456, 12, 7);
            progressBarWidth = progressBar.width;

            progressBarStroke = game.add.graphics(11, 85);
            progressBarStroke.lineStyle(3, 0x000000, 0.5);
            progressBarStroke.drawRoundedRect(0, 0, 456, 12, 7);
            
            // creates a loop event for the progress bar
            progressBarLoop = game.time.events.loop(100, shrinkProgressBar, this);

            gameContainer = game.add.group();
            gameContainer.add(rightGate);
            gameContainer.add(leftGate);
            gameContainer.add(ballBgFront);
            gameContainer.add(balls);
            gameContainer.add(slider);
            gameContainer.add(sliderBtn);
            gameContainer.add(topWall);
            gameContainer.add(bottomWall);
            gameContainer.add(rightWall);
            gameContainer.add(leftWall);
            gameContainer.add(progressBar);
            gameContainer.add(progressBarStroke);
            gameContainer.add(timeWord);
            gameContainer.add(ballIcon1);
            gameContainer.add(ballIcon2);
            gameContainer.add(ballIcon3);
            gameContainer.add(gateMask);
            
            createPauseScreen();
            
            currentBall = createBall();           
            
        },
     
//****************************************UPDATE*********************************************
    
    update: function () {
     
     game.physics.arcade.collide(balls, [topWall, rightWall, leftWall, balls], ballHitsWalls, null, this); //ball collides with walls
     game.physics.arcade.collide(balls, [rightGate,leftGate], ballHitsGate, null, this); //ball collides with gate    
  
        if (gameIsOn){
                game.physics.arcade.collide(balls, bottomWall, catchBall, null, this); 
        }
        
       sliderMovement(); 
       gateMovement();
        
    }, 
    
  //**************************************** SHUTDOWN *********************************************
   
   shutdown: function () {
   }
};


//****************************************CREATE BALL*********************************************

function createBall(){
    var newBall;
    levelBallsNum++;

    //randomizes the starting x point of the ball
var ballX = getRandomNumber(70, 470);
    newBall = game.add.sprite(ballX, 143, 'ball');
    game.physics.enable(newBall, Phaser.Physics.ARCADE);

    newBall.body.bounce.set(1);
    
    //randomizes the ball's movement direction (right/left)
    var randomVel = getRandomNumber(0, 1);
    if (randomVel == 0){
            newBall.body.velocity.x = velocity;
    }else{
            newBall.body.velocity.x = -velocity;
    }
    
    newBall.body.velocity.y = velocity;
    balls.add(newBall); //adding the new ball to the balls group
    
   gameContainer.bringToTop(ballBgFront); 
   gameContainer.bringToTop(slider); 
   gameContainer.bringToTop(sliderBtn); 
   gameContainer.bringToTop(progressBar); 
   gameContainer.bringToTop(progressBarStroke); 
   gameContainer.bringToTop(timeWord);
    
    currentBallIsAlive = true;
    
    return newBall;
}

//****************************************CATCH BALL*********************************************

function catchBall(){
  
    
   catchedBallsCounter++; 
  var ballIconTween = game.add.tween(ballIconsArray[catchedBallsCounter-1]).to({alpha:1}, 500, Phaser.Easing.Linear.In, true, 0, 0, false);
    
   currentBall.kill();
   currentBallIsAlive = false;

    if((levelNum == lastLevel) && (catchedBallsCounter == 3)){
          addLevelData();
          finishGame();
    }else{
             if(catchedBallsCounter == 3){
                     ballIconTween.onComplete.add(nextLevel, this);
              }else{
               currentBall = createBall();
            } 
    }
}

//****************************************BALL HITS WALLS*********************************************

function ballHitsWalls(){
    hitWallsSound.play();
}

//****************************************BALL HITS GATE*****************************************

    function ballHitsGate(){
        
    if (rightGate.body.touching.up == true || leftGate.body.touching.up == true){    
    errors++;
//    console.log("errors: " + errors);
    rightGate.frame = 1; //make the gate red when ball touches it
    leftGate.frame = 1;    
    hitGateSound.play();
    // a TimerEvent that turns the gate back to brown after 300 ms
    gameTimer.add(300, function(){
        rightGate.frame = 0;
        leftGate.frame =0;    
    }, this);

     if (catchedBallsCounter != 0){       
         killBalls();
     }
   }
}

//****************************************KILL BALLS*********************************************
function changeBallColors(){
           ballIcon1.frame = getRandomNumber(1, 5);
           ballIcon2.frame = getRandomNumber(1, 5);
           ballIcon3.frame = getRandomNumber(1, 5); 
}

function killBalls(){
     
    if(catchedBallsCounter == 3){
            game.time.events.repeat(300, 5, changeBallColors, this);   
        
        for (var i = 0; i < catchedBallsCounter; i++){
            game.add.tween(ballIconsArray[i]).to({alpha:0}, 500, Phaser.Easing.Linear.In, true, 2000, 0, false);
         }
        
    game.time.events.add(2000, function(){
           ballIcon1.frame = 0;
           ballIcon2.frame = 0;
           ballIcon3.frame = 0;
    })
        
    }else{
        
         for (var i = 0; i < catchedBallsCounter; i++){
            game.add.tween(ballIconsArray[i]).to({alpha:0}, 500, Phaser.Easing.Linear.In, true, 0, 0, false);
       }  
    }
    catchedBallsCounter = 0;


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

//****************************************SLIDER AND GATE MOVEMENT***********************************

function sliderMovement(){
   if (sliderBtn.y != 895){
            sliderBtn.y = 895
        }
    
    if (sliderBtn.x > 500){
       sliderBtn.x = 500  
    }else if( sliderBtn.x < 40){
        sliderBtn.x = 40
    }
}


function gateMovement(){
    rightGate.x = sliderBtn.x + (gateWidth / 2);
    leftGate.x = sliderBtn.x - (gateWidth / 2);
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

//****************************************ON DRAG START *********************************************
function onDragStart(){
     sliderBtn.frame = 1; 
}

//****************************************ON DRAG STOP *********************************************
function onDragStop(){
     sliderBtn.frame = 0; 
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
           
           if(currentBallIsAlive == false){
                currentBall = createBall();   
           }
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