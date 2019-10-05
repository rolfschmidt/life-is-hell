class SceneIntro extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneIntro', active: false });
    }

    preload() {
        this.load.audio('intro', './sounds/intro.mp3');
    }

    create() {

        //  A simple background for our game
        this.add.image(512, 384, 'sky');

        // load intro music
        var music = this.sound.add('intro', {
            mute: false,
            volume: 0.1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });
        music.play();
        console.log('create intro');
    }
}