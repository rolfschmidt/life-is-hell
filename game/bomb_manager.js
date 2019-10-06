function BombManager() {}

BombManager.prototype.preload = function(scene) {
}

BombManager.prototype.create = function(scene) {
    scene.bombs = scene.physics.add.group();
}

BombManager.prototype.update = function(scene) {
}
