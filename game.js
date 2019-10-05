var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    devMode: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false,
            width: 20000
        }
    },
    scene: [SceneGlobal, SceneIntro, SceneLevel1]
};

var player;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var camera;

var game = new Phaser.Game(config);
