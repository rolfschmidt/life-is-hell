class SceneLevel1 extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneLevel1', active: false });
    }

    preload() {
        this.StateManager      = new StateManager();
        this.MusicManager      = new MusicManager();
        this.BackgroundManager = new BackgroundManager();
        this.PlatformManager   = new PlatformManager();
        this.DoorManager       = new DoorManager();
        this.PlayerManager     = new PlayerManager();
        this.ControlManager    = new ControlManager();
        this.StarManager       = new StarManager();
        this.BombManager       = new BombManager();
        this.TrapManager       = new TrapManager();
        this.CollisionManager  = new CollisionManager();
        this.CameraManager     = new CameraManager();
        this.ScoreManager      = new ScoreManager();

        this.StateManager.preload(this);
        this.MusicManager.preload(this);
        this.BackgroundManager.preload(this);
        this.PlatformManager.preload(this);
        this.DoorManager.preload(this);
        this.PlayerManager.preload(this);
        this.ControlManager.preload(this);
        this.StarManager.preload(this);
        this.BombManager.preload(this);
        this.TrapManager.preload(this);
        this.CollisionManager.preload(this);
        this.CameraManager.preload(this);
        this.ScoreManager.preload(this);
    }

    create() {
        this.StateManager.create(this);
        this.MusicManager.create(this);
        this.BackgroundManager.create(this);
        this.PlatformManager.create(this);
        this.DoorManager.create(this);
        this.PlayerManager.create(this);
        this.ControlManager.create(this);
        this.StarManager.create(this);
        this.BombManager.create(this);
        this.TrapManager.create(this);
        this.CollisionManager.create(this);
        this.CameraManager.create(this);
        this.ScoreManager.create(this);
    }

    update () {
        if (this.StateManager.done) {
            return;
        }

        this.StateManager.update(this);
        this.MusicManager.update(this);
        this.BackgroundManager.update(this);
        this.PlatformManager.update(this);
        this.DoorManager.update(this);
        this.PlayerManager.update(this);
        this.ControlManager.update(this);
        this.StarManager.update(this);
        this.BombManager.update(this);
        this.TrapManager.update(this);
        this.CollisionManager.update(this);
        this.CameraManager.update(this);
        this.ScoreManager.update(this);
    }
}