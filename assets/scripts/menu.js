var selectedCharacter = 'dude';
var Menu = (function () {
    var menuSound,
        oink,
        dudeSound,
        piggy,
        dude,
        cat;

    var Menu = {
        preload: function () {
            game.load.image('blackScreen', 'assets/images/bacardi.jpg');
            game.load.image('makers','assets/images/makers.png' );
            game.load.image('cocktailMenu','assets/images/cocktailMenu.png' );
            game.load.image('selectPlayer', 'assets/images/playerSelect.png');
            //buttons
            game.load.image('pig', 'assets/images/pigButton.png');
            game.load.image('pigHover', 'assets/images/pigButtonHover.png');
            game.load.image('dude', 'assets/images/dudeButton.png');
            game.load.image('dudeHover', 'assets/images/dudeButtonHover.png');
            game.load.image('cat', 'assets/images/catButton.png');
            game.load.image('catHover', 'assets/images/catButtonHover.png');
            //audio
            game.load.audio('menu', 'assets/audio/music/Bacardi.lite.mp3');
            game.load.audio('oink', 'assets/audio/effects/oink.mp3');
            game.load.audio('dudeSound', 'assets/audio/effects/dudeSound.mp3');
            game.load.audio('meow', 'assets/audio/effects/meow.mp3');
        },

        create: function () {
            menuSound = game.add.audio('menu');
            menuSound.play();

            // adding background
            var background = game.add.image(0, 0, 'blackScreen');
            // adding  makers
            var makers = game.add.image(285, 425,'makers');
            //adding text
            game.add.image(0, 5, 'selectPlayer');

            // button sounds
            oink = game.add.audio('oink');
            dudeSound = game.add.audio('dudeSound');
            meow = game.add.audio('meow');

            // character selection
            piggy = this.add.button(160, 163, 'pig', this.choosePig, this);

            piggy.onInputOver.add(function() {
                piggy.loadTexture('pigHover');
                piggy.animations.play('pigHover');
                oink.play();
            }, this);

            piggy.onInputOut.add(function() {
                piggy.loadTexture('pig');
                piggy.animations.play('pig');
            }, this);

            dude = this.add.button(230, 163, 'dude', this.chooseDude, this);

            dude.onInputOver.add(function() {
                dude.loadTexture('dudeHover');
                dude.animations.play('dudeHover');
                dudeSound.play();
            }, this);

            dude.onInputOut.add(function() {
                dude.loadTexture('dude');
                dude.animations.play('dude');
            }, this);

            cat = this.add.button(300, 163, 'cat', this.chooseCat, this);

            cat.onInputOver.add(function() {
                cat.loadTexture('catHover');
                cat.animations.play('catHover');
                meow.play();
            }, this);

            cat.onInputOut.add(function() {
                cat.loadTexture('cat');
                cat.animations.play('cat');
            }, this);

            // add animation falling cocktails:)
            var emitter = game.add.emitter(100, 480);
            emitter.makeParticles('cocktailMenu');
            emitter.start(false, 3000, 200);

        },

        chooseCat: function () {
            selectedCharacter = 'cat';
            this.startGame();
        },

        choosePig: function () {
            selectedCharacter = 'pig';
            this.startGame();
        },

        chooseDude: function () {
            selectedCharacter = 'dude';
            this.startGame();
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