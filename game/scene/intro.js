class SceneIntro extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneIntro', active: false });
    }

    preload() {
        this.load.audio('intro_music', './sounds/intro_32kbps.mp3');
    }

    create() {

        //  A simple background for our game
        this.add.image(512, 384, 'intro_sky');

        var play = this.add.image(512, 270, 'intro_play');
        play.setInteractive();

        this.input.on('gameobjectdown', this.onClick, this);

        // load intro music
        this.introMusic = this.sound.add('intro_music', {
            mute: (config.devMode ? true : false),
            volume: 0.1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });
        this.introMusic.play();
    }

    onClick(pointer, gameObject) {
        this.introMusic.stop();
        this.scene.start("SceneLevel1");
    }
}