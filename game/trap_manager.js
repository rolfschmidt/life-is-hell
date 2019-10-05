function TrapManager() {}

TrapManager.prototype.preload = function(scene) {
}

TrapManager.prototype.create = function(scene) {
    scene.traps = scene.physics.add.staticGroup();
    scene.traps.create(940, 567, 'level1_block_kill');
    scene.traps.create(940 + 32, 567, 'level1_block_lava');
    scene.traps.create(940 + 64, 567, 'level1_block_lava');
    scene.traps.create(940 + 96, 567, 'level1_block_lava');
    scene.traps.create(940 + 128, 567, 'level1_block_kill');
}

TrapManager.prototype.update = function(scene) {
}
