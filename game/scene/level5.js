class SceneLevel5 extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneLevel5', active: false });
    }

    preload() {
        var GlobalScene = this.scene.manager.keys['SceneGlobal'];

        GlobalScene.StateManager.preload(this);
        GlobalScene.MusicManager.preload(this);
        GlobalScene.BackgroundManager.preload(this);
        GlobalScene.PlatformManager.preload(this);
        GlobalScene.DoorManager.preload(this);
        GlobalScene.PlayerManager.preload(this);
        GlobalScene.BossManager.preload(this);
        GlobalScene.ControlManager.preload(this);
        GlobalScene.StarManager.preload(this);
        GlobalScene.BombManager.preload(this);
        GlobalScene.TrapManager.preload(this);
        GlobalScene.CollisionManager.preload(this);
        GlobalScene.CameraManager.preload(this);
        GlobalScene.ScoreManager.preload(this);
        GlobalScene.LevelEditorManager.preload(this);
    }

    create() {
        var GlobalScene = this.scene.manager.keys['SceneGlobal'];

        this.levelKey         = 'level5_data';
        GlobalScene.lastScene = 'SceneLevel5';

        GlobalScene.StateManager.create(this);
        GlobalScene.MusicManager.create(this);
        GlobalScene.BackgroundManager.create(this);
        GlobalScene.PlatformManager.create(this);
        GlobalScene.DoorManager.create(this);
        GlobalScene.PlayerManager.create(this);
        GlobalScene.BossManager.create(this);
        GlobalScene.ControlManager.create(this);
        GlobalScene.StarManager.create(this);
        GlobalScene.BombManager.create(this);
        GlobalScene.TrapManager.create(this);
        GlobalScene.CollisionManager.create(this);
        GlobalScene.CameraManager.create(this);
        GlobalScene.ScoreManager.create(this);
        GlobalScene.LevelEditorManager.create(this);
    }

    update () {
        var GlobalScene = this.scene.manager.keys['SceneGlobal'];

        if (GlobalScene.StateManager.done) {
            return;
        }

        GlobalScene.StateManager.update(this);
        GlobalScene.MusicManager.update(this);
        GlobalScene.BackgroundManager.update(this);
        GlobalScene.PlatformManager.update(this);
        GlobalScene.DoorManager.update(this);
        GlobalScene.PlayerManager.update(this);
        GlobalScene.BossManager.update(this);
        GlobalScene.ControlManager.update(this);
        GlobalScene.StarManager.update(this);
        GlobalScene.BombManager.update(this);
        GlobalScene.TrapManager.update(this);
        GlobalScene.CollisionManager.update(this);
        GlobalScene.CameraManager.update(this);
        GlobalScene.ScoreManager.update(this);
        GlobalScene.LevelEditorManager.update(this);
    }
}