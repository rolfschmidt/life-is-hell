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

    for (var groundX = 420; groundX < 920; groundX = groundX + 32) {
        var blockType = 'level1_block_middle';
        if (groundX == 420) blockType = 'level1_block_left';
        if (groundX == 900) blockType = 'level1_block_right';
        scene.platforms.create(groundX, 400, blockType);
    }
    for (var groundX = 0; groundX < 320; groundX = groundX + 32) {
        var blockType = 'level1_block_middle';
        if (groundX == 0) blockType = 'level1_block_left';
        if (groundX == 320 - 32) blockType = 'level1_block_right';
        scene.platforms.create(groundX, 250, blockType);
    }
    for (var groundX = 750; groundX < 1070; groundX = groundX + 32) {
        var blockType = 'level1_block_middle';
        if (groundX == 750) blockType = 'level1_block_left';
        if (groundX == 1070 - 32) blockType = 'level1_block_right';
        scene.platforms.create(groundX, 220, blockType);
    }
    for (var groundX = 0; groundX < config.physics.arcade.width; groundX = groundX + 32) {
        var blockType = 'level1_block_middle';
        if (groundX == 0) blockType = 'level1_block_left';
        if (groundX == config.physics.arcade.width - 32) blockType = 'level1_block_right';
        scene.platforms.create(groundX, 568, blockType);
    }
}

PlatformManager.prototype.update = function(scene) {
}
