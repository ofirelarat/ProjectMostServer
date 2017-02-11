var selectedPic, ballBgTop, ballBgBottom, backbg, whiteLineTop, whiteLineBottom, feedbackText, homePageBtn, playAgainBtn;

ballGame.ballGameEndGame = function () {};
ballGame.ballGameEndGame.prototype = {
    
//****************************************PRELOAD*********************************************

    preload: function () {
    
    game.load.image('userSelectedPic', '../images/' + selectedPicName);
    game.load.image('feedbackWhiteLine', '../assets/allGames/sprites/feedbackWhiteLine.png');
    game.load.image('timeOutText', '../assets/allGames/sprites/timeOutText.png');
    game.load.image('endGameText', '../assets/allGames/sprites/endGameText.png');
    game.load.image('homePageBtn', '../assets/ballGame/sprites/feedbackHomePageBtn.png');
    game.load.image('playAgainBtn', '../assets/ballGame/sprites/feedbackPlayAgainBtn.png');
       
    },
    
//****************************************CREATE*********************************************
    
        create: function () {
            
            game.stage.backgroundColor='#F9E0B7';
            
            selectedPic = game.add.sprite(centerX, 512.5, 'userSelectedPic');
            selectedPic.anchor.set(0.5);
            
            whiteLineTop = game.add.sprite(0, 512, 'feedbackWhiteLine');
            whiteLineBottom = game.add.sprite(0, 512.5, 'feedbackWhiteLine');
            whiteLineBottom.scale.y = -1;
            
            ballBgTop = game.add.sprite(0, 65, 'ballBg');
            ballBgTop.frame = 0;
            ballBgBottom = game.add.sprite(0, 512, 'ballBg');
            ballBgBottom.frame = 1;
        var header = game.add.sprite(0, 0, 'header');
        var timeWord = game.add.sprite(487.171, 72, 'timeWord');
                
            homePageBtn = game.add.button(270, 877, 'homePageBtn', backHome);
            playAgainBtn = game.add.button(0, 877, 'playAgainBtn', startNewGame);
             
            
            if (timeIsOut){
               levelText = game.add.text(1200, 730, '', {fontSize: '40px', fill:'#675e5e', font: 'Heebo'});
               levelText.anchor.setTo(1, 0);
               levelText.text = 'הגעת לשלב ' + lastLevel + ' / ' + levelNum ; 
                
               feedbackText = game.add.sprite(1200, 180, 'timeOutText');
               feedbackText.anchor.setTo(1, 0);
 
            }else{ //game is finished
               
              feedbackText = game.add.sprite(1200, 150, 'endGameText');
              feedbackText.anchor.setTo(1, 0);
                
               progressBar = game.add.graphics(11, 85);
               progressBar.beginFill(0x874e9b, 1);
               progressBar.drawRoundedRect(0, 0, 456, 12, 7);
               progressBar.width = endGameProgressBarWidth;  
            }
            
            progressBarStroke = game.add.graphics(11, 85);
            progressBarStroke.lineStyle(3, 0x000000, 0.5);
            progressBarStroke.drawRoundedRect(0, 0, 456, 12, 7);
            
            showFeedback();
        },
     
//****************************************UPDATE*********************************************
    
    update: function () {
     
    } 
    
};


function showFeedback(){
    
  game.add.tween(ballBgTop).to( { y: -135 }, 1300, Phaser.Easing.Elastic.Out, true, 1500, 0, false);
  game.add.tween(ballBgBottom).to( { y: 712 }, 1300, Phaser.Easing.Elastic.Out, true, 1500, 0, false);  
    
  game.add.tween(whiteLineTop).to( { y: 312 }, 1300, Phaser.Easing.Elastic.Out, true, 1500, 0, false);
  game.add.tween(whiteLineBottom).to( { y: 712.5 }, 1300, Phaser.Easing.Elastic.Out, true, 1500, 0, false);
    
  game.add.tween(feedbackText).to( { x: 506 }, 500, Phaser.Easing.Linear.In, true, 0, 0, false);
  if (timeIsOut){
  game.add.tween(levelText).to( { x: 506 }, 500, Phaser.Easing.Linear.In, true, 0, 0, false);
  }
    
}

function startNewGame(){
        game.state.start('ballGameCountDown');
}
