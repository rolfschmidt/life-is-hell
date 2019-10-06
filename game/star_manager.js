function StarManager() {}

StarManager.prototype.preload = function(scene) {
}

StarManager.prototype.create = function(scene) {

    //  Some scene.stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    scene.stars = scene.physics.add.group();

    let data = scene.cache.json.get('level1_data');
    if ( typeof data.stars == 'object' ) {
        for (var dataIndex = 0; dataIndex < data.stars.length; dataIndex++) {
            var block = data.stars[dataIndex];

            this.createBlock(scene, block.x, block.y - 100, block.texture);
        }
    }
}

StarManager.prototype.update = function(scene) {
}

StarManager.prototype.createBlock = function(scene, x, y, blockType) {
    var block = scene.stars.create(x, y, blockType);
    block.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    block.setInteractive();
}

