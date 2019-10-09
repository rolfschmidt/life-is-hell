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

        var playEasy = this.add.image(250, 270, 'intro_play_easy');
        playEasy.setInteractive();
        var playHard = this.add.image(500, 270, 'intro_play_hard');
        playHard.setInteractive();
        var playHell = this.add.image(750, 270, 'intro_play_hell');
        playHell.setInteractive();

        var sceneIntro = this;
        this.input.on('gameobjectdown', function(pointer, gameObject) {
            this.onClick(sceneIntro, pointer, gameObject);
        }, this);
    }

    onClick(sceneIntro, pointer, gameObject) {
        var GlobalScene = sceneIntro.scene.manager.keys['SceneGlobal'];

        if (this.onClickExecuted) return;
        this.onClickExecuted = true;

        GlobalScene.gameDifficulty = 'easy';
        if ( gameObject.texture.key == 'intro_play_hard' ) {
            GlobalScene.gameDifficulty = 'hard';
        }
        if ( gameObject.texture.key == 'intro_play_hell' ) {
            GlobalScene.gameDifficulty = 'hell';
        }

        this.scene.start("SceneLevel1");
    }
}