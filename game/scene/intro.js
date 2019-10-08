class SceneIntro extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneIntro', active: false });
    }

    preload() {
        var GlobalScene = this.scene.manager.keys['SceneGlobal'];

        GlobalScene.MusicManager.preload(this);
    }

    create() {
        var GlobalScene = this.scene.manager.keys['SceneGlobal'];

        GlobalScene.MusicManager.create(this);

        this.onClickExecuted = false;

        //  A simple background for our game
        this.add.image(512, 384, 'intro_sky');

        var play = this.add.image(512, 270, 'intro_play');
        play.setInteractive();

        this.input.on('gameobjectdown', this.onClick, this);
        this.input.keyboard.on('keydown', this.onClick, this);
    }

    onClick(pointer, gameObject) {
        if (this.onClickExecuted) return;
        this.onClickExecuted = true;

        this.scene.start("SceneLevel1");
    }
}