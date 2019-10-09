function PlayerManager() {}

PlayerManager.prototype.preload = function(scene) {
}

PlayerManager.prototype.create = function(scene) {
    scene.player = scene.physics.add.sprite(100, 450, 'sprites', 'stand_right');
    scene.player.lastDirection = 'right';
    scene.player.setBounce(0.2);
    scene.player.setCollideWorldBounds(true);
    scene.player.godMode             = false;
    scene.player.godModeMoveSpeed    = 3;
    scene.player.godModeZoom         = 1;
    scene.player.store               = {};
    scene.player.store.velocityY     = 0;
    scene.player.store.jumpVelocityY = 0;
    scene.player.store.jumpCount     = 2;
    scene.player.store.jumpPossible  = true;
    scene.player.store.jumpUntil     = 0;
}

PlayerManager.prototype.update = function(scene) {
}
