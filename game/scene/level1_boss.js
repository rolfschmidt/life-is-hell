class SceneLevel1Boss extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneLevel1Boss', active: false });
    }

    preload() {
    }

    create() {

        return this.scene.start("SceneGameWin");

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