var Menu = (function () {
    var menuSound;
    var Menu = {

        preload: function () {
            game.load.image('blackScreen', 'assets/images/bacardi.jpg');
            game.load.image('makers','assets/images/makers.png' );
            game.load.image('startGame', 'assets/images/start.png');
            game.load.image('cocktailMenu','assets/images/cocktailMenu.png' );
            //game.load.audio('music', 'assets/audio/music/music.mp3');
            game.load.audio('menu', 'assets/audio/music/menu.mp3');
        },


        create: function () {
            //var startGameScreen = game.add.group();
           // var background = startGameScreen.create(0, 0, 'blackScreen');
            menuSound = game.add.audio('menu');
            menuSound.play();

            // adding background
            var background = game.add.image(0, 0, 'blackScreen');
            //adding  makers
            var makers = game.add.image(285,425,'makers');

            this.add.button(120, 200, 'startGame', this.startGame, this);

            // add animation falling cocktails:)
            var emitter = game.add.emitter(100, 480);
            emitter.makeParticles('cocktailMenu');
            emitter.start(false, 3000, 200);




        },

        startGame: function () {

            menuSound.stop();
            // Change the state to the actual game.
            this.state.start('Game');

        }
    };
    return Menu;
}());