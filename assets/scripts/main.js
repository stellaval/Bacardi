
var game;

game = new Phaser.Game(500, 600, Phaser.CANVAS, '');

// Adding the Game states.
game.state.add('Game', Game);

game.state.add('Menu', Menu);

game.state.add('Game_Over', Game_Over);

game.state.start('Menu');

