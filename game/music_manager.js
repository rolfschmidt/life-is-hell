function MusicManager() {}

MusicManager.prototype.preload = function(scene) {
    scene.load.audio('level1_music', './sounds/level1.mp3');
}

MusicManager.prototype.create = function(scene) {
    scene.level1Music = scene.sound.add('level1_music', {
        mute: (config.devMode ? true : false),
        volume: 0.1,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0
    });
    scene.level1Music.play();
}

MusicManager.prototype.update = function(scene) {
}
