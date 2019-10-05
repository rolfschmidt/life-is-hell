class SceneLevel1Boss extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneLevel1Boss', active: false });
    }

    preload() {
        this.load.image('level1_boss_sky', './assets/background_scene_level1_boss_1024_768.png');
        this.load.audio('level1_boss_music', './sounds/level1_boss.mp3');
    }

    create() {

        //  A simple background for our game
        this.add.image(512, 384, 'level1_boss_sky');

        // load intro music
        this.level1BossMusic = this.sound.add('level1_boss_music', {
            mute: (config.devMode ? true : false),
            volume: 0.1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });
        this.level1BossMusic.play();
    }
}