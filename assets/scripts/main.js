var game;

game = new Phaser.Game(800, 800, Phaser.AUTO, '');
game.state.add('Menu', Menu);

// Adding the Game state.
game.state.add('Game', Game);

game.state.start('Menu');

game.state.add('Game_Over', Game_Over);