var game = new Phaser.Game(540, 960, Phaser.AUTO, 'ld29', null, false, true);

game.state.add('colorGame', colorGame.colorGame);
game.state.add('colorGameEndGame', colorGame.colorGameEndGame);
game.state.add('colorGameTutorial', colorGame.colorGameTutorial);
game.state.add('colorGameCountDown', colorGame.colorGameCountDown);


game.state.start('colorGameTutorial');
