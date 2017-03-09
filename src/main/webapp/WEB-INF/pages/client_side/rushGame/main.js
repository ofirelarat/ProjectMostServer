var game = new Phaser.Game(540, 960, Phaser.AUTO, 'ld29', null, false, true);

game.state.add('rushGame', rushGame.rushGame);
game.state.add('rushGameEndGame', rushGame.rushGameEndGame);
game.state.add('rushGameTutorial', rushGame.rushGameTutorial);
game.state.add('rushGameCountDown', rushGame.rushGameCountDown);


game.state.start('rushGameTutorial');
