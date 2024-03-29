class SceneGlobal extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneGlobal', active: true });
    }

    preload() {
        this.load.atlas('sprites', './assets/spritesheet.png', './assets/sprites.json');

        var that = this;
        spriteManifest['images'].forEach(function(imageName) {
          that.load.image(imageName, './assets/images/'+ imageName +'.png');
        });

        this.load.json('level1_data', './game/scene/level1/objects.json');
        this.load.json('level2_data', './game/scene/level2/objects.json');
        this.load.json('level3_data', './game/scene/level3/objects.json');
        this.load.json('level4_data', './game/scene/level4/objects.json');
        this.load.json('level5_data', './game/scene/level5/objects.json');

        this.StateManager       = new StateManager();
        this.MusicManager       = new MusicManager();
        this.BackgroundManager  = new BackgroundManager();
        this.PlatformManager    = new PlatformManager();
        this.DoorManager        = new DoorManager();
        this.PlayerManager      = new PlayerManager();
        this.BossManager        = new BossManager();
        this.ControlManager     = new ControlManager();
        this.StarManager        = new StarManager();
        this.BombManager        = new BombManager();
        this.TrapManager        = new TrapManager();
        this.CollisionManager   = new CollisionManager();
        this.CameraManager      = new CameraManager();
        this.ScoreManager       = new ScoreManager();
        this.LevelEditorManager = new LevelEditorManager();
    }

    create() {
        this.gameDifficulty = 'hell';

        for (var frameName in spriteManifest['animations']) {

            var frameStart = 1
            var frameEnd   = spriteManifest['animations'][frameName]['size']
            var frameRate  = spriteManifest['animations'][frameName]['frame_rate']

            this.anims.create({
                key: frameName,
                frames: this.anims.generateFrameNames('sprites',
                        {
                            prefix:  frameName + '_',
                            start:   frameStart,
                            end:     frameEnd,
                            zeroPad: 2,
                        }),
                frameRate: frameRate,
                repeat: -1
            });
        }

        this.scene.start((config.devMode ? "SceneLevel1" : "SceneIntro"));
    }
}