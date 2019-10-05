class SceneGlobal extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneGlobal', active: true });
    }

    preload() {
        console.log('preload global');
    }

    create() {
        this.scene.start("SceneIntro");
    }
}