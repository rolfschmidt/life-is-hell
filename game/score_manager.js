function ScoreManager() {}

ScoreManager.prototype.preload = function(scene) {
    scene.scoreCount = 0;
}

ScoreManager.prototype.create = function(scene) {
    scene.scoreText = scene.add.text(scene.cameras.main.centerX * (2 - scene.cameras.main.zoom), scene.cameras.main.centerY * (2 - scene.cameras.main.zoom), 'score: 0', { fontSize: '32px', fill: '#000' });
    scene.scoreText.setScrollFactor(0);
}

ScoreManager.prototype.update = function(scene) {
}
