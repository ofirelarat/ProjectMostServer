var game = new Phaser.Game(540, 960, Phaser.AUTO, 'ld29', null, false, true);

game.state.add('memoGame', memoGame.memoGame);
game.state.add('memoGameEndGame', memoGame.memoGameEndGame);
game.state.add('memoGameTutorial', memoGame.memoGameTutorial);
game.state.add('memoGameCountDown', memoGame.memoGameCountDown);


game.state.start('memoGameTutorial');
