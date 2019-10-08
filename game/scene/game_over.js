class SceneGameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneGameOver', active: false });
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
        this.add.image(512, 384, 'game_over_sky');
        var play = this.add.image(700, 500, 'game_over_play');
        play.setInteractive();

        this.input.on('gameobjectdown', this.onClick, this);
        this.input.keyboard.on('keydown', this.onClick, this);
    }

    onClick(pointer, gameObject) {
        if (this.onClickExecuted) return;
        this.onClickExecuted = true;

        var GlobalScene = this.scene.manager.keys['SceneGlobal'];

        this.scene.start(GlobalScene.lastScene);
    }
}