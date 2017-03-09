var header, countDownBg, number, CountDownTimer, startGameBtn, tickSound, ready;

ballGame.ballGameCountDown = function () {};
ballGame.ballGameCountDown.prototype = {

    //****************************************PRELOAD*********************************************

    preload: function () {

        game.load.image('countDownBg', '../assets/ballGame/backgrounds/bg.jpg');
        game.load.image('ready', '../assets/allGames/sprites/ready.png');
        game.load.spritesheet('numbers', '../assets/ballGame/spriteSheets/numbers.png', 220, 220);
        game.load.audio('tickSound', '../assets/allGames/sounds/countDown.mp3'); 
    },

    //****************************************CREATE*********************************************

    create: function () {       
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        game.stage.backgroundColor='#FFF';       
        header = game.add.sprite(0, 0, 'header');

        ballBgTop = game.add.sprite(0, 65, 'ballBg');
        ballBgTop.frame = 0;
        ballBgBottom = game.add.sprite(0, 512, 'ballBg');
        ballBgBottom.frame = 1;

        number = game.add.sprite(centerX, 520, 'numbers');
        number.frame = 2;
        number.anchor.setTo(0.5,0.5);
        number.scale.setTo(0,0);

        ready = game.add.sprite(260, 320, 'ready');
        ready.anchor.set(0.5, 0.5);


        tickSound = game.add.audio('tickSound');
        tickSound.volume =0.3;
        numberMovement();
    },

};

//****************************************numberMovement*********************************************

function numberMovement(){
    var show3 = game.add.tween(number.scale).to({x:1, y:1}, 200, Phaser.Easing.Back.Out, true, 500, 0, false);
    game.time.events.add(200, function(){
        tickSound.play();
    });
    show3.onComplete.add(show2, this);

    function show2 () {
        var nextNum = game.add.tween(number.scale).to({x:0, y:0}, 100, Phaser.Easing.Out, true, 600, 0, false);
        nextNum.onComplete.add(function(){
            number.frame=1;
            var hide2 = game.add.tween(number.scale).to({x:1, y:1}, 500, Phaser.Easing.Back.Out, true, 200, 0, false);
            tickSound.play();
            hide2.onComplete.add(show1, this);
        }, this);
    }
    function show1 () {
        var nextNum = game.add.tween(number.scale).to({x:0, y:0}, 100, Phaser.Easing.Out, true, 400, 0, false);
        nextNum.onComplete.add(function(){
            number.frame=0;
            var hide1 = game.add.tween(number.scale).to({x:1, y:1}, 500, Phaser.Easing.Back.Out, true, 200, 0, false);
            tickSound.play();
            hide1.onComplete.add(function(){
                game.add.tween(number.scale).to({x:0, y:0}, 100, Phaser.Easing.Out, true, 600, 0, false);
                startNewGame();
            }, this);
        }, this);
    }
}

function startNewGame(){
    game.time.events.add(1000, function(){
        game.state.start('ballGame1');
    });
}




