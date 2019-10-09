function BossManager() {}

BossManager.prototype.preload = function(scene) {
}

BossManager.prototype.create = function(scene) {
    scene.boss = scene.physics.add.sprite(300, 450, 'sprites', 'boss_attack_left');
    scene.boss.setBounce(0.2);
    scene.boss.setCollideWorldBounds(true);
    scene.boss.anims.play('boss_attack_left', true);
    scene.boss.visible = false;
}

BossManager.prototype.update = function(scene) {
    // if (scene.player.godMode || config.devMode) {
    //     scene.boss.body.moves = false;
    //     return;
    // }

    // var yLow  = 0;
    // var yHigh = 0;
    // if (scene.boss.x < scene.player.x) {
    //     yLow = 50;
    //     yHigh = 300;
    // }
    // else {
    //     yLow = -300;
    //     yHigh = -50;
    // }

    // scene.boss.setVelocity(Phaser.Math.Between(yLow, yHigh), 0);
}
