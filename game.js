var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    devMode: false,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 3000 },
            debug: false,
            width: 20000
        }
    },
    scene: [SceneGlobal, SceneIntro, SceneLevel1, SceneLevel2, SceneLevel3, SceneLevel4, SceneLevel5, SceneLevel1Boss, SceneGameOver, SceneGameWin]
};

var game = new Phaser.Game(config);
