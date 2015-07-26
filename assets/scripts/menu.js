var Menu = (function () {
    var menuSound;
    var Menu = {

        preload: function () {
            game.load.image('blackScreen', 'assets/images/blackscreen.png');
            game.load.image('startGame', 'assets/images/start.png');
            game.load.audio('music', 'assets/audio/music/music.mp3');
            game.load.audio('menu', 'assets/audio/music/menu.mp3');
        },


        create: function () {
            //var startGameScreen = game.add.group();
            //var background = startGameScreen.create(0, 0, 'blackScreen');
            menuSound = game.add.audio('menu');

            menuSound.play();

            this.add.button(120, 200, 'startGame', this.startGame, this);
            this.music = this.game.add.audio('music');
            this.music.volume = 0.5;
            this.music.loop = true;


        },

        startGame: function () {

            menuSound.stop();
            this.music.play();
            // Change the state to the actual game.
            this.state.start('Game');

        }
    };
    return Menu;
}());