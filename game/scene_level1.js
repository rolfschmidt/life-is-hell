class SceneLevel1 extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneLevel1', active: false });
    }

    preload() {
        this.load.image('level1_sky', './assets/background_scene_level1_1024_768.png');
        this.load.image('level1_block_lava', './assets/block_lava_32_32.png');
        this.load.image('level1_block_kill', './assets/block_kill_32_32.png');
        this.load.image('level1_block_middle', './assets/block_middle_32_32.png');
        this.load.image('level1_block_left', './assets/block_left_32_32.png');
        this.load.image('level1_block_right', './assets/block_right_32_32.png');
        this.load.image('level1_boss_door', './assets/boss_door_96_96.png');
        this.load.image('level1_star', './assets/star.png');
        this.load.image('level1_bomb', './assets/bomb.png');
        this.load.spritesheet('level1_dude', './assets/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.audio('level1_music', './sounds/level1.mp3');

        this.scoreCount = 0;
        this.gameOver = false;
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

        this.platforms = this.physics.add.staticGroup();

        for (var groundX = 420; groundX < 920; groundX = groundX + 32) {
            var blockType = 'level1_block_middle';
            if (groundX == 420) blockType = 'level1_block_left';
            if (groundX == 900) blockType = 'level1_block_right';
            this.platforms.create(groundX, 400, blockType);
        }
        for (var groundX = 0; groundX < 320; groundX = groundX + 32) {
            var blockType = 'level1_block_middle';
            if (groundX == 0) blockType = 'level1_block_left';
            if (groundX == 320 - 32) blockType = 'level1_block_right';
            this.platforms.create(groundX, 250, blockType);
        }
        for (var groundX = 750; groundX < 1070; groundX = groundX + 32) {
            var blockType = 'level1_block_middle';
            if (groundX == 750) blockType = 'level1_block_left';
            if (groundX == 1070 - 32) blockType = 'level1_block_right';
            this.platforms.create(groundX, 220, blockType);
        }
        for (var groundX = 0; groundX < config.physics.arcade.width; groundX = groundX + 32) {
            var blockType = 'level1_block_middle';
            if (groundX == 0) blockType = 'level1_block_left';
            if (groundX == config.physics.arcade.width - 32) blockType = 'level1_block_right';
            this.platforms.create(groundX, 568, blockType);
        }

        var bossDoors = this.physics.add.group();
        var bossDoor = bossDoors.create(940, 156, 'level1_boss_door');
        bossDoor.body.moves = false;

        // The this.player and its settings
        this.player = this.physics.add.sprite(100, 450, 'sprites', 'stand_right');

        this.player.lastDirection = 'right';

        //  this.Player physics properties. Give the little guy a slight bounce.
        this.player.setBounce(0.2);

        // disable bounds because we want to loop the background
        this.player.setCollideWorldBounds(true);

        // this.player default values
        this.player.godMode             = false;
        this.player.godModeMoveSpeed    = 3;
        this.player.godModeZoom         = 1;
        this.player.store               = {};
        this.player.store.velocityY     = 0;
        this.player.store.jumpVelocityY = 0;
        this.player.store.jumpCount     = 2;
        this.player.store.jumpPossible  = true;

        //  Input Events
        this.cursors     = this.input.keyboard.createCursorKeys();
        this.cursors.W   = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.cursors.A   = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.cursors.S   = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.cursors.D   = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.cursors.F9  = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F9);
        this.cursors.F10 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F10);

        //  Some this.stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
        this.stars = this.physics.add.group({
            key: 'level1_star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.stars.children.iterate(function (child) {

            //  Give each star a slightly different bounce
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });

        this.traps = this.physics.add.staticGroup();
        this.traps.create(940, 567, 'level1_block_kill');
        this.traps.create(940 + 32, 567, 'level1_block_lava');
        this.traps.create(940 + 64, 567, 'level1_block_lava');
        this.traps.create(940 + 96, 567, 'level1_block_lava');
        this.traps.create(940 + 128, 567, 'level1_block_kill');

        this.bombs = this.physics.add.group();

        //  Collide the this.player and the this.stars with the this.platforms
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, bossDoor);
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.traps, this.platforms);
        this.physics.add.collider(bossDoor, this.platforms);

        //  Checks to see if the this.player overlaps with any of the this.stars, if he does call the collectStar function
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
        this.physics.add.collider(this.player, this.traps, this.hitTrap, null, this);
        this.physics.add.collider(this.player, bossDoors, this.enterBoss, null, this);

        // add camera to follow the this.player
        this.cameras.main.useBounds = true;
        this.cameras.main.setBounds(0, 0, config.physics.arcade.width, 768, false);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.zoom         = 1.6;
        this.cameras.main.zoomGameplay = 1.6;

        this.scoreText = this.add.text(this.cameras.main.centerX * (2 - this.cameras.main.zoom), this.cameras.main.centerY * (2 - this.cameras.main.zoom), 'score: 0', { fontSize: '32px', fill: '#000' });
        this.scoreText.setScrollFactor(0);
    }

    update () {

        if (this.gameOver) {
            return;
        }

        // godmode on or off
        if (this.cursors.F9.isDown) {
            this.player.godMode    = true;
            this.player.body.moves = false;
            this.cameras.main.zoom = this.player.godModeZoom;
            this.scoreText.x = this.cameras.main.centerX * 0.01;
            this.scoreText.y = this.cameras.main.centerY * 0.01;
        }
        if (this.cursors.F10.isDown) {
            this.player.godMode    = false;
            this.player.body.moves = true;
            this.cameras.main.zoom = this.cameras.main.zoomGameplay;
            this.scoreText.x = this.cameras.main.centerX * (2 - this.cameras.main.zoom);
            this.scoreText.y = this.cameras.main.centerY * (2 - this.cameras.main.zoom);
        }

        if (this.cursors.left.isDown || this.cursors.A.isDown) {
            if (this.player.godMode) {
                this.player.x -= this.player.godModeMoveSpeed * 5;
            }

            this.player.setVelocityX(-560);
            this.player.lastDirection = 'left';
            this.player.anims.play('walk_left', true);
        }
        else if (this.cursors.right.isDown || this.cursors.D.isDown) {
            if (this.player.godMode) {
                this.player.x += this.player.godModeMoveSpeed * 5;
            }

            this.player.setVelocityX(560);
            this.player.lastDirection = 'right';
            this.player.anims.play('walk_right', true);
        }
        else {
            this.player.setVelocityX(0);

            this.player.anims.play('idle_' + this.player.lastDirection, true);
        }

        if ( this.player.godMode ) {
            if (this.cursors.up.isDown || this.cursors.W.isDown) {
                this.player.y -= this.player.godModeMoveSpeed * 5;
            }
            if (this.cursors.down.isDown || this.cursors.S.isDown) {
                this.player.y += this.player.godModeMoveSpeed * 5;
            }
        }
        else {

            if ((this.cursors.up.isDown || this.cursors.W.isDown) && this.player.store.jumpCount > 0 && this.player.store.jumpPossible) {
                if (this.player.store.jumpCount == 2) {
                    this.player.store.velocityY = Math.min(this.player.store.jumpVelocityY, -1000);
                    this.player.store.jumpVelocityY -= 1000;
                }
                else {
                    this.player.store.velocityY = Math.min(this.player.store.jumpVelocityY, -1500);
                    this.player.store.jumpVelocityY -= 1500;
                }
                this.player.store.jumpCount -= 1;
                this.player.store.jumpPossible = false;
            }
            if ( !this.player.body.touching.down ) {
                this.player.store.velocityY += 75;
                this.player.store.jumpVelocityY += 75;
                if ( this.player.store.jumpVelocityY > 0 ) {
                    this.player.store.jumpVelocityY = 0;
                }
            }
            if ( this.player.body.touching.down ) {
                this.player.store.jumpCount = 2;
                this.player.store.jumpPossible = true;
            }
            if ( !this.cursors.up.isDown && !this.cursors.W.isDown ) {
                this.player.store.jumpPossible = true;
            }

            this.player.setVelocityY(this.player.store.velocityY);
        }

    }

    collectStar (player, star) {
        star.disableBody(true, true);

        //  Add and update the score
        this.scoreCount += 10;
        if (player.godMode) this.scoreCount += 10000;
        this.scoreText.setText('score: ' + this.scoreCount);

        if (this.stars.countActive(true) === 0)
        {
            //  A new batch of this.stars to collect
            this.stars.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);

            });

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = this.bombs.create(x, 16, 'level1_bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

        }
    }

    hitTrap (player, trap) {
        if (player.godMode) return;
        if ( trap.x > player.x && trap.x - player.x > trap.width * 0.9 ) return;
        if ( player.x > trap.x && player.x - trap.x > trap.width * 0.9 ) return;

        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        this.gameOver = true;
    }

    hitBomb (player, bomb) {
        if (player.godMode) return;

        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        this.gameOver = true;
    }

    enterBoss(player, door) {
        if (player.godMode) return;
        if (!this.cursors.up.isDown && !this.cursors.W.isDown) return;

        this.level1Music.stop();
        this.scene.start("SceneLevel1Boss");
    }

}