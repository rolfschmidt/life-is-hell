class SceneGlobal extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneGlobal', active: true });
    }

    preload() {
        this.load.image('sky', './assets/background_1024_768.png');
        console.log('preload global');
    }

    create() {
        this.scene.start("SceneLevel1");
    }
}