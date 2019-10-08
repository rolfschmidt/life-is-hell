class SceneGameWin extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneGameWin', active: false });
    }

    preload() {
        var GlobalScene = this.scene.manager.keys['SceneGlobal'];

        GlobalScene.MusicManager.preload(this);
    }

    create() {
        var GlobalScene = this.scene.manager.keys['SceneGlobal'];

        GlobalScene.MusicManager.create(this);

        this.onClickExecuted = false;

        var GlobalScene = this.scene.manager.keys['SceneGlobal'];

        this.add.image(512, 384, 'game_win_sky');

        if (GlobalScene.sceneNextLevel) {
            var next = this.add.image(750, 500, 'game_win_next');
            next.setInteractive();
        }

        var menu = this.add.image(750, 700, 'game_win_menu');
        menu.setInteractive();

        this.input.on('gameobjectdown', this.onClick, this);
        this.input.keyboard.on('keydown', this.startNewLevel, this);
    }

    startNewLevel(pointer, gameObject) {
        if (this.onClickExecuted) return;
        this.onClickExecuted = true;

        var GlobalScene = this.scene.manager.keys['SceneGlobal'];

        this.scene.start(GlobalScene.sceneNextLevel);
    }

    onClick(pointer, gameObject) {
        if (this.onClickExecuted) return;
        this.onClickExecuted = true;

        var GlobalScene = this.scene.manager.keys['SceneGlobal'];

        if ( gameObject.texture.key == 'game_win_next' ) {
            this.scene.start(GlobalScene.sceneNextLevel);
        }
        else {
            this.scene.start('SceneIntro');
        }
    }
}