class SceneGlobal extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneGlobal', active: true });
    }

    preload() {
        console.log('preload global');
    }

    create() {
        this.scene.start( (config.devMode ? "SceneLevel1" : "SceneIntro") );
    }
}