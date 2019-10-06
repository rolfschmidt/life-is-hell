function PlatformManager() {}

PlatformManager.prototype.preload = function(scene) {
    scene.load.image('level1_block_lava', './assets/block_lava_32_32.png');
    scene.load.image('level1_block_kill', './assets/block_kill_32_32.png');
    scene.load.image('level1_block_middle', './assets/block_middle_32_32.png');
    scene.load.image('level1_block_left', './assets/block_left_32_32.png');
    scene.load.image('level1_block_right', './assets/block_right_32_32.png');
}

PlatformManager.prototype.create = function(scene) {
    scene.platforms = scene.physics.add.staticGroup();

    let data = scene.cache.json.get('level1_data');
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
