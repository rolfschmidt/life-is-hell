class SceneLevel1 extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneLevel1', active: false });
    }

    preload() {
        this.load.image('level1_sky', './assets/background_scene_level1_1024_768.png');
        this.load.image('level1_block_kill', './assets/block_kill_32_32.png');
        this.load.image('level1_block_middle', './assets/block_middle_32_32.png');
        this.load.image('level1_block_left', './assets/block_left_32_32.png');
        this.load.image('level1_block_right', './assets/block_right_32_32.png');
        this.load.image('level1_boss_door', './assets/boss_door_96_96.png');
        this.load.image('level1_star', './assets/star.png');
        this.load.image('level1_bomb', './assets/bomb.png');
        this.load.spritesheet('level1_dude', './assets/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.audio('level1_music', './sounds/level1.mp3');
    }

    create() {
        this.level1Music = this.sound.add('level1_music', {
            mute: (config.devMode ? true : false),
            volume: 0.1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });
        this.level1Music.play();

        //  A simple background for our game
        this.add.image(512, 384, 'level1_sky');
        for (var backgroundX = 512; backgroundX < config.physics.arcade.width + 1024; backgroundX = backgroundX + 1024) {
            this.add.image(backgroundX - 512, 384, 'level1_sky');
        }

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.physics.add.staticGroup();

        for (var groundX = 420; groundX < 920; groundX = groundX + 32) {
            var blockType = 'level1_block_middle';
            if (groundX == 420) blockType = 'level1_block_left';
            if (groundX == 900) blockType = 'level1_block_right';
            platforms.create(groundX, 400, blockType);
        }
        for (var groundX = 0; groundX < 320; groundX = groundX + 32) {
            var blockType = 'level1_block_middle';
            if (groundX == 0) blockType = 'level1_block_left';
            if (groundX == 320 - 32) blockType = 'level1_block_right';
            platforms.create(groundX, 250, blockType);
        }
        for (var groundX = 750; groundX < 1070; groundX = groundX + 32) {
            var blockType = 'level1_block_middle';
            if (groundX == 750) blockType = 'level1_block_left';
            if (groundX == 1070 - 32) blockType = 'level1_block_right';
            platforms.create(groundX, 220, blockType);
        }
        for (var groundX = 0; groundX < config.physics.arcade.width; groundX = groundX + 32) {
            var blockType = 'level1_block_middle';
            if (groundX == 0) blockType = 'level1_block_left';
            if (groundX == config.physics.arcade.width - 32) blockType = 'level1_block_right';
            platforms.create(groundX, 568, blockType);
        }

        var bossDoors = this.physics.add.group();
        var bossDoor = bossDoors.create(940, 156, 'level1_boss_door');
        bossDoor.body.moves = false;

        // The player and its settings
        player = this.physics.add.sprite(100, 450, 'level1_dude');

        //  Player physics properties. Give the little guy a slight bounce.
        player.setBounce(0.2);

        // disable bounds because we want to loop the background
        player.setCollideWorldBounds(true);

        // player default values
        player.godMode             = false;
        player.godModeMoveSpeed    = 3;
        player.store               = {};
        player.store.velocityY     = 0;
        player.store.jumpVelocityY = 0;
        player.store.jumpCount     = 2;
        player.store.jumpPossible  = true;

        //  Our player animations, turning, walking left and walking right.
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('level1_dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'level1_dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('level1_dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        //  Input Events
        cursors     = this.input.keyboard.createCursorKeys();
        cursors.W   = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        cursors.A   = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        cursors.S   = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        cursors.D   = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        cursors.F9  = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F9);
        cursors.F10 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F10);

        //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
        stars = this.physics.add.group({
            key: 'level1_star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        stars.children.iterate(function (child) {

            //  Give each star a slightly different bounce
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });

        traps = this.physics.add.staticGroup();
        var trap = traps.create(940, 567, 'level1_block_kill');

        bombs = this.physics.add.group();

        //  The score
        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        //  Collide the player and the stars with the platforms
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(player, bossDoor);
        this.physics.add.collider(stars, platforms);
        this.physics.add.collider(bombs, platforms);
        this.physics.add.collider(traps, platforms);
        this.physics.add.collider(bossDoor, platforms);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.physics.add.overlap(player, stars, this.collectStar, null, this);

        this.physics.add.collider(player, bombs, this.hitBomb, null, this);
        this.physics.add.collider(player, traps, this.hitTrap, null, this);
        this.physics.add.collider(player, bossDoors, this.enterBoss, null, this);

        // add camera to follow the player
        camera = this.cameras.main;
        camera.useBounds = true;
        camera.setBounds(0, 0, config.physics.arcade.width, 768, false);
        camera.startFollow(player);
    }

    update () {
        if (gameOver) {
            return;
        }

        // godmode on or off
        if (cursors.F9.isDown) {
            player.godMode    = true;
            player.body.moves = false;
        }
        if (cursors.F10.isDown) {
            player.godMode    = false;
            player.body.moves = true;
        }

        if (cursors.left.isDown || cursors.A.isDown) {
            if (player.godMode) {
                player.x -= player.godModeMoveSpeed * 5;
            }

            player.setVelocityX(-560);
            player.anims.play('left', true);
        }
        else if (cursors.right.isDown || cursors.D.isDown) {
            if (player.godMode) {
                player.x += player.godModeMoveSpeed * 5;
            }

            player.setVelocityX(560);
            player.anims.play('right', true);
        }
        else {
            player.setVelocityX(0);

            player.anims.play('turn');
        }

        if ( player.godMode ) {
            if (cursors.up.isDown || cursors.W.isDown) {
                player.y -= player.godModeMoveSpeed * 5;
            }
            if (cursors.down.isDown || cursors.S.isDown) {
                player.y += player.godModeMoveSpeed * 5;
            }
        }
        else {

            if ((cursors.up.isDown || cursors.W.isDown) && player.store.jumpCount > 0 && player.store.jumpPossible) {
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
            if ( !cursors.up.isDown && !cursors.W.isDown ) {
                player.store.jumpPossible = true;
            }

            player.setVelocityY(player.store.velocityY);
        }

    }

    collectStar (player, star) {
        star.disableBody(true, true);

        //  Add and update the score
        score += 10;
        if (player.godMode) score += 10000;
        scoreText.setText('Score: ' + score);

        if (stars.countActive(true) === 0)
        {
            //  A new batch of stars to collect
            stars.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);

            });

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = bombs.create(x, 16, 'level1_bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

        }
    }

    hitTrap (player, trap) {
        if (player.godMode) return;
        if ( trap.x - player.x > trap.width * 0.6 ) return;

        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        gameOver = true;
    }

    hitBomb (player, bomb) {
        if (player.godMode) return;

        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        gameOver = true;
    }

    enterBoss(player, door) {
        if (player.godMode) return;
        if (!cursors.up.isDown && !cursors.W.isDown) return;

        this.level1Music.stop();
        this.scene.start("SceneLevel1Boss");
    }

}