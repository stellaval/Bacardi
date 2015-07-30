var Game_Over = (function () {

    var Game_Over = {

        preload: function () {
            game.load.image('gameover', 'assets/images/gameover.png');
            game.load.image('playAgain', 'assets/images/PlayAgain.png');
            game.load.audio('gameOverSound', 'assets/audio/music/gameOverSound.mp3');
        },

        create: function () {
            //Add game over image
            var gameOverScreen = game.add.group();
            var backgroundEnd = gameOverScreen.create(0, 0, 'gameover');
            var gameOverSound = game.add.audio('gameOverSound');

            // Create button to start game like in Menu.
            this.add.button(225, 398, 'playAgain', this.startGame, this);

            // Add text with information about the score from last game.
            game.add.text(235, 348, "LAST SCORE", {font: "bold 16px sans-serif", fill: "#ffffff", align: "center"});
            game.add.text(350, 348, score.toString(), {font: "bold 20px sans-serif", fill: "#fff", align: "center"});
            score = 0;

            gameOverSound.play();
        },

        startGame: function () {
            // Change the state back to Game.
            game.state.start('Game');
        }
    };
    return Game_Over;
}());