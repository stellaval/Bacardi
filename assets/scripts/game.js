var game,
    platforms,
    player;

game = new Phaser.Game(500, 600, Phaser.CANVAS, '', {preload: preload, create: create, update: update});

function preload() {
    game.load.image('sky', 'assets/images/sky.png');
    game.load.image('ground', 'assets/images/platform.png');
    game.load.image('star', 'assets/images/star.png');
    game.load.spritesheet('dude', 'assets/images/dude.png', 32, 48);
    game.load.image('bottom', 'assets/images/bottom.png');
}


function create() {
    var ground,
        background,
        sky,
        ledge,
        ledgeDistance = 150,
        ledgeSide = 1;

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.world.setBounds(0, 0, 500, 40610);

    background = game.add.group();
    sky = background.create(0, 0, 'sky');
    sky.scale.setTo(1, 150);

    platforms = game.add.group();
    platforms.enableBody = true;
    ground = platforms.create(0, game.world.height - 50, 'bottom');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;

    for (var i = ledgeDistance, len = game.world.height; i < len; i += ledgeDistance) {
        ledge = platforms.create(250 * ledgeSide, i, 'ground');
        ledge.body.immovable = true;
        ledgeSide *= -1;
    }

    player = game.add.sprite(32, game.world.height - 150, 'dude');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN);
}

function update() {
    game.physics.arcade.collide(player, platforms);

    cursors = game.input.keyboard.createCursorKeys();

    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        player.body.velocity.x = -150;
        player.animations.play('left');
    }
    else if (cursors.right.isDown) {
        player.body.velocity.x = 150;
        player.animations.play('right');
    }
    else {
        player.animations.stop();
        player.frame = 4;
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -350;
    }
    if(player.body.velocity.y > 350) {
        Game_Over();
    }
}

