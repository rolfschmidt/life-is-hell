var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 748,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false,
            width: 20000
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var camera;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sky', './assets/background_1024_768.png');
    this.load.image('ground', './assets/platform.png');
    this.load.image('star', './assets/star.png');
    this.load.image('bomb', './assets/bomb.png');
    this.load.spritesheet('dude', './assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create ()
{
    //  A simple background for our game
    this.add.image(512, 384, 'sky');
    for (var backgroundX = 512; backgroundX < config.physics.arcade.width; backgroundX = backgroundX + 1024) {
        this.add.image(backgroundX - 512, 384, 'sky');
    }

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    //  Now let's create some ledges
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    for (var groundX = 200; groundX < 20000; groundX = groundX + 200) {
        platforms.create(groundX, 568, 'ground');

        groundX += 200;
    }

    // The player and its settings
    player = this.physics.add.sprite(100, 450, 'dude');

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);

    // disable bounds because we want to loop the background
    player.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(function (child) {

        //  Give each star a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    bombs = this.physics.add.group();

    //  The score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player, stars, collectStar, null, this);

    this.physics.add.collider(player, bombs, hitBomb, null, this);

    // add camera to follow the player
    camera = this.cameras.main;
    camera.useBounds = true;
    camera.setBounds(0, 0, 4096, 768, false);
    camera.startFollow(player);
}

function update ()
{
    if (gameOver)
    {
        return;
    }

    if (cursors.left.isDown)
    {
        player.setVelocityX(-560);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(560);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }
    if ( typeof player.store !== 'object' ) {
        player.store               = {};
        player.store.velocityY     = 0;
        player.store.jumpVelocityY = 0;
        player.store.jumpCount     = 2;
        player.store.jumpPossible  = true;
    }

    if (cursors.up.isDown && player.store.jumpCount > 0 && player.store.jumpPossible)
    {
        if (player.store.jumpCount == 2) {
            player.store.velocityY = Math.min(player.store.jumpVelocityY, -1000);
            player.store.jumpVelocityY -= 1000;
        }
        else {
            player.store.velocityY = Math.min(player.store.jumpVelocityY, -1500);
            player.store.jumpVelocityY -= 1500;
        }
        player.store.jumpCount -= 1;
        player.store.jumpPossible = false;
    }
    if ( !player.body.touching.down ) {
        player.store.velocityY += 75;
        player.store.jumpVelocityY += 75;
        if ( player.store.jumpVelocityY > 0 ) {
            player.store.jumpVelocityY = 0;
        }
    }
    if ( player.body.touching.down ) {
        player.store.jumpCount = 2;
        player.store.jumpPossible = true;
    }
    if ( !cursors.up.isDown ) {
        player.store.jumpPossible = true;
    }

    player.setVelocityY(player.store.velocityY);
}

function collectStar (player, star)
{
    star.disableBody(true, true);

    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);

    if (stars.countActive(true) === 0)
    {
        //  A new batch of stars to collect
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

    }
}

function hitBomb (player, bomb)
{
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
}
