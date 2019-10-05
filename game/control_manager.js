function ControlManager() {}

ControlManager.prototype.preload = function(scene) {
}

ControlManager.prototype.create = function(scene) {
    scene.cursors       = scene.input.keyboard.createCursorKeys();
    scene.cursors.W     = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    scene.cursors.A     = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    scene.cursors.S     = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    scene.cursors.D     = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    scene.cursors.F9    = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F9);
    scene.cursors.F10   = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F10);
    scene.cursors.ONE   = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    scene.cursors.TWO   = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    scene.cursors.THREE = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
    scene.cursors.FOUR  = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
    scene.cursors.FIVE  = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE);
}

ControlManager.prototype.update = function(scene) {

   // godmode on or off
    if (scene.cursors.F9.isDown) {
        scene.player.godMode    = true;
        scene.player.body.moves = false;
        scene.cameras.main.zoom = scene.player.godModeZoom;
        scene.scoreText.x = scene.cameras.main.centerX * 0.01;
        scene.scoreText.y = scene.cameras.main.centerY * 0.01;
    }
    if (scene.cursors.F10.isDown) {
        scene.player.godMode    = false;
        scene.player.body.moves = true;
        scene.cameras.main.zoom = scene.cameras.main.zoomGameplay;
        scene.scoreText.x = scene.cameras.main.centerX * (2 - scene.cameras.main.zoom);
        scene.scoreText.y = scene.cameras.main.centerY * (2 - scene.cameras.main.zoom);
    }

    if (scene.cursors.left.isDown || scene.cursors.A.isDown) {
        if (scene.player.godMode) {
            scene.player.x -= scene.player.godModeMoveSpeed * 5;
        }

        scene.player.setVelocityX(-560);
        scene.player.lastDirection = 'left';
        scene.player.anims.play('walk_left', true);
    }
    else if (scene.cursors.right.isDown || scene.cursors.D.isDown) {
        if (scene.player.godMode) {
            scene.player.x += scene.player.godModeMoveSpeed * 5;
        }

        scene.player.setVelocityX(560);
        scene.player.lastDirection = 'right';
        scene.player.anims.play('walk_right', true);
    }
    else {
        scene.player.setVelocityX(0);

        scene.player.anims.play('idle_' + scene.player.lastDirection, true);
    }

    if ( scene.player.godMode ) {
        if (scene.cursors.up.isDown || scene.cursors.W.isDown) {
            scene.player.y -= scene.player.godModeMoveSpeed * 5;
        }
        if (scene.cursors.down.isDown || scene.cursors.S.isDown) {
            scene.player.y += scene.player.godModeMoveSpeed * 5;
        }
    }
    else {

        if ((scene.cursors.up.isDown || scene.cursors.W.isDown) && scene.player.store.jumpCount > 0 && scene.player.store.jumpPossible) {
            if (scene.player.store.jumpCount == 2) {
                scene.player.store.velocityY = Math.min(scene.player.store.jumpVelocityY, -1000);
                scene.player.store.jumpVelocityY -= 1000;
            }
            else {
                scene.player.store.velocityY = Math.min(scene.player.store.jumpVelocityY, -1500);
                scene.player.store.jumpVelocityY -= 1500;
            }
            scene.player.store.jumpCount -= 1;
            scene.player.store.jumpPossible = false;
        }
        if ( !scene.player.body.touching.down ) {
            scene.player.store.velocityY += 75;
            scene.player.store.jumpVelocityY += 75;
            if ( scene.player.store.jumpVelocityY > 0 ) {
                scene.player.store.jumpVelocityY = 0;
            }
        }
        if ( scene.player.body.touching.down ) {
            scene.player.store.jumpCount = 2;
            scene.player.store.jumpPossible = true;
        }
        if ( !scene.cursors.up.isDown && !scene.cursors.W.isDown ) {
            scene.player.store.jumpPossible = true;
        }

        scene.player.setVelocityY(scene.player.store.velocityY);
    }
}
