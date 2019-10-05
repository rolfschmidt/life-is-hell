function LevelEditorManager() {}

LevelEditorManager.prototype.preload = function(scene) {
    scene.load.image('level_editor_1', './assets/level_editor_1.png');
    scene.load.image('level_editor_1_active', './assets/level_editor_1_active.png');
    scene.load.image('level_editor_2', './assets/level_editor_2.png');
    scene.load.image('level_editor_2_active', './assets/level_editor_2_active.png');
    scene.load.image('level_editor_3', './assets/level_editor_3.png');
    scene.load.image('level_editor_3_active', './assets/level_editor_3_active.png');
    scene.load.image('level_editor_4', './assets/level_editor_4.png');
    scene.load.image('level_editor_4_active', './assets/level_editor_4_active.png');
    scene.load.image('level_editor_5', './assets/level_editor_5.png');
    scene.load.image('level_editor_5_active', './assets/level_editor_5_active.png');
}

LevelEditorManager.prototype.create = function(scene) {
    scene.levelEditorButton1 = scene.add.image(600, 716, 'level_editor_1');
    scene.levelEditorButton1.setScrollFactor(0);
    scene.levelEditorButton2 = scene.add.image(650, 716, 'level_editor_2');
    scene.levelEditorButton2.setScrollFactor(0);
    scene.levelEditorButton3 = scene.add.image(700, 716, 'level_editor_3');
    scene.levelEditorButton3.setScrollFactor(0);
    scene.levelEditorButton4 = scene.add.image(750, 716, 'level_editor_4');
    scene.levelEditorButton4.setScrollFactor(0);
    scene.levelEditorButton5 = scene.add.image(800, 716, 'level_editor_5');
    scene.levelEditorButton5.setScrollFactor(0);
}

LevelEditorManager.prototype.update = function(scene) {
    scene.levelEditorButton1.visible = scene.player.godMode ? true : false;
    scene.levelEditorButton2.visible = scene.player.godMode ? true : false;
    scene.levelEditorButton3.visible = scene.player.godMode ? true : false;
    scene.levelEditorButton4.visible = scene.player.godMode ? true : false;
    scene.levelEditorButton5.visible = scene.player.godMode ? true : false;

    var KeyboardMap = {
        '1': 'ONE',
        '2': 'TWO',
        '3': 'THREE',
        '4': 'FOUR',
        '5': 'FIVE'
    };

    var activeKey;
    for (var buttonIndex = 1; buttonIndex < 6; buttonIndex++) {
        var Key = KeyboardMap[buttonIndex];

        if ( scene.cursors[Key].isDown ) {
            activeKey = Key;
            break;
        }
    }

    if (!activeKey) return;
    if (activeKey == this.activatedKey) return;

    var foundActive = false;
    for (var buttonIndex = 1; buttonIndex < 6; buttonIndex++) {
        var Key = KeyboardMap[buttonIndex];

        if ( scene.cursors[Key].isDown && !scene['levelEditorButton' + buttonIndex].pressed && !foundActive ) {
            scene['levelEditorButton' + buttonIndex].setTexture('level_editor_' + buttonIndex + '_active');
            scene['levelEditorButton' + buttonIndex].pressed = true;
            foundActive = true;
            this.activatedKey = Key;
        }
        else {
            scene['levelEditorButton' + buttonIndex].setTexture('level_editor_' + buttonIndex);
            scene['levelEditorButton' + buttonIndex].pressed = false;

        }
    }
}
