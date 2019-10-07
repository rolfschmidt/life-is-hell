class SceneGameWin extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneGameWin', active: false });
    }

    preload() {
        this.load.audio('game_win_music', './sounds/game_win_32kbps.mp3');
    }

    create() {
        var GlobalScene = this.scene.manager.keys['SceneGlobal'];

        this.add.image(512, 384, 'game_win_sky');

        if (GlobalScene.sceneNextLevel) {
            var next = this.add.image(750, 500, 'game_win_next');
            next.setInteractive();
        }

        var menu = this.add.image(750, 700, 'game_win_menu');
        menu.setInteractive();

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
        var GlobalScene = this.scene.manager.keys['SceneGlobal'];

        this.gameWinMusic.stop();

        if ( gameObject.texture.key == 'game_win_next' ) {
            this.scene.start(GlobalScene.sceneNextLevel);
        }
        else {
            this.scene.start('SceneIntro');
        }
    }
}