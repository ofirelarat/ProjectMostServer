var header, countDownBg, countDownWindow, windowMask, numbers, CountDownTimer;

colorGame.colorGameCountDown = function () {};
colorGame.colorGameCountDown.prototype = {
    
//****************************************PRELOAD*********************************************

    preload: function () {
     game.load.image('header', '../assets/ballGame/backgrounds/header.jpg');
     game.load.image('countDownBg', '../assets/ballGame/backgrounds/countDownBg.png');
     game.load.image('countDownWindow', '../assets/ballGame/sprites/countDownWindow.png');
     game.load.image('numbers', '../assets/allGames/sprites/numbers.jpg');
   
    },
    
//****************************************CREATE*********************************************
    
       create: function () {       
       game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            
       game.stage.backgroundColor='#FFF';
           
       numbers = game.add.sprite(204, 426, 'numbers');
       header = game.add.sprite(0, 0, 'header');
       countDownBg = game.add.sprite(0, 65, 'countDownBg');
       countDownWindow = game.add.sprite(204,426, 'countDownWindow')
       
        windowMask = game.add.graphics(204, 426);
          
            windowMask.beginFill(0xffffff);
            windowMask.drawRoundedRect(0, 0, 133, 174, 10);
            countDownWindow.mask = windowMask;
       
        numberMovement();
       },

};
     
//****************************************numberMovement*********************************************

function numberMovement(){
          var   tweenB, tweenC, WindowCloseTween;
    game.add.tween(countDownWindow).to( {y:252}, 500, Phaser.Easing.Linear.In, true, 500);
     tweenB= game.add.tween(numbers).to( {y:252}, 500, Phaser.Easing.Linear.In, true, 1500);
      tweenB.onComplete.add(activateTweenC, this)
    
      function activateTweenC () {
         tweenC = game.add.tween(numbers).to( {y:78}, 500, Phaser.Easing.Linear.In, true,500); 
        countDownWindow.y = 600;
        tweenC.onComplete.add(activateWindowCloseTween, this)
      }
        
       function activateWindowCloseTween(){
            WindowCloseTween =game.add.tween(countDownWindow).to({y:426}, 300, Phaser.Easing.Linear.In, true, 500);
            WindowCloseTween.onComplete.add(startNewGame, this);
     }

}


function startNewGame(){
    game.time.events.add(500, function(){
        game.state.start('ballGame1');
    });
                         }
                         


