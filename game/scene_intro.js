class SceneIntro extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneIntro', active: false });
    }

    preload() {
        this.load.image('intro_sky', './assets/background_scene_intro_1024_768.png');
        this.load.image('intro_play', './assets/scene_intro_play_360_80.png');
        this.load.audio('intro_music', './sounds/intro.mp3');
    }

    create() {

        //  A simple background for our game
        this.add.image(512, 384, 'intro_sky');
        var play = this.add.image(512, 384, 'intro_play');

        play.setInteractive();

        this.input.on('gameobjectdown', this.onClick, this);

        // load intro music
        this.introMusic = this.sound.add('intro_music', {
            mute: false,
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