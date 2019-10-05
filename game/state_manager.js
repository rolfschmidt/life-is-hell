function StateManager() {}

StateManager.prototype.preload = function(scene) {
}

StateManager.prototype.create = function(scene) {
    scene.done = false;
}

StateManager.prototype.update = function(scene) {
}

StateManager.prototype.hitTrap = function(scene) {
    scene.done = true;
}

StateManager.prototype.hitBomb = function(scene) {
    scene.done = true;
}
