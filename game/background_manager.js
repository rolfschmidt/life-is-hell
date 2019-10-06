function BackgroundManager() {}

BackgroundManager.prototype.preload = function(scene) {
}

BackgroundManager.prototype.create = function(scene) {
    scene.add.image(512, 384, 'level1_sky');
    for (var backgroundX = 512; backgroundX < config.physics.arcade.width + 1024; backgroundX = backgroundX + 1024) {
        scene.add.image(backgroundX - 512, 384, 'level1_sky');
    }
}

BackgroundManager.prototype.update = function(scene) {
}
