function StarManager() {}

StarManager.prototype.preload = function(scene) {
    scene.load.image('level1_star', './assets/star.png');
}

StarManager.prototype.create = function(scene) {

    //  Some scene.stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    scene.stars = scene.physics.add.group({
        key: 'level1_star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    scene.stars.children.iterate(function (child) {

        //  Give each star a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });
}

StarManager.prototype.update = function(scene) {
}
