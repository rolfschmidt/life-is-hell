function DoorManager() {}

DoorManager.prototype.preload = function(scene) {
    scene.load.image('level1_boss_door', './assets/boss_door_96_96.png');
}

DoorManager.prototype.create = function(scene) {
    scene.bossDoors           = scene.physics.add.group();
    scene.bossDoor            = scene.bossDoors.create(940, 156, 'level1_boss_door');
    scene.bossDoor.body.moves = false;
}

DoorManager.prototype.update = function(scene) {
}
