function ScoreManager() {}

ScoreManager.prototype.preload = function(scene) {
    scene.scoreCount = 0;
}

ScoreManager.prototype.create = function(scene) {
    var GlobalScene = scene.scene.manager.keys['SceneGlobal'];

    scene.scoreText = scene.add.text(scene.cameras.main.centerX * (2 - scene.cameras.main.zoom), scene.cameras.main.centerY * (2 - scene.cameras.main.zoom), GlobalScene.ScoreManager.text(scene), { fontSize: '32px', fill: '#000' });
    scene.scoreText.setScrollFactor(0);
}

ScoreManager.prototype.update = function(scene) {
}

ScoreManager.prototype.text = function(scene) {
    return ( scene.scoreCount / 100 ) + ' x ★';
}

ScoreManager.prototype.refresh = function(scene) {
    var GlobalScene = scene.scene.manager.keys['SceneGlobal'];

    scene.scoreText.setText(GlobalScene.ScoreManager.text(scene));
}
