var selectedPic, bgTop, bgBottom, backbg, whiteLineTop, whiteLineBottom, feedbackText, homePageBtn, playAgainBtn, boingTimeOut, finishGameSound, lastTimeText;

colorGame.colorGameEndGame = function () {};
colorGame.colorGameEndGame.prototype = {

    //****************************************PRELOAD*********************************************

    preload: function () {

        game.load.image('userSelectedPic', '../images/' + selectedPicName);
        game.load.image('feedbackWhiteLine', '../assets/allGames/sprites/feedbackWhiteLine.png');
        game.load.image('timeOutText', '../assets/allGames/sprites/timeOutText.png');
        game.load.image('endGameText', '../assets/allGames/sprites/endGameText.png');
        game.load.image('homePageBtn', '../assets/colorGame/sprites/feedbackHomePageBtn.png');
        game.load.image('playAgainBtn', '../assets/colorGame/sprites/feedbackPlayAgainBtn.png');
        game.load.audio('boingTimeOut', '../assets/allGames/sounds/boing.mp3'); 
        game.load.audio('finishGameSound', '../assets/allGames/sounds/finishGame1.mp3'); 
        game.load.spritesheet('rain', '../assets/allGames/spriteSheets/rain.png', 17, 17);

    },

    //****************************************CREATE*********************************************

    create: function () {

        game.stage.backgroundColor='#F9E0B7';

        selectedPic = game.add.sprite(centerX, 512.5, 'userSelectedPic');
        selectedPic.anchor.set(0.5);
        resizeImage(selectedPic);

        whiteLineTop = game.add.sprite(0, 512, 'feedbackWhiteLine');
        whiteLineBottom = game.add.sprite(0, 512.5, 'feedbackWhiteLine');
        whiteLineBottom.scale.y = -1;

        bgTop = game.add.sprite(0, 65, 'Bg');
        bgTop.frame = 0;
        bgBottom = game.add.sprite(0, 512, 'Bg');
        bgBottom.frame = 1;
        var header = game.add.sprite(0, 0, 'header');
        var timeWord = game.add.sprite(487.171, 72, 'timeWord');

        homePageBtn = game.add.button(0, 877, 'homePageBtn', gotoChartPage);
        playAgainBtn = game.add.button(270, 877, 'playAgainBtn', playAgain);

        if (timeIsOut){
            levelText = game.add.text(1200, 730, '', {fontSize: '40px', fill:'#ffffff', font: 'Heebo'});
            levelText.anchor.setTo(1, 0);
            levelText.text = 'הגעת לשלב ' + lastLevel + ' / ' + levelNum ; 

            lastTimeText = game.add.text(1200, 800, '', {fontSize: '30px', fill:'#ffffff', font: 'Heebo'});
            lastTimeText.anchor.setTo(1, 0);
            if (lastGameLastLevel == (lastLevel + 1)){
                lastTimeText.text = 'בפעם הקודמת סיימת את המשחק'; 
            }else{
                lastTimeText.text = 'בפעם הקודמת הגעת לשלב ' + lastGameLastLevel; 
            }

            feedbackText = game.add.sprite(1200, 180, 'timeOutText');
            feedbackText.anchor.setTo(1, 0);

        }else{ //game is finished

            feedbackText = game.add.sprite(1200, 150, 'endGameText');
            feedbackText.anchor.setTo(1, 0);

            progressBar = game.add.graphics(11, 85);
            progressBar.beginFill(0x685d5e, 1);
            progressBar.drawRoundedRect(0, 0, 456, 12, 7);
            progressBar.width = endGameProgressBarWidth;  

            lastTimeText = game.add.text(1200, 750, '', {fontSize: '30px', fill:'#ffffff', font: 'Heebo'});
            lastTimeText.anchor.setTo(1, 0);
            if (lastGameLastLevel == (lastLevel + 1)){
                lastTimeText.text = 'בפעם הקודמת סיימת את המשחק'; 
            }else{
                lastTimeText.text = 'בפעם הקודמת הגעת לשלב ' + lastLevel + ' / ' + lastGameLastLevel ;
            }

            var emitter = game.add.emitter(game.world.centerX, 0, 400);

            emitter.width = game.world.width;
            // emitter.angle = 30; // uncomment to set an angle for the rain.

            emitter.makeParticles('rain');

            emitter.minParticleScale = 0.1;
            emitter.maxParticleScale = 0.5;

            emitter.setYSpeed(300, 500);
            emitter.setXSpeed(-5, 5);

            emitter.minRotation = 0;
            emitter.maxRotation = 0;

            emitter.start(false, 1600, 5, 0);

            game.world.bringToTop(header);
        }

        //        progressBarStroke = game.add.graphics(11, 85);
        //        progressBarStroke.lineStyle(3, 0x000000, 0.5);
        //        progressBarStroke.drawRoundedRect(0, 0, 456, 12, 7);

        progressBarStroke = game.add.sprite(9, 84, 'progressBarStroke');

        boingTimeOut = game.add.audio('boingTimeOut');
        finishGameSound = game.add.audio('finishGameSound');

        showFeedback();
    },

    //****************************************UPDATE*********************************************
    update: function () {

    } 
};


function showFeedback(){
    game.add.tween(bgTop).to({y: -135}, 1300, Phaser.Easing.Elastic.Out, true, 1500, 0, false);
    game.add.tween(bgBottom).to({y: 712}, 1300, Phaser.Easing.Elastic.Out, true, 1500, 0, false);  

    game.add.tween(whiteLineTop).to( { y: 312 }, 1300, Phaser.Easing.Elastic.Out, true, 1500, 0, false);
    game.add.tween(whiteLineBottom).to( { y: 712.5 }, 1300, Phaser.Easing.Elastic.Out, true, 1500, 0, false);

    game.add.tween(feedbackText).to( { x: 506 }, 500, Phaser.Easing.Linear.In, true, 0, 0, false);

    if (timeIsOut){
        game.add.tween(levelText).to( { x: 506 }, 500, Phaser.Easing.Linear.In, true, 2000, 0, false);
        if(lastGameLastLevel != 0 && lastGameLastLevel != undefined){      
            game.add.tween(lastTimeText).to( { x: 506 }, 500, Phaser.Easing.Linear.In, true,2000, 0, false);
        }
        game.time.events.add(1100, function(){
            boingTimeOut.play();
        });
    }else{
        if(lastGameLastLevel != 0 && lastGameLastLevel != undefined){
        
            game.add.tween(lastTimeText).to( { x: 506 }, 1200, Phaser.Easing.Elastic.Out, true, 2300, 0, false);
        }
        finishGameSound.play();
    } 
}

function playAgain(){
    boingTimeOut.stop();
    finishGameSound.stop();
     btnSound.play();
    game.state.start('preloader');
}

function gotoChartPage(){
    boingTimeOut.stop();
    finishGameSound.stop();
    btnSound.play();
    window.location = "../../client_side/endGameChart.html?gameName=colorGame&userID=" + userID;
}

function resizeImage(image){
    var width = image.width;
    var height = image.height;

    var maxWidth = 540;
    var maxHeight = 400;

    if (width > height) { // landscape
        var ratio = width / maxWidth;
        width = maxWidth;
        height = height / ratio;
    } else if (height > width) { // portrait
        var ratio = height / maxHeight;
        height = maxHeight;
        width = width / ratio;
    } else { // square
        height = maxHeight;
        width = maxHeight;
    }

    image.width = width;
    image.height = height;
}