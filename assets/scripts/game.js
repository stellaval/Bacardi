var game,
    platforms,
    player,
    introText,
    cocktail,
    cocktailGroup,
    cocktailCounter = 0,
    score;

game = new Phaser.Game(500, 600, Phaser.CANVAS, '', {
    preload: preload,
    create: create,
    update: update
});

function preload() {
    game.load.image('sky', 'assets/images/sky.png');
    game.load.image('ground', 'assets/images/platform.png');
    game.load.image('cocktail', 'assets/images/cocktail.png');
    game.load.spritesheet('dude', 'assets/images/dude.png', 32, 48);
    game.load.image('bottom', 'assets/images/bottom.png');
}


function create() {
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

    game.world.setBounds(0, 0, 500, 40610);

    background = game.add.group();
    sky = background.create(0, 0, 'sky');
    sky.scale.setTo(1, 150);


    //Create cocktails
    cocktailGroup = game.add.group();
    cocktailGroup.enableBody = true; 
    game.physics.enable(cocktailGroup, Phaser.Physics.ARCADE);   
    for (var i = ledgeDistance, len = game.world.height; i < len; i+= ledgeDistance/2){
        var randomXCocktail = Math.floor(game.world.width * Math.random()) - 50;
        cocktail = cocktailGroup.create(randomXCocktail, i, 'cocktail');  
        cocktail.body.immovable = true;
    }

    //Create platforms
    platforms = game.add.group();
    platforms.enableBody = true;
    ground = platforms.create(0, game.world.height - 50, 'bottom');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;

    for (var i = ledgeDistance, len = game.world.height; i < len; i += ledgeDistance) {
        ledge = platforms.create(250 * ledgeSide, i, 'ground');
        ledge.body.immovable = true;
        ledgeSide *= -1;
        ledgeAll.push(ledge);
    }

    //Create player
    player = game.add.sprite(game.world.centerX, game.world.height - 150, 'dude');
    game.physics.arcade.enable(player);

    introText = game.add.text(200, game.world.height - 400, 'START\nGAME', {
        font: "40px Arial",
        fill: "#ffffff",
        align: "center"
    });
    introText.inputEnabled = true;
    introText.visible = true;
    introText.events.onInputDown.add(enablePlayer, this);    

    function enablePlayer() {
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        introText.visible = false;
    }

    game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN);

     //Show score in game world  - DOES NOT SHOW !! )):  used: http://phaser.io/examples/v2/text/update-text 
    score = game.add.text(game.world.width/2, 0, 'SCORE ');
    score.anchor.setTo(0.5, 0.5);
}

function update() {
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(player, cocktailGroup, collisionHandler, null);

    cursors = game.input.keyboard.createCursorKeys();

    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        player.body.velocity.x = -150;
        player.animations.play('left');
    } else if (cursors.right.isDown) {
        player.body.velocity.x = 150;
        player.animations.play('right');
    } else {
        player.animations.stop();
        player.frame = 4;
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -350;
    }
    if (player.body.velocity.y > 350) {
        Game_Over();
    }
}

function collisionHandler (player, cocktail) {
    cocktailCounter++;
    cocktail.kill();
    updateScore();
}
function updateScore() {
    score.setText('SCORE ' + cocktailCounter);
}
