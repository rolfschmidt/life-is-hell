class SceneGameWin extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneGameWin', active: false });
    }

    preload() {
        this.load.audio('game_win_music', './sounds/game_win_32kbps.mp3');
    }

    create() {

        //  A simple background for our game
        this.add.image(512, 384, 'game_win_sky');
        var play = this.add.image(750, 500, 'game_win_play');

        play.setInteractive();

        this.input.on('gameobjectdown', this.onClick, this);

        this.gameWinMusic = this.sound.add('game_win_music', {
            mute: (config.devMode ? true : false),
            volume: 0.1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });
        this.gameWinMusic.play();
    }

    onClick(pointer, gameObject) {
        this.gameWinMusic.stop();
        this.scene.start("SceneLevel1");
    }
}