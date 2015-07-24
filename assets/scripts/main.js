var game;

game = new Phaser.Game(500, 600, Phaser.CANVAS, '');

game.state.add('Menu', Menu);

// Adding the Game state.
game.state.add('Game', Game);

game.state.add('Game_Over', Game_Over);

game.state.start('Game');