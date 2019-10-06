function TrapManager() {}

TrapManager.prototype.preload = function(scene) {
}

TrapManager.prototype.create = function(scene) {
    scene.traps = scene.physics.add.staticGroup();

    let data = scene.cache.json.get('level1_data');
    if ( typeof data.traps == 'object' ) {
        for (var dataIndex = 0; dataIndex < data.traps.length; dataIndex++) {
            var block = data.traps[dataIndex];

            this.createBlock(scene, block.x, block.y, block.texture);
        }
    }
}

TrapManager.prototype.update = function(scene) {
}

TrapManager.prototype.createBlock = function(scene, x, y, blockType) {
    var block = scene.traps.create(x, y, blockType);
    block.setInteractive();
}
