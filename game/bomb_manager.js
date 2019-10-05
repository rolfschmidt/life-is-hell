function BombManager() {}

BombManager.prototype.preload = function(scene) {
    scene.load.image('level1_bomb', './assets/bomb.png');
}

BombManager.prototype.create = function(scene) {
    scene.bombs = scene.physics.add.group();
}

BombManager.prototype.update = function(scene) {
}
