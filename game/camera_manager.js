function CameraManager() {}

CameraManager.prototype.preload = function(scene) {
}

CameraManager.prototype.create = function(scene) {
    scene.cameras.main.useBounds = true;
    scene.cameras.main.setBounds(0, 0, config.physics.arcade.width, 768, false);
    scene.cameras.main.startFollow(scene.player);
    scene.cameras.main.zoom         = 1.6;
    scene.cameras.main.zoomGameplay = 1.6;
}

CameraManager.prototype.update = function(scene) {
}
