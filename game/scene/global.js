class SceneGlobal extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneGlobal', active: true });
    }

    preload() {
        console.log('preload global');
        this.load.atlas('sprites', './assets/spritesheet.png', './assets/sprites.json');

        this.StateManager       = new StateManager();
        this.MusicManager       = new MusicManager();
        this.BackgroundManager  = new BackgroundManager();
        this.PlatformManager    = new PlatformManager();
        this.DoorManager        = new DoorManager();
        this.PlayerManager      = new PlayerManager();
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
        var spriteManifest = {
          "animations": {
            "walk_left": {
              "size": 4,
              "frame_rate": 10
            },
            "power_jump_left": {
              "size": 1,
              "frame_rate": 10
            },
            "punch_left": {
              "size": 1,
              "frame_rate": 10
            },
            "idle_left": {
              "size": 2,
              "frame_rate": 10
            },
            "jump_left": {
              "size": 2,
              "frame_rate": 3
            },
            "fall_left": {
              "size": 2,
              "frame_rate": 3
            },
            "walk_right": {
              "size": 4,
              "frame_rate": 10
            },
            "power_jump_right": {
              "size": 1,
              "frame_rate": 10
            },
            "punch_right": {
              "size": 1,
              "frame_rate": 10
            },
            "idle_right": {
              "size": 2,
              "frame_rate": 10
            },
            "jump_right": {
              "size": 2,
              "frame_rate": 3
            },
            "fall_right": {
              "size": 2,
              "frame_rate": 3
            }
          },
          "images": [
            "stand_left",
            "stand_right"
          ]
        };

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

        this.scene.start( (config.devMode ? "SceneLevel1" : "SceneIntro") );
    }
}