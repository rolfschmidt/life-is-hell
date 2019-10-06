var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    devMode: false,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false,
            width: 20000
        }
    },
    scene: [SceneGlobal, SceneIntro, SceneLevel1, SceneLevel1Boss, SceneGameOver]
};

var game = new Phaser.Game(config);
