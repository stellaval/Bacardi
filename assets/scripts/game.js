var platforms,
    player,
    introText,
    cocktail,
    cocktailGroup,
    cocktailCounter = 0,
    scoreText,
    score = 0;

function getRandomSize(min, max) {
    return Math.random() * (max - min) + min;
}

var Game = {
    preload: function () {
        //pictures
        game.load.image('sky', 'assets/images/sky.png');
        game.load.image('ground', 'assets/images/platform.png');
        game.load.image('cocktail', 'assets/images/cocktail.png');
        game.load.image('bottom', 'assets/images/bottom.png');
        //sprites
        if (selectedCharacter == 'pig') {
            game.load.spritesheet('pig', 'assets/images/pig.png', 76, 57);
        } else {
            game.load.spritesheet('dude', 'assets/images/dude.png', 32, 48);
        
        //fonts
        game.load.bitmapFont('desyrel', 'assets/fonts/desyrel.png', 'assets/fonts/desyrel.xml');
        //audio files
        game.load.audio('music', 'assets/audio/music/GameMusic.mp3');
        game.load.audio('jump', 'assets/audio/effects/jump.mp3');

    },
    create: function () {
        var ground,
            background,
            sky,
            ledge,
            ledgeDistance = 150,
            ledgeSide = 1,
            ledgeAll = [],
            counter,
            isOnCloud = false;

        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.world.setBounds(0, 0, 500, 40550);

        background = game.add.group();
        sky = background.create(0, 0, 'sky');
        sky.scale.setTo(1, 150);

        //Create platforms

        platforms = game.add.group();
        platforms.enableBody = true;
        ground = platforms.create(0, game.world.height - 50, 'bottom');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;

        for (var i = 0, len = game.world.height - ledgeDistance; i < len; i += ledgeDistance) {
            ledge = platforms.create(250 * ledgeSide, i, 'ground');
            ledge.scale.setTo(getRandomSize(0.2, 0.8), 0.8);
            ledge.body.immovable = true;
            ledge.body.checkCollision.down = false;
            ledge.body.allowGravity = false;
            ledge.body.bounce.set(1);
            ledge.body.velocity.x = Math.random() * (200 - 50) + 50;
            ledge.body.collideWorldBounds = true;
            ledgeSide *= -1;
            ledgeAll.push(ledge);
        }

        //Create cocktails

        cocktailGroup = game.add.group();
        cocktailGroup.enableBody = true;
        game.physics.enable(cocktailGroup, Phaser.Physics.ARCADE);
        for (var i = ledgeDistance, len = game.world.height; i < len; i += ledgeDistance) {
            var randomXCocktail = Math.floor(getRandomSize(50, game.world.width - 50));
            cocktail = cocktailGroup.create(randomXCocktail, i - 50, 'cocktail');
            // cocktail.body.immovable = true;
        }

        //Create player

        player = game.add.sprite(game.world.centerX, game.world.height - 150, 'dude');
        game.physics.arcade.enable(player);
        player.body.velocity.setTo(200, 200);

        // player.body.bounce.setTo(0.8, 0);
        player.body.gravity.y = 800;
        player.body.collideWorldBounds = true;
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        player.body.drag.x = 120;

        game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN);

        drawScore();

        jump = game.add.audio('jump');
        //This was moved here so our dude doesnt move around before the start
        //of the game but it must not be inside the update function because it
        //prevents the dude from sliding!!!
        player.body.velocity.x = 0;

        //start music
        this.gameMusic = this.game.add.audio('music');
        this.gameMusic.volume = 4;
        this.gameMusic.loop = true;
        this.gameMusic.play();
    },
    update: function () {
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(player, cocktailGroup, collisionHandler, null);

        cursors = game.input.keyboard.createCursorKeys();

        if (cursors.left.isDown) {
            player.body.velocity.x = -150;
            // player.body.acceleration.x = -150;
            player.animations.play('left');
        } else if (cursors.right.isDown) {
            player.body.velocity.x = 150;
            // player.body.acceleration.x = 150;
            player.animations.play('right');
        } else {
            player.animations.stop();
            player.frame = 4;
        }

        if (cursors.up.isDown && player.body.touching.down) {
            jump.play();
            player.body.velocity.y = -550;
        }
        if (player.body.velocity.y > 600) {
            this.gameMusic.stop();
            game.state.start('Game_Over');
        }

        function collisionHandler(player, cocktail) {
            cocktailCounter++;
            cocktail.kill();
            score += 10;
            scoreText.setText('Score: ' + score);
        }
    }
};

function drawScore() {
    var scoreSprite = game.add.sprite(0, 0);
    scoreSprite.fixedToCamera = true;

    scoreText = game.add.bitmapText(0, -80, 'desyrel', 'Score: 0', 38);
    // scoreText = game.add.text(0, 0, 'Score: 0', { textSize: '22px', fill: '#fff' });
    scoreSprite.addChild(scoreText);

    scoreSprite.cameraOffset.x = 5;
    scoreSprite.cameraOffset.y = 85;
}