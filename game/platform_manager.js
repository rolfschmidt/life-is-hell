function PlatformManager() {}

PlatformManager.prototype.preload = function(scene) {
}

PlatformManager.prototype.create = function(scene) {
    scene.platforms = scene.physics.add.group({
      allowGravity: false,
      immovable: true
    });

    let data = scene.cache.json.get(scene.levelKey);
    if ( typeof data.platforms == 'object' ) {
        for (var dataIndex = 0; dataIndex < data.platforms.length; dataIndex++) {
            var block = data.platforms[dataIndex];

            this.createBlock(scene, block.x, block.y, block.texture);
        }
    }
}

PlatformManager.prototype.update = function(scene) {
}

PlatformManager.prototype.createBlock = function(scene, x, y, blockType) {
    var block = scene.platforms.create(x, y, blockType);
    block.setInteractive();
}
