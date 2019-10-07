class SceneGameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneGameOver', active: false });
    }

    preload() {
        this.load.audio('game_over_music', './sounds/game_over_32kbps.mp3');
    }

    create() {

        //  A simple background for our game
        this.add.image(512, 384, 'game_over_sky');
        var play = this.add.image(700, 500, 'game_over_play');
        play.setInteractive();

        this.gameOverMusic = this.sound.add('game_over_music', {
            mute: (config.devMode ? true : false),
            volume: 0.1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });
        this.gameOverMusic.play();

        this.input.on('gameobjectdown', this.onClick, this);
    }

    onClick(pointer, gameObject) {
        var GlobalScene = this.scene.manager.keys['SceneGlobal'];

        this.gameOverMusic.stop();
        this.scene.start(GlobalScene.lastScene);
    }
}