var tapToContinue, tapToContinueText, BgTop, BgBottom, tutorialProgessCounter, tooltip1, tooltip2, tooltip3, tooltip4, tooltip5, tooltip6, tooltip7, arrow, tutorialHeader, gameHeader, skipBtn, star, starLines, wellDoneText, nextLevelContainer, gameIsOn = false, letsStart, startGameBtn, needTapToContinueText = false, tapToContinueTimer, btnSound, brickContainer, arrow1, arrow2, arrow3, arrow4, arrow1Movement,arrow2Movement,arrow3Movement,arrow4Movement, glow_truck, glow_car, trail, trailMask, trailTween, secTrailTween, stage6alreadyStarted, stage7alreadyStarted, stage8alreadyStarted, stage9alreadyStarted, secTweenWasComplete, countdownState,  tool1Sound, tool2Sound, tool3Sound,tool4Sound,tool5Sound, tool6Sound, tool7Sound, letsBeginSound, greatJobSound, starSound, cameFromGameToTutorial = false, cameFromGameToPlayAgain = false;

WebFontConfig = {
    //  load Google Font
    google: {
        families: ['Heebo']
    }
};

rushGame.rushGameTutorial = function () {};
rushGame.rushGameTutorial.prototype = {

    //****************************************PRELOAD*********************************************

    preload: function () {
        tutorialProgessCounter = 1;

        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        game.load.spritesheet('Bg', '../assets/rushGame/backgrounds/bg.jpg', 540, 447.5);
        game.load.image('tutorialHeader', '../assets/rushGame/backgrounds/tutorialHeader.png');
        game.load.image('header', '../assets/rushGame/backgrounds/header.jpg');

        game.load.image('skipBtn', '../assets/allGames/sprites/skipBtn.png');
        game.load.image('star', '../assets/rushGame/sprites/star.png');    
        game.load.image('starLines', '../assets/allGames/sprites/star_lines.png');
        game.load.image('letsStart', '../assets/allGames/sprites/letsStart.png');

        game.load.image('bgFront', '../assets/rushGame/backgrounds/bgFront.png');
        game.load.image('orangeCar', '../assets/rushGame/sprites/orangeBrick.png');
        game.load.image('car', '../assets/rushGame/sprites/brick2.png');
        game.load.image('truck', '../assets/rushGame/sprites/brick3.png');
        game.load.image('glow_truck', '../assets/rushGame/sprites/glow_track.png');
        game.load.image('glow_car', '../assets/rushGame/sprites/glow_car.png');
        game.load.image('arrow', '../assets/rushGame/sprites/arrow.png');

        game.load.spritesheet('startGameBtn', '../assets/rushGame/spriteSheets/startGameBtn.png', 220, 220);

        game.load.spritesheet('bottomBtn', '../assets/rushGame/spriteSheets/bottomBtn.png', 257, 75);
        game.load.image('tooltip1', '../assets/rushGame/sprites/tooltip1.png');
        game.load.image('tooltip2', '../assets/rushGame/sprites/tooltip2.png');
        game.load.image('tooltip3', '../assets/rushGame/sprites/tooltip3.png');
        game.load.image('tooltip4', '../assets/rushGame/sprites/tooltip4.png');
        game.load.image('tooltip5', '../assets/rushGame/sprites/tooltip5.png');
        game.load.image('tooltip6', '../assets/rushGame/sprites/tooltip6.png');
        game.load.image('skipBtn', '../assets/allGames/sprites/skipBtn.png');


        game.load.audio('btnSound', '../assets/allGames/sounds/pressBtn.mp3'); 
        game.load.audio('brickHit', '../assets/rushGame/sounds/brickHit.mp3'); 
        game.load.audio('orangeBrickOut', '../assets/rushGame/sounds/orangeBrickOut.mp3'); 
        game.load.audio('tool1Sound', '../assets/rushGame/sounds/tooltip1.mp3'); 
        game.load.audio('tool2Sound', '../assets/rushGame/sounds/tooltip2.mp3'); 
        game.load.audio('tool3Sound', '../assets/rushGame/sounds/tooltip3.mp3'); 
        game.load.audio('tool4Sound', '../assets/rushGame/sounds/tooltip4.mp3'); 
        game.load.audio('tool5Sound', '../assets/rushGame/sounds/tooltip5.mp3'); 
        game.load.audio('tool6Sound', '../assets/rushGame/sounds/tooltip6.mp3'); 

        game.load.audio('letsBegin', '../assets/allGames/sounds/letsStart.mp3'); 
        game.load.audio('greatJob', '../assets/allGames/sounds/greatJob.mp3'); 
        game.load.audio('starSound', '../assets/allGames/sounds/swoosh.mp3'); 

        stage6alreadyStarted = false;
        stage7alreadyStarted = false;
        stage8alreadyStarted = false;
        stage9alreadyStarted = false;
        secTweenWasComplete = false;

    },

    //****************************************CREATE*********************************************

    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.world.setBounds(0, 0, 540, 960);

        btnSound = game.add.audio('btnSound');
        brickHitSound = game.add.audio('brickHit');
        brickHitSound.volume=0.3;       

        orangeBrickOutSound = game.add.audio('orangeBrickOut');
        orangeBrickOutSound.volume=0.3;   

        tool1Sound =  game.add.audio('tool1Sound');
        tool2Sound =  game.add.audio('tool2Sound');
        tool3Sound =  game.add.audio('tool3Sound');
        tool4Sound =  game.add.audio('tool4Sound');
        tool5Sound =  game.add.audio('tool5Sound');
        tool6Sound =  game.add.audio('tool6Sound');
        tool7Sound =  game.add.audio('tool7Sound');

        letsBeginSound = game.add.audio('letsBegin');
        greatJobSound = game.add.audio('greatJob');
        starSound = game.add.audio('starSound');

        BgTop = game.add.sprite(0, 65, 'Bg');
        BgTop.frame = 0;
        BgBottom = game.add.sprite(0, 512, 'Bg');
        BgBottom.frame = 1;

        bgFront = game.add.sprite(24, 270, 'bgFront');
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

        starMask = game.add.graphics(0, 274);
        starMask.beginFill(0xffffff);
        starMask.drawRect(0, 0, 540, 480);
        nextLevelContainer.mask = starMask;

        letsStart = game.add.sprite(104.041, 1000, 'letsStart');
        startGameBtn = game.add.button(159.99, 1095, 'startGameBtn', startGame);
        startGameBtn.frame = 0;
        startGameBtn.onInputDown.add(function(){startGameBtn.frame = 1;}, startGameBtn);
        startGameBtn.onInputUp.add(function(){startGameBtn.frame = 0;}, startGameBtn);

        letsStart.mask = starMask;
        startGameBtn.mask = starMask;

        restarLevelBtn = game.add.button(8.494, 1100, 'bottomBtn', restarLevelFunc);
        stepBackBtn = game.add.button(274.506, 1100, 'bottomBtn', stepBackFunc);

        restarLevelBtn.onInputDown.add(function(){restarLevelBtn.frame = 1;}, restarLevelBtn);
        restarLevelBtn.onInputUp.add(function(){if(restartBtnWasClicked =! true){restarLevelBtn.frame = 0;}}, restarLevelBtn);

        stepBackBtn.onInputDown.add(function(){stepBackBtn.frame = 4;}, stepBackBtn);
        stepBackBtn.onInputUp.add(function(){if(stepBackBtnWasClicked != true){stepBackBtn.frame = 3;}}, stepBackBtn);         

        restarLevelBtn.frame = 2;  
        stepBackBtn.frame = 5; 

        gameHeader = game.add.sprite(0, 0, 'header');
        tutorialHeader = game.add.sprite(0, 0, 'tutorialHeader');

        tapToContinue = game.add.graphics(0, 0);
        tapToContinue.beginFill(0x874e9b, 0);
        tapToContinue.drawRect(0, 0, 540, 960);
        tapToContinue.inputEnabled = true;   

        glow_truck = game.add.sprite(104.041, 500, 'glow_truck');
        glow_truck.alpha=0;   


        glow_car = game.add.sprite(280, 424, 'glow_car');
        glow_car.angle=90;
        glow_car.alpha=0;

        //timer for the gate to turn red when the ball hits it        
        tapToContinueTimer = game.time.create(false);

        skipBtn = game.add.button(540, 0, 'skipBtn', startGame);
        skipBtn.anchor.setTo(1, 0);

        tapToContinueText = game.add.text(99, 800, '', {fontSize: '35px', fill:'#fff', font: 'Heebo', align: 'center'});
        tapToContinueText.text = 'כדי להתקדם - געו במסך';
        tapToContinueText.alpha = 0;

        countdownState= false;

        if(lastGameLastLevel == 0 || cameFromGameToTutorial == true){
            cameFromGameToTutorial = false;
            tutorialSequence();  
        } else if((lastGameLastLevel != 0) && (cameFromGameToTutorial == false)){
            game.state.start('rushGameCountDown');    
        } else if(cameFromGameToPlayAgain == true){
            cameFromGameToPlayAgain = false;
            game.state.start('rushGameCountDown'); 
        }           
    },

    //****************************************UPDATE*********************************************

    update: function () {
        if (tutorialProgessCounter == 4){     
            if(trailTween != undefined){
                trailTween.stop();
                trail.alpha=0;
            }

            if(secTrailTween != undefined){
                secTrailTween.stop();
                trail.alpha=0;
            } 
        }
        if (tutorialProgessCounter == 6){    
            glow_truck.x=brickContainer.children[5].x+20;
            glow_truck.y=brickContainer.children[5].y+264;
        }

        if (tutorialProgessCounter == 7){    
            glow_car.x=brickContainer.children[3].x+40;
            glow_car.y=brickContainer.children[3].y+264;
        }

        if (tutorialProgessCounter == 8){ 
            glow_truck.x=brickContainer.children[4].x+40;
            glow_truck.y=brickContainer.children[4].y+264;
        }

        if (tutorialProgessCounter == 9){    
            glow_car.x=brickContainer.children[2].x+20;
            glow_car.y=brickContainer.children[2].y+264;
        }


    }    
};

var tutorialCarsArray = [
    {
        row: 0, 
        col: 0,
        dir: VERTICAL,
        len: 2,
        spr: "car"
    },
    {
        row: 0,
        col: 1,
        dir: HORIZONTAL,
        len: 3,
        spr: "truck"
    },
    {
        row: 2,
        col: 0,
        dir: HORIZONTAL,
        len: 2,
        spr: "orangeCar"
    },
    {
        row: 2,
        col: 2,
        dir: VERTICAL,
        len: 2,
        spr: "car"
    },
    {
        row: 1,
        col: 5,
        dir: VERTICAL,
        len: 3,
        spr: "truck"
    },
    {
        row: 5,
        col: 3,
        dir: HORIZONTAL,
        len: 3,
        spr: "truck"
    }
];

function createToturialLevel(){

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
    brickContainer.y=274;

    for(var i = 0; i < tutorialCarsArray.length; i++){
        // to keep the code clear, I assign carsArray[i] to a variable simply called "car"
        var car = tutorialCarsArray[i];
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

        // the car has input enabled
        carSprite.inputEnabled = true;    

        //               

        // when the car starts to be dragged, call startDrag funcion
        carSprite.events.onDragStart.add(TutorialStartDrag);
        // when the car stops to be dragged, call stopDrag function
        carSprite.events.onDragStop.add(TutorialStopDrag);
        // if car direction is VERTICAL then prevent the sprite to be dragged horizontally
        if(car.dir == VERTICAL){
            carSprite.input.allowHorizontalDrag = false;
        }
        // if car direction is HORIZONTAL then prevent the sprite to be dragged vertically
        if(car.dir == HORIZONTAL){
            carSprite.input.allowVerticalDrag = false;     
        }
        brickContainer.add(carSprite);
        carSprite.alpha=0;
    }


    brickMask = game.add.graphics(0, 274);
    brickMask.beginFill(0xffffff);
    brickMask.drawRect(0, 0, 540, 480);
    brickContainer.mask = brickMask;

    restarLevelBtn.input.enabled = false;
    stepBackBtn.input.enabled = false;

    restarLevelBtn.frame = 2;  
    stepBackBtn.frame = 5;
}

function TutorialStartDrag(s){


    if(trailTween != undefined){
        trailTween.stop();
    }

    if(secTrailTween != undefined){
        secTrailTween.stop();
    }  

    trail.alpha=0;

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
function TutorialStopDrag(s){

    brickHitSound.play();

    if (orangeCar.x >300){
        var carOut =game.add.tween(orangeCar).to({x:600}, 300,  Phaser.Easing.Linear.In, true, 0);
        orangeBrickOutSound.play();
        carOut.onComplete.add(function(){

            game.add.tween(tooltip6).to({alpha:0}, 600, Phaser.Easing.Linear.In, true, 0, 0, false);

            var bricksUp =game.add.tween(brickContainer).to({y:-287}, 600, Phaser.Easing.Linear.In, true, 0, 0, false); 

            var starTweenA = game.add.tween(nextLevelContainer).to({y:380}, 1000, Phaser.Easing.Circular.Out, true, 500);
            starTweenA.onComplete.add(activateStarTweenB, this);
            game.add.tween(tutorialHeader).to({y:-300}, 600, Phaser.Easing.Linear.In, true, 0, 0, false);
            game.add.tween(skipBtn).to({y:-287}, 600, Phaser.Easing.Linear.In, true, 0, 0, false);
        }, this)
    }

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

    if((levelArray[5][0]==1) && (tutorialProgessCounter == 6)){

        glow_truck.alpha=0;
        brickContainer.children[5].input.draggable = false;

        tutorialProgessCounter++;
        tutorialSequence();
    }


    if((levelArray[4][2]==1) && (tutorialProgessCounter == 7)){

        glow_car.alpha=0;
        brickContainer.children[3].input.draggable = false;
        tutorialProgessCounter++;
        tutorialSequence();
    }

    if((levelArray[5][5]==1) && (tutorialProgessCounter == 8)){

        glow_truck.alpha=0;
        brickContainer.children[4].input.draggable = false;
        tutorialProgessCounter++;
        tutorialSequence();
    }
}


//****************************************TUTORIAL SEQUENCE*********************************************

function tutorialSequence(){

    tapToContinueTimer.stop();

    //----------------------------------------1------------------------------------------

    if (tutorialProgessCounter == 1){

        tapToContinue.events.onInputDown.add(tutorialSequence);

        tooltip1 = game.add.sprite(44, 140, 'tooltip1');
        tooltip1.alpha = 0;
        game.add.tween(tooltip1).to({alpha:1}, 600, Phaser.Easing.Linear.In, true, 0, 0, false);

        tool1Sound.play();
        showTapToContinueText();

        tutorialProgessCounter++;  

        //----------------------------------------2------------------------------------------

    }else if (tutorialProgessCounter == 2){


        tool1Sound.stop();
        tapToContinueTimer.stop();

        tapToContinue.events.onInputDown.removeAll(); 
        game.add.tween(tapToContinueText).to({alpha:0}, 600, Phaser.Easing.Linear.In, true, 0, 0, false);

        tooltip2 = game.add.sprite(44, 140, 'tooltip2');
        tooltip2.alpha = 0;
        game.add.tween(tooltip1).to({alpha:0}, 600, Phaser.Easing.Linear.In, true, 0, 0, false);
        game.add.tween(tooltip2).to({alpha:1}, 600, Phaser.Easing.Linear.In, true, 800, 0, false);

        setTimeout(function(){ 
            tool2Sound.play();
            tool2Sound.onStop.addOnce(showTapToContinueText, this);
        }, 1000);


        setTimeout(function(){ 
            if(countdownState==false){
                createTrail(30,434,0xae4b00,1,80, 540, "horizontal", 1000, true);
            }
        }, 2000);


        createToturialLevel();
        game.world.bringToTop(tapToContinue);
        game.world.bringToTop(skipBtn);

        var tween = game.add.tween(orangeCar).to({alpha:1}, 500, Phaser.Easing.Linear.In, true, 800, 0, false);
        tween.onComplete.add(function(){
            tapToContinue.events.onInputDown.add(tutorialSequence); 
        }, this);

        tutorialProgessCounter++;  

        //----------------------------------------3 HORIZONTAL CAR ------------------------------------------

    }else if (tutorialProgessCounter == 3){


        console.log("trailTween" + trailTween);
        console.log("secTrailTween" + secTrailTween);


        if(trailTween != undefined){
            trailTween.stop();
            trail.alpha=0;
        }

        if(secTrailTween != undefined){
            secTrailTween.stop();
            trail.alpha=0;
        } 


        tool2Sound.stop();
        tapToContinueTimer.stop();
        if(trailTween != undefined){
            trailTween.stop();
        }

        tapToContinue.events.onInputDown.removeAll(); 
        game.add.tween(tapToContinueText).to({alpha:0}, 600, Phaser.Easing.Linear.In, true, 0, 0, false);

        tooltip3 = game.add.sprite(44, 140, 'tooltip3');
        tooltip3.alpha = 0;
        game.add.tween(tooltip2).to({alpha:0}, 600, Phaser.Easing.Linear.In, true, 0, 0, false);
        game.add.tween(tooltip3).to({alpha:1}, 600, Phaser.Easing.Linear.In, true, 800, 0, false);

        setTimeout(function(){ 
            tool3Sound.play();
            tool3Sound.onStop.addOnce(showTapToContinueText, this);
        }, 1000);

        var tween = game.add.tween(brickContainer.children[1]).to({alpha:1}, 600, Phaser.Easing.Linear.In, true, 800, 0, false);
        var tween2 = game.add.tween(brickContainer.children[5]).to({alpha:1}, 600, Phaser.Easing.Linear.In, true, 800, 0, false);

        game.world.bringToTop(skipBtn);

        arrow1 = game.add.sprite(centerX-15, 715, 'arrow');
        arrow1.alpha = 0;
        arrow1.anchor.set(0.5);
        arrow1.scale.setTo(0.5,0.5);
        arrow1.angle = 90;  

        arrow2 = game.add.sprite(96, 314, 'arrow');
        arrow2.alpha = 0;
        arrow2.anchor.set(0.5);
        arrow2.scale.setTo(0.5,0.5);
        arrow2.angle = 90;

        arrow3 = game.add.sprite(363, 314, 'arrow');
        arrow3.alpha = 0;
        arrow3.anchor.set(0.5);
        arrow3.scale.setTo(0.5,0.5);
        arrow3.angle = -90;

        game.add.tween(arrow1).to({alpha:1}, 600, Phaser.Easing.Linear.In, true, 800, 0, false);
        arrow1Movement=  game.add.tween(arrow1).to({x:250}, 600, Phaser.Easing.Sinusoidal.InOut, true, 800, 100, true);  

        game.add.tween(arrow2).to({alpha:1}, 600, Phaser.Easing.Linear.In, true, 800, 0, false);
        arrow2Movement =  game.add.tween(arrow2).to({x:92}, 600, Phaser.Easing.Sinusoidal.InOut, true, 800, 100, true);  

        game.add.tween(arrow3).to({alpha:1}, 600, Phaser.Easing.Linear.In, true, 800, 0, false);
        arrow3Movement = game.add.tween(arrow3).to({x:367}, 600, Phaser.Easing.Sinusoidal.InOut, true, 800, 100, true);

        tutorialProgessCounter++;  

        tween.onComplete.add(function(){
            tapToContinue.events.onInputDown.add(tutorialSequence); 
        }, this);

        //----------------------------------------4 VERTICAL CAR------------------------------------------

    }else if (tutorialProgessCounter == 4){

        if(trailTween != undefined){
            trailTween.stop();
            trail.alpha=0;
        }

        if(secTrailTween != undefined){
            secTrailTween.stop();
            trail.alpha=0;
        } 

        tool3Sound.stop();
        tapToContinueTimer.stop();

        tapToContinue.events.onInputDown.removeAll();  
        game.add.tween(tapToContinueText).to({alpha:0}, 600, Phaser.Easing.Linear.In, true, 0, 0, false);


        tooltip4 = game.add.sprite(44, 140, 'tooltip4');
        tooltip4.alpha = 0;
        game.add.tween(brickContainer.children[4]).to({alpha:1}, 600, Phaser.Easing.Linear.In, true, 500, 0, false);
        game.add.tween(brickContainer.children[3]).to({alpha:1}, 600, Phaser.Easing.Linear.In, true, 500, 0, false);


        setTimeout(function(){ 
            tool4Sound.play();
            tool4Sound.onStop.addOnce(showTapToContinueText, this);
        }, 1000);


        arrow1.alpha=0;
        arrow2.alpha=0;
        arrow3.alpha=0;

        arrow1Movement.stop();
        arrow2Movement.stop();
        arrow3Movement.stop();

        game.world.bringToTop(skipBtn);

        arrow1.x = 230;
        arrow1.y = 420;
        arrow1.angle = 180;

        arrow2.x = 230; 
        arrow2.y = 610;
        arrow2.angle = 0;   

        arrow3.x = 470; 
        arrow3.y = 340;
        arrow3.angle = 180;

        arrow4 = game.add.sprite(470, 610, 'arrow');
        arrow4.anchor.set(0.5);
        arrow4.scale.setTo(0.5,0.5);
        arrow4.alpha=0;

        game.add.tween(arrow1).to({alpha:1}, 600, Phaser.Easing.Linear.In, true, 500, 0, false);
        game.add.tween(arrow2).to({alpha:1}, 600, Phaser.Easing.Linear.In, true, 500, 0, false);
        game.add.tween(arrow3).to({alpha:1}, 600, Phaser.Easing.Linear.In, true, 500, 0, false);
        game.add.tween(arrow4).to({alpha:1}, 600, Phaser.Easing.Linear.In, true, 500, 0, false);

        game.add.tween(tooltip3).to({alpha:0}, 600, Phaser.Easing.Linear.In, true, 0, 0, false);    
        var tooltipTween = game.add.tween(tooltip4).to({alpha:1}, 600, Phaser.Easing.Linear.In, true, 800, 0, false);

        arrow1Movement=  game.add.tween(arrow1).to({y:416}, 600, Phaser.Easing.Sinusoidal.InOut, true, 800, 100, true);  
        arrow2Movement=  game.add.tween(arrow2).to({y:614}, 600, Phaser.Easing.Sinusoidal.InOut, true, 800, 100, true);  
        arrow3Movement=  game.add.tween(arrow3).to({y:336}, 600, Phaser.Easing.Sinusoidal.InOut, true, 800, 100, true);  
        arrow4Movement=  game.add.tween(arrow4).to({y:614}, 600, Phaser.Easing.Sinusoidal.InOut, true, 800, 100, true);  

        tutorialProgessCounter++;  

        tooltipTween.onComplete.add(function(){
            tapToContinue.events.onInputDown.add(tutorialSequence); 
        }, this);

        //----------------------------------------5------------------------------------------
    }else if (tutorialProgessCounter == 5){

        tool4Sound.stop();
        tapToContinueTimer.stop();

        tapToContinue.events.onInputDown.removeAll();  
        game.add.tween(tapToContinueText).to({alpha:0}, 600, Phaser.Easing.Linear.In, true, 0, 0, false);

        tooltip5 = game.add.sprite(44, 128, 'tooltip5');
        tooltip5.alpha = 0;
        game.add.tween(tooltip4).to({alpha:0}, 600, Phaser.Easing.Linear.In, true, 0, 0, false);
        var tween = game.add.tween(tooltip5).to({alpha:1}, 600, Phaser.Easing.Linear.In, true, 800, 0, false);

        setTimeout(function(){ 
            tool5Sound.play();
            tool5Sound.onStop.addOnce(showTapToContinueText, this);
        }, 1000);

        game.world.bringToTop(skipBtn);
        arrow1.destroy();
        arrow2.destroy();
        arrow3.destroy();
        arrow4.destroy();

        restarLevelBtn.frame=1;
        stepBackBtn.frame=4;

        game.add.tween(restarLevelBtn).to({y:875}, 900, Phaser.Easing.Linear.In, true, 0, 0, false);
        game.add.tween(stepBackBtn).to({y:875}, 900, Phaser.Easing.Linear.In, true, 0, 0, false);

        tutorialProgessCounter++;  

        tween.onComplete.add(function(){
            tapToContinue.events.onInputDown.add(tutorialSequence); 
        }, this);


        //----------------------------------------6-- start playing-----------------------------------------

    }else if (tutorialProgessCounter == 6){

        if(stage6alreadyStarted==false){

            tool5Sound.stop();
            tapToContinueTimer.stop();

            tapToContinue.events.onInputDown.removeAll();  
            game.add.tween(tapToContinueText).to({alpha:0}, 600, Phaser.Easing.Linear.In, true, 0, 0, false);

            tooltip6 = game.add.sprite(44, 140, 'tooltip6');
            tooltip6.alpha = 0;
            game.add.tween(tooltip5).to({alpha:0}, 600, Phaser.Easing.Linear.In, true, 0, 0, false);
            game.add.tween(tooltip6).to({alpha:1}, 600, Phaser.Easing.Linear.In, true, 800, 0, false);


            setTimeout(function(){ 
                tool6Sound.play();
            }, 1000);

            game.world.bringToTop(skipBtn);
            console.log("stage-6");

            glow_truck.alpha=1;

            game.world.sendToBack(tapToContinue);
            tapToContinueText.alpha=0;
            game.world.bringToTop(skipBtn);
            game.add.tween(restarLevelBtn).to({y:1100}, 900, Phaser.Easing.Linear.In, true, 0, 0, false);
            game.add.tween(stepBackBtn).to({y:1100}, 900, Phaser.Easing.Linear.In, true, 0, 0, false);

            game.add.tween(brickContainer.children[0]).to({alpha:1}, 600, Phaser.Easing.Linear.In, true, 500, 0, false);
            brickContainer.children[5].input.enableDrag();
            brickContainer.children[5].input.enableSnap(tileSize, tileSize, false, true);

        }
        tool6Sound.onStop.addOnce(function(){
            if(secTweenWasComplete == true){
                createTrail(400,679,0x4a3838,1,70, -500, "horizontal", -500, false);
            }        
            stage6alreadyStarted = true;
        })


        //----------------------------------------7------------------------------------------

    } else if (tutorialProgessCounter == 7){

        if(stage7alreadyStarted==false){
            tool6Sound.stop();

            secTweenWasComplete = true;
            console.log("stage 7");

            game.add.tween(glow_car).to({alpha:1}, 500, Phaser.Easing.Linear.In, true, 0, 0, false);
            brickContainer.children[3].input.enableDrag();        
            brickContainer.children[3].input.enableSnap(tileSize, tileSize, false, true);

        }

        if (secTweenWasComplete == true){
            //createTrail(x,y, color, width, height, scaleSize, direction, endPoint, makeInputEnabled)
            createTrail(194,460,0x4a3838,70,1, 500, "vertical", 1700, false);
        }

        stage7alreadyStarted = true;
        //----------------------------------------8------------------------------------------

    } else if (tutorialProgessCounter == 8){

        if(stage8alreadyStarted==false){

            secTweenWasComplete = true;
            console.log("stage-8"); 

            glow_truck.angle = 90;
            glow_truck.alpha=1;

            brickContainer.children[4].input.enableDrag();  
            brickContainer.children[4].input.enableSnap(tileSize, tileSize, false, true);
        }

        if (secTweenWasComplete == true){
            createTrail(434,460,0x4a3838,70,1, 500, "vertical", 1000, false);
        }

        stage8alreadyStarted = true;

        //----------------------------------------9 - REALESE ORANGE BRICK ------------------------------------------

    } else if (tutorialProgessCounter == 9){

        if(stage9alreadyStarted==false){

            glow_car.angle=0;
            game.add.tween(glow_car).to({alpha:1}, 500, Phaser.Easing.Linear.In, true, 0, 0, false);
            secTweenWasComplete = true;
            console.log("stage-9"); 

            brickContainer.children[2].input.enableDrag();  
            brickContainer.children[2].input.enableSnap(tileSize, tileSize, false, true);
        }
        if (secTweenWasComplete == true){
            //  createTrail(x,y, color, width, height, scaleSize, direction, endPoint, makeInputEnabled)
            createTrail(30,434,0xae4b00,1,80, 540, "horizontal", 1000, false);
        }

        stage9alreadyStarted= true

    }
}

//****************************************SHOW TAP TO CONTINUE TEXT*********************************************

function createTrail(x,y, color, width, height, scaleSize, direction, endPoint, makeInputEnabled){

    trail = game.add.graphics(x, y);
    trail.beginFill(color, 1);
    trail.drawRect(0, 0, width, height);
    game.world.sendToBack(trail);
    game.world.sendToBack(BgTop);
    game.world.sendToBack(BgBottom);  

    var trailMask = game.add.graphics(24, 274);
    trailMask.beginFill(0xffffff);
    trailMask.drawRect(0, 0, 540, 480);
    trail.mask = trailMask;    

    trailTween;

    if(direction=="vertical"){
        secTweenWasComplete = false;
        trailTween = game.add.tween(trail.scale).to({y:scaleSize}, 1000, Phaser.Easing.Linear.In, true, 500, 0, false);   
        trailTween.onComplete.add(startSeconedTween, this); 

    }else if(direction=="horizontal"){
        secTweenWasComplete = false;
        trailTween = game.add.tween(trail.scale).to({x:scaleSize}, 1000, Phaser.Easing.Linear.In, true, 500, 0, false);  
        trailTween.onComplete.add(startSeconedTween, this); 
    }

    function startSeconedTween(){

        if(direction=="vertical"){
            secTrailTween = game.add.tween(trail).to({y:endPoint}, 1000, Phaser.Easing.Linear.In, true,200, 0, false);

        }else if(direction=="horizontal"){
            secTrailTween = game.add.tween(trail).to({x:endPoint}, 1000, Phaser.Easing.Linear.In, true,200, 0, false);
        }
        secTrailTween.onComplete.add(function(){
            secTweenWasComplete = true;
            trail.destroy;
            if(makeInputEnabled==true){
                tapToContinue.events.onInputDown.add(tutorialSequence); 
            }
        }, this);
    }
}


function showTapToContinueText(){
    tapToContinueTimer.start();
    tapToContinueTimer.add(1500, function(){     
        game.add.tween(tapToContinueText).to({alpha:1}, 600, Phaser.Easing.Linear.In, true, 0, 0, false);
    }, this);

}

//****************************************TWEENS*********************************************

function activateStarTweenB () {
    if (gameIsOn == false){
        greatJobSound.play();  
    } 


    nextLevelContainer.y=380;
    game.add.tween(starLines).to({alpha:1}, 600, Phaser.Easing.Sinusoidal.Out, true, 0); 
    var starTweenB =  game.add.tween(nextLevelContainer).to({y:-400}, 700, Phaser.Easing.Circular.Out, true, 1200); 
    starTweenB.onComplete.add(afterStar, this);
}

function afterStar () {
    starLines.alpha = 0;
    starSound.play();
    if (gameIsOn){
        if(pauseState == false){
            createlevel(difficultyLevel);
        }       
    }else{
        tutorialProgessCounter++;
        letsBeginSound.play();
        game.add.tween(letsStart).to({y:360}, 600, Phaser.Easing.Sinusoidal.Out, true, 0); 
        game.add.tween(startGameBtn).to({y:440}, 600, Phaser.Easing.Sinusoidal.Out, true, 0); 
    }
}

//****************************************START GAME*********************************************

function startGame(){
    countdownState = true;

    tool1Sound.stop();
    tool2Sound.stop();
    tool3Sound.stop();
    tool4Sound.stop();
    tool5Sound.stop();
    tool6Sound.stop();

    tapToContinueTimer.stop();

    if(tutorialSequence == 3 || tutorialSequence > 5){
        trail.alpha=0;
    }

    btnSound.play();
    game.state.start('rushGameCountDown');
}