//var game = new Phaser.Game(540, 960, Phaser.AUTO);

var game = new Phaser.Game(540, 960, Phaser.AUTO, 'ld29', null, false, true);

game.state.add('ballGame1', ballGame.ballGame1);
game.state.add('ballGameEndGame', ballGame.ballGameEndGame);
game.state.add('ballGameTutorial', ballGame.ballGameTutorial);
game.state.add('ballGameCountDown', ballGame.ballGameCountDown);
game.state.add('preloader', ballGame.preloader);


game.state.start('preloader');
