function DoorManager() {}

DoorManager.prototype.preload = function(scene) {
    scene.load.image('level1_boss_door', './assets/boss_door_96_96.png');
}

DoorManager.prototype.create = function(scene) {
    scene.bossDoors           = scene.physics.add.group();

    let data = scene.cache.json.get('level1_data');
    if ( typeof data.bossDoors == 'object' ) {
        for (var dataIndex = 0; dataIndex < data.bossDoors.length; dataIndex++) {
            var block = data.bossDoors[dataIndex];

            this.createBlock(scene, block.x, block.y, block.texture);
        }
    }

}

DoorManager.prototype.update = function(scene) {
}

DoorManager.prototype.createBlock = function(scene, x, y, blockType) {
    var block = scene.bossDoors.create(x, y, blockType);
    block.body.moves = false;
    block.setInteractive();
}
