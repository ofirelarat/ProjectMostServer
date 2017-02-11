var tapToContinue, tapToContinueText, ballBgTop, ballBgBottom, rightGate, leftGate, sliderBtn, ball, gateMask, gateWidth = 130, tutorialProgessCounter, tooltip1, tooltip2, tooltip3, tooltip4, tooltip5, tooltip6, tooltip7, arrow, tutorialHeader, gameHeader, gateColorTimer, ballIcon1, ballIcon2, ballIcon3, sliderBtnStrokeTween, skipBtn, star, starLines, wellDoneText, nextLevelContainer, gameIsOn = false, letsStart, startGameBtn, needTapToContinueText = false, tapToContinueTimer, screenPatch, btnSound,hitGateSound, hitWallsSound;


colorGame.colorGameTutorial = function () {};
colorGame.colorGameTutorial.prototype = {
    
//****************************************PRELOAD*********************************************

    preload: function () {
    tutorialProgessCounter = 1;
    
    game.load.spritesheet('ballBg', '../assets/ballGame/backgrounds/bg.jpg', 540, 447.5);
    game.load.image('tutorialHeader', '../assets/ballGame/backgrounds/TutorialHeader.png');
    game.load.image('header', '../assets/ballGame/backgrounds/header.jpg');
    game.load.image('ballFrontBg', '../assets/ballGame/backgrounds/bgFront.png');
    game.load.image('ball', '../assets/ballGame/sprites/ball.png');
    game.load.image('slider', '../assets/ballGame/sprites/slider.png');
    game.load.image('topBottomWall', '../assets/ballGame/sprites/topBottomWall.png');
    game.load.image('rightLeftWall', '../assets/ballGame/sprites/rightLeftWall.png');    
    game.load.spritesheet('ballsIcon', '../assets/ballGame/spriteSheets/ballsIcon.png', 25, 25);
    game.load.image('tooltip1', '../assets/ballGame/sprites/tooltip1.png');
    game.load.image('tooltip2', '../assets/ballGame/sprites/tooltip2.png');
    game.load.image('tooltip3', '../assets/ballGame/sprites/tooltip3.png');
    game.load.image('tooltip4', '../assets/ballGame/sprites/tooltip4.png');
    game.load.image('tooltip5', '../assets/ballGame/sprites/tooltip5.png');
    game.load.image('tooltip6', '../assets/ballGame/sprites/tooltip6.png');
    game.load.image('tooltip7', '../assets/ballGame/sprites/tooltip7.png');
    game.load.image('arrow', '../assets/ballGame/sprites/arrow.png');
    game.load.image('skipBtn', '../assets/allGames/sprites/skipBtn.png');
    game.load.image('star', '../assets/ballGame/sprites/star.png');    
    game.load.image('starLines', '../assets/allGames/sprites/star_lines.png');
    game.load.image('letsStart', '../assets/allGames/sprites/letsStart.png');
    game.load.image('screenPatch', '../assets/ballGame/sprites/screenPatch.png');

    game.load.spritesheet('rightGate', '../assets/ballGame/spriteSheets/rightGate.png', 480, 7);
    game.load.spritesheet('leftGate', '../assets/ballGame/spriteSheets/leftGate.png', 480, 7);
    game.load.spritesheet('sliderBtn', '../assets/ballGame/spriteSheets/sliderBtn.png', 90, 90);
    game.load.spritesheet('startGameBtn', '../assets/ballGame/spriteSheets/startGameBtn.png', 220.015, 220.015);
        
    game.load.audio('btnSound', '../assets/ballGame/sounds/pressBtn.wav'); 
    game.load.audio('hitWallsSound', '../assets/ballGame/sounds/hitWallsSound.mp3'); 
    game.load.audio('hitGateSound', '../assets/ballGame/sounds/hitGateSound.mp3'); 
    },
    
//****************************************CREATE*********************************************
    
        create: function () {
           game.physics.startSystem(Phaser.Physics.ARCADE);
           game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
           game.world.setBounds(0, 0, 540, 960);
            
            btnSound = game.add.audio('btnSound');
            hitWallsSound = game.add.audio('hitWallsSound');
            hitGateSound = game.add.audio('hitGateSound');
            hitWallsSound.volume = 0.1;


            
            ballBgTop = game.add.sprite(0, 65, 'ballBg');
            ballBgTop.frame = 0;
            ballBgBottom = game.add.sprite(0, 512, 'ballBg');
            ballBgBottom.frame = 1;
            
            ball = game.add.sprite(100, 400, 'ball');
            ball.alpha = 0;
            
            rightGate = game.add.sprite(240, 710, 'rightGate');
            rightGate.frame = 0; //setting the specific frame of the spriteSheet
            leftGate = game.add.sprite(-350, 710, 'leftGate');
            leftGate.frame = 0;
            leftGate.anchor.setTo(1, 0);
            
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

            
            ballBgFront = game.add.sprite(0, 65, 'ballFrontBg');
            gameHeader = game.add.sprite(0, 0, 'header');
            tutorialHeader = game.add.sprite(0, 0, 'tutorialHeader');
            screenPatch = game.add.sprite(39.786, 781.229, 'screenPatch');
            screenPatch.alpha = 0;

            gateMask = game.add.graphics(30, 710);
            gateMask.beginFill(0xffffff);
            gateMask.drawRoundedRect(0, 0, 483, 50, 7);
            rightGate.mask = gateMask;
            leftGate.mask = gateMask;
 
            ballIcon1 = game.add.sprite(43.684, 786.027, 'ballsIcon');
            ballIcon2 = game.add.sprite(84.703, 786.027, 'ballsIcon');
            ballIcon3 = game.add.sprite(125.722, 786.027, 'ballsIcon');
            ballIcon1.alpha = 0;
            ballIcon2.alpha = 0;
            ballIcon3.alpha = 0;
            ballIcon1.frame = 0;
            ballIcon2.frame = 0;
            ballIcon3.frame = 0;

            slider = game.add.sprite(30, 890, 'slider');
            
            sliderBtnStroke = game.add.sprite(270, 895, 'sliderBtn');
            sliderBtnStroke.anchor.setTo(0.5, 0.5); //setting the anchor point to the middle of the shape
            sliderBtnStroke.frame = 1; 
            sliderBtnStroke.alpha = 0;
            
            sliderBtn = game.add.sprite(270, 895, 'sliderBtn');
            sliderBtn.anchor.setTo(0.5, 0.5); //setting the anchor point to the middle of the shape
            sliderBtn.frame = 0;     
            
            //slider btn moves when dragging it
            sliderBtn.inputEnabled = true;
            sliderBtn.input.start(0, true);
            sliderBtn.input.enableDrag(false, true, true);
            sliderBtn.events.onDragStart.add(tutorialOnDragStart, this);
            sliderBtn.events.onDragStop.add(tutorialOnDragStop, this);

            topWall = game.add.sprite(30, 143, 'topBottomWall');
            bottomWall = game.add.sprite(0, 890, 'topBottomWall');
            rightWall = game.add.sprite(30, 143, 'rightLeftWall');
            leftWall = game.add.sprite(510, 143, 'rightLeftWall');
            bottomWall.scale.setTo(1.2, 1);
            
            game.physics.enable([topWall, leftWall, bottomWall, rightWall, rightGate, leftGate, sliderBtn, ball], Phaser.Physics.ARCADE);

            ball.body.velocity.x = 0;
            ball.body.velocity.y = 0;
            
            topWall.body.immovable = true;
            leftWall.body.immovable = true;
            bottomWall.body.immovable = true;
            rightWall.body.immovable = true;        
            rightGate.body.immovable = true;        
            leftGate.body.immovable = true;    
            
            tapToContinue = game.add.graphics(0, 0);
            tapToContinue.beginFill(0x874e9b, 0);
            tapToContinue.drawRect(0, 0, 540, 960);
            tapToContinue.inputEnabled = true;   
            
            //timer for the gate to turn red when the ball hits it        
            gateColorTimer = game.time.create(false);
            tapToContinueTimer = game.time.create(false);
            
            skipBtn = game.add.button(540, 0, 'skipBtn', startGame);
            skipBtn.anchor.setTo(1, 0);

            tutorialSequence();            
        
        },
     
//****************************************UPDATE*********************************************
    
    update: function () {
     game.physics.arcade.collide(ball, [topWall, rightWall, leftWall], tutorialHitWalls, null, this); //ball collides with walls
     game.physics.arcade.collide(ball, [rightGate,leftGate], tutorialBallHitsGate, null, this); //ball collides with gate    

     game.physics.arcade.collide(ball, bottomWall, tutorialCatchBall, null, this); 

     sliderMovement(); 
     gateMovement();
        
    }    
};



//****************************************TUTORIAL SEQUENCE*********************************************

function tutorialSequence(){
    
    tapToContinueTimer.stop();
    
//----------------------------------------1------------------------------------------

     if (tutorialProgessCounter == 1){
        tooltip1 = game.add.sprite(44, 162, 'tooltip1');
        tooltip1.alpha = 0;
        game.add.tween(tooltip1).to({alpha:1}, 600, Phaser.Easing.Linear.In, true, 0, 0, false);
        
        tapToContinueText = game.add.text(99, 480, '', {fontSize: '35px', fill:'#3b3838', font: 'Heebo', align: 'center'});
        tapToContinueText.text = 'כדי להתקדם - געו במסך';
        tapToContinueText.alpha = 0;
        
        var textTween = game.add.tween(tapToContinueText).to({alpha:1}, 600, Phaser.Easing.Linear.In, true, 1100, 0, false);
        textTween.onComplete.add(function(){
        tapToContinue.events.onInputDown.add(tutorialSequence); 
        }, this);

        tutorialProgessCounter++;  
        
//----------------------------------------2------------------------------------------
        
    }else if (tutorialProgessCounter == 2){
        enterFullScreen();
        showTapToContinueText();
        tapToContinue.events.onInputDown.removeAll();  

        tooltip2 = game.add.sprite(44, 162, 'tooltip2');
        tooltip2.alpha = 0;

        game.add.tween(tooltip1).to({alpha:0}, 600, Phaser.Easing.Linear.In, true, 0, 0, false);
        game.add.tween(tapToContinueText).to({alpha:0}, 600, Phaser.Easing.Linear.In, true, 0, 0, false);
        game.add.tween(tooltip2).to({alpha:1}, 600, Phaser.Easing.Linear.In, true, 800, 0, false);
        var tween = game.add.tween(ball).to({alpha:1}, 600, Phaser.Easing.Linear.In, true, 800, 0, false);
        tutorialProgessCounter++;  

        tween.onComplete.add(function(){
                tapToContinue.events.onInputDown.add(tutorialSequence); 
        }, this);
 
 //----------------------------------------3------------------------------------------

    }else if (tutorialProgessCounter == 3){
            showTapToContinueText();

        tapToContinue.events.onInputDown.removeAll();  

        tooltip3 = game.add.sprite(44, 162, 'tooltip3');
        tooltip3.alpha = 0;

        arrow = game.add.sprite(sliderBtn.x, 650, 'arrow');
        arrow.alpha = 0;
        arrow.anchor.set(0.5);
        
        game.add.tween(tooltip2).to({alpha:0}, 600, Phaser.Easing.Linear.In, true, 0, 0, false);
        var tween = game.add.tween(tooltip3).to({alpha:1}, 600, Phaser.Easing.Linear.In, true, 800, 0, false);
        game.add.tween(arrow).to({alpha:1}, 600, Phaser.Easing.Linear.In, true, 800, 0, false);
        game.add.tween(arrow).to({y:680}, 600, Phaser.Easing.Sinusoidal.InOut, true, 800, 100, true);
        
        tutorialProgessCounter++;  
        
        tween.onComplete.add(function(){
                tapToContinue.events.onInputDown.add(tutorialSequence); 
         }, this);

//----------------------------------------4------------------------------------------

    }else if (tutorialProgessCounter == 4){
        game.add.tween(tapToContinueText).to({alpha:0}, 600, Phaser.Easing.Linear.In, true, 0, 0, false);

        tapToContinue.events.onInputDown.removeAll();  
        game.world.bringToTop(sliderBtn);
        
        tooltip4 = game.add.sprite(44, 162, 'tooltip4');
        tooltip4.alpha = 0;

        game.add.tween(tooltip3).to({alpha:0}, 600, Phaser.Easing.Linear.In, true, 0, 0, false);
        game.add.tween(arrow).to({alpha:0}, 600, Phaser.Easing.Linear.In, true, 0, 0, false);
        game.add.tween(tooltip4).to({alpha:1}, 600, Phaser.Easing.Linear.In, true, 800, 0, false);
        var tween = game.add.tween(sliderBtnStroke).to({alpha:0.5}, 600, Phaser.Easing.Sinusoidal.InOut, true, 800, 0, false);
        
        tween.onComplete.add(function(){
        sliderBtnStroke.alpha = 0.5;
        sliderBtnStrokeTween = game.add.tween(sliderBtnStroke).to({alpha:1}, 600, Phaser.Easing.Sinusoidal.InOut, true, 0, 100, true);
        
        }, this);
        
       
//----------------------------------------5------------------------------------------
    }else if (tutorialProgessCounter == 5){
        tooltip5 = game.add.sprite(44, 162, 'tooltip5');
        tooltip5.alpha = 0;
        
        game.add.tween(tooltip4).to({alpha:0}, 600, Phaser.Easing.Linear.In, true, 0, 0, false);
        var tween = game.add.tween(tooltip5).to({alpha:1}, 600, Phaser.Easing.Linear.In, true, 800, 0, false);
        
        tween.onComplete.add(function(){
        moveBall();
        game.add.tween(tooltip5).to({alpha:0}, 600, Phaser.Easing.Linear.In, true, 1500, 0, false); //tooltip disappears after ball starts moving
        }, this);
        
        
//----------------------------------------6------------------------------------------

    }else if (tutorialProgessCounter == 6){
            showTapToContinueText();
            game.world.bringToTop(tapToContinue);
            game.world.bringToTop(skipBtn);
            game.world.bringToTop(startGameBtn);

            tooltip6 = game.add.sprite(44, 162, 'tooltip6');
            tooltip6.alpha = 0;
            game.add.tween(tooltip6).to({alpha:1}, 600, Phaser.Easing.Linear.In, true, 0, 0, false);
            tutorialProgessCounter++;
            tapToContinue.events.onInputDown.add(tutorialSequence); 
        
//----------------------------------------7------------------------------------------
     
        }else if (tutorialProgessCounter == 7){
            showTapToContinueText();
            tapToContinue.events.onInputDown.removeAll();  
            tooltip7 = game.add.sprite(44, 162, 'tooltip7');
            tooltip7.alpha = 0;
            game.add.tween(tooltip6).to({alpha:0}, 600, Phaser.Easing.Linear.In, true, 0, 0, false);
            game.add.tween(tooltip7).to({alpha:1}, 600, Phaser.Easing.Linear.In, true, 800, 0, false);
            game.add.tween(ballIcon2).to({alpha:1}, 500, Phaser.Easing.Linear.In, true, 2000, 0, false);
            var tween = game.add.tween(ballIcon3).to({alpha:1}, 500, Phaser.Easing.Linear.In, true, 2000, 0, false);
            
           tween.onComplete.add(function(){
               tutorialProgessCounter++;
               tapToContinue.events.onInputDown.add(tutorialSequence); 
           }, this);
            
//----------------------------------------8------------------------------------------
            
        }else if (tutorialProgessCounter == 8){
        game.add.tween(tapToContinueText).to({alpha:0}, 600, Phaser.Easing.Linear.In, true, 0, 0, false);
        game.world.bringToTop(ballBgFront);
        game.world.bringToTop(screenPatch);


         game.add.tween(tooltip7).to({alpha:0}, 600, Phaser.Easing.Linear.In, true, 0, 0, false);
         game.add.tween(ballIcon1).to({alpha:0}, 500, Phaser.Easing.Linear.In, true, 0, 0, false);
         game.add.tween(ballIcon2).to({alpha:0}, 500, Phaser.Easing.Linear.In, true, 0, 0, false);
         game.add.tween(ballIcon3).to({alpha:0}, 500, Phaser.Easing.Linear.In, true, 0, 0, false);
         game.add.tween(rightGate).to({alpha:0}, 500, Phaser.Easing.Linear.In, true, 0, 0, false);
         game.add.tween(leftGate).to({alpha:0}, 500, Phaser.Easing.Linear.In, true, 0, 0, false);
         game.add.tween(screenPatch).to({alpha:1}, 500, Phaser.Easing.Linear.In, true, 0, 0, false);
         game.add.tween(tutorialHeader).to({y:-300}, 600, Phaser.Easing.Linear.In, true, 0, 0, false);
         game.add.tween(skipBtn).to({y:-287}, 600, Phaser.Easing.Linear.In, true, 0, 0, false);
            
         var starTweenA = game.add.tween(nextLevelContainer).to({y:300}, 1000, Phaser.Easing.Circular.Out, true, 100);
         starTweenA.onComplete.add(activateStarTweenB, this);
   }
    
}

//****************************************SHOW TAP TO CONTINUE TEXT*********************************************

function showTapToContinueText(){
    game.add.tween(tapToContinueText).to({alpha:0}, 600, Phaser.Easing.Linear.In, true, 0, 0, false);

    tapToContinueTimer.start();
    
    tapToContinueTimer.add(3000, function(){
//   if(needTapToContinueText == true){
        game.add.tween(tapToContinueText).to({alpha:1}, 600, Phaser.Easing.Linear.In, true, 0, 0, false);
//       needTapToContinueText = false;
//   }
    }, this);
        
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
            if(pauseState == false){
              currentBall = createBall();
            }       
        }else{
         tutorialProgessCounter++;
        game.add.tween(letsStart).to({y:312}, 600, Phaser.Easing.Sinusoidal.Out, true, 0); 
        game.add.tween(startGameBtn).to({y:397}, 600, Phaser.Easing.Sinusoidal.Out, true, 0); 
     
        }
    }
   

//****************************************ON DRAG START*********************************************

function tutorialOnDragStart(){
    sliderBtnStrokeTween.stop();
     sliderBtnStroke.alpha = 0;
     sliderBtn.frame = 1; 
}

//****************************************ON DRAG STOP*********************************************

function tutorialOnDragStop(){
     sliderBtn.frame = 0; 
    if (tutorialProgessCounter == 4){
        if(sliderBtn.x != centerX){
            tutorialProgessCounter++;  
            tutorialSequence();
        }
    }
}

//****************************************MOVE BALL*********************************************

function moveBall(){
    ball.body.bounce.set(1);
    ball.body.velocity.x = 200;
    ball.body.velocity.y = 200;
}

//****************************************CATCH BALL*********************************************

function tutorialCatchBall(){
   var ballIcon1Tween = game.add.tween(ballIcon1).to({alpha:1}, 500, Phaser.Easing.Linear.In, true, 0, 0, false);
   ball.kill();
    
    ballIcon1Tween.onComplete.add(function(){
        tutorialProgessCounter++;  
        tutorialSequence();
        }, this);
}

//****************************************BALL HITS WALLS*********************************************

function tutorialHitWalls(){
    hitWallsSound.play();
}

//****************************************BALL HITS GATE*********************************************

    function tutorialBallHitsGate(){
      if (rightGate.body.touching.up == true || leftGate.body.touching.up == true){    
            
            hitGateSound.play();

            rightGate.frame = 1; //make the gate red when ball touches it
            leftGate.frame = 1;    

            // a TimerEvent that turns the gate back to brown after 300 ms
            gateColorTimer.add(300, function(){
                rightGate.frame = 0;
                leftGate.frame =0;    
            }, this);

            gateColorTimer.start();
       }
    }
//****************************************START GAME*********************************************

function startGame(){
    enterFullScreen();
    btnSound.play();
    game.state.start('ballGameCountDown');
}