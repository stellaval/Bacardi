var selectedCharacter = 'dude';
var Menu = (function () {
    var menuSound,
        oink,
        dudeSound;
    var Menu = {

        preload: function () {
            game.load.image('blackScreen', 'assets/images/bacardi.jpg');
            game.load.image('makers','assets/images/makers.png' );
            game.load.image('startGame', 'assets/images/startGame.png');
            game.load.image('pig', 'assets/images/pigButton.png');
            game.load.image('dude', 'assets/images/dudeButton.png');
            game.load.image('cocktailMenu','assets/images/cocktailMenu.png' );
            //game.load.audio('music', 'assets/audio/music/music.mp3');
            game.load.audio('menu', 'assets/audio/music/Bacardi.mp3');
            game.load.audio('oink', 'assets/audio/effects/oink.mp3');
            game.load.audio('dudeSound', 'assets/audio/effects/dudeSound.mp3');
        },


        create: function () {
            //var startGameScreen = game.add.group();
           // var background = startGameScreen.create(0, 0, 'blackScreen');
            menuSound = game.add.audio('menu');
            menuSound.play();

            // adding background
            var background = game.add.image(0, 0, 'blackScreen');
            // adding  makers
            var makers = game.add.image(285,425,'makers');
            // start button
            this.add.button(165, 100, 'startGame', this.startGame, this);
            // character selection
            this.add.button(165,157, 'pig', this.choosePig, this);
            this.add.button(260,157, 'dude', this.chooseDude, this);
            // button sounds
            oink = game.add.audio('oink');
            dudeSound = game.add.audio('dudeSound');

            // add animation falling cocktails:)
            var emitter = game.add.emitter(100, 480);
            emitter.makeParticles('cocktailMenu');
            emitter.start(false, 3000, 200);




        },

        choosePig: function () {
            oink.play();
            selectedCharacter = 'pig';
        },

        chooseDude: function () {
            dudeSound.play();
            selectedCharacter = 'dude';
        },

        startGame: function () {

            menuSound.stop();
            // Change the state to the actual game.
            this.state.start('Game');
            console.log(selectedCharacter);

        }
    };
    return Menu;
}());