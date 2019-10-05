class SceneGlobal extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneGlobal', active: true });
    }

    preload() {
        console.log('preload global');
        this.load.atlas('sprites', './assets/spritesheet.png', './assets/sprites.json');
    }

    create() {
        var sprite_manifest = {
          "frames": {
            "walk_left": 4,
            "jump_left": 1,
            "punch_left": 1,
            "idle_left": 2,
            "walk_right": 4,
            "jump_right": 1,
            "punch_right": 1,
            "idle_right": 2
          },
          "images": [
            "stand_left",
            "stand_right"
          ]
        };

        for (var frame_name in sprite_manifest['frames']) {

            var frame_start  = 1
            var frame_end    = sprite_manifest['frames'][frame_name]

            this.anims.create({
                key: frame_name,
                frames: this.anims.generateFrameNames('sprites',
                        {
                            prefix:  frame_name + '_',
                            start:   frame_start,
                            end:     frame_end,
                            zeroPad: 2,
                        }),
                frameRate: 10,
                repeat: -1
            });
        }

        this.scene.start( (config.devMode ? "SceneLevel1" : "SceneIntro") );
    }
}