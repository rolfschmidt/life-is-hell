function LevelEditorManager() {}

LevelEditorManager.prototype.preload = function(scene) {

    for (var i = 0; i < 10; i++) {
        scene.load.image('level_editor_' + i, './assets/level_editor_' + i + '.png');
        scene.load.image('level_editor_' + i + '_active', './assets/level_editor_' + i + '_active.png');
    }
}

LevelEditorManager.prototype.create = function(scene) {

    for (var i = 0; i < 10; i++) {
        scene['levelEditorButton' + i] = scene.add.image(550 + (i * 50), 716, 'level_editor_' + i);
        scene['levelEditorButton' + i].setScrollFactor(0);
    }

    scene.levelEditorPlacement = scene.add.image(200, 200, 'level1_block_middle');
    scene.levelEditorPlacement.setScrollFactor(0);
    scene.levelEditorPlacement.setInteractive();

    var LevelEditorManager = this;

    scene.input.on('gameobjectdown', function(pointer, gameObject) {
        LevelEditorManager.onClick(scene, pointer, gameObject);
    }, scene);
}

LevelEditorManager.prototype.update = function(scene) {
    for (var i = 0; i < 10; i++) {
        scene['levelEditorButton' + i].visible = scene.player.godMode ? true : false;
    }

    this.KeyboardMap = [
        {
            'Key': 'BACK_SLASH',
            'Manager': 'PlatformManager',
            'Texture': 'level_editor_0',
            'SceneKey': undefined,
        },
        {
            'Key': 'ONE',
            'Manager': 'PlatformManager',
            'Texture': 'level1_block_middle',
            'SceneKey': 'platforms',
        },
        {
            'Key': 'TWO',
            'Manager': 'PlatformManager',
            'Texture': 'level1_block_left',
            'SceneKey': 'platforms',
        },
        {
            'Key': 'THREE',
            'Manager': 'PlatformManager',
            'Texture': 'level1_block_right',
            'SceneKey': 'platforms',
        },
        {
            'Key': 'FOUR',
            'Manager': 'TrapManager',
            'Texture': 'level1_block_kill',
            'SceneKey': 'traps',
        },
        {
            'Key': 'FIVE',
            'Manager': 'TrapManager',
            'Texture': 'level1_block_lava',
            'SceneKey': undefined,
        },
        {
            'Key': 'SIX',
            'Manager': 'StarManager',
            'Texture': 'level1_star',
            'SceneKey': 'stars',
        },
        {
            'Key': 'SEVEN',
            'Manager': 'DoorManager',
            'Texture': 'level1_boss_door',
            'SceneKey': 'bossDoors',
        },
        {
            'Key': 'EIGHT',
        },
        {
            'Key': 'NINE',
        },
    ];

    var activeKey;
    for (var buttonIndex = 0; buttonIndex < this.KeyboardMap.length; buttonIndex++) {
        var Key = this.KeyboardMap[buttonIndex]['Key'];

        if ( scene.cursors[Key].isDown ) {
            activeKey = Key;
            break;
        }
    }

    if (activeKey && activeKey != this.activatedKey) {
        var foundActive = false;
        for (var buttonIndex = 0; buttonIndex < this.KeyboardMap.length; buttonIndex++) {
            var data = this.KeyboardMap[buttonIndex];
            var Key = this.KeyboardMap[buttonIndex]['Key'];

            if (!data.Manager) continue;

            if ( scene.cursors[Key].isDown && !scene['levelEditorButton' + buttonIndex].pressed && !foundActive ) {
                scene['levelEditorButton' + buttonIndex].setTexture('level_editor_' + buttonIndex + '_active');
                scene['levelEditorButton' + buttonIndex].pressed = true;
                foundActive = true;
                this.activatedKey = Key;

                scene.levelEditorPlacement.setTexture(this.KeyboardMap[buttonIndex]['Texture']);
                scene.levelEditorPlacement.Manager        = this.KeyboardMap[buttonIndex]['Manager'];
                scene.levelEditorPlacement.ManagerTexture = this.KeyboardMap[buttonIndex]['Texture'];
                scene.levelEditorPlacement.SceneKey       = this.KeyboardMap[buttonIndex]['SceneKey'];
            }
            else {
                scene['levelEditorButton' + buttonIndex].setTexture('level_editor_' + buttonIndex);
                scene['levelEditorButton' + buttonIndex].pressed = false;
            }
        }

    }

    if ( activeKey && this.activatedKey && activeKey != this.activatedKey ) {
        this.activatedKey = undefined;
    }

    scene.levelEditorPlacement.visible = scene.player.godMode && this.activatedKey && this.activatedKey != 'BACK_SLASH' ? true : false;
    scene.levelEditorPlacement.x       = ( Math.floor( scene.input.mousePointer.x / scene.levelEditorPlacement.width ) * scene.levelEditorPlacement.width ) + ( scene.levelEditorPlacement.width / 2 );
    scene.levelEditorPlacement.saveX   = ( Math.floor( scene.input.mousePointer.worldX / scene.levelEditorPlacement.width ) * scene.levelEditorPlacement.width ) + ( scene.levelEditorPlacement.width / 2 );
    scene.levelEditorPlacement.y       = ( Math.floor( scene.input.mousePointer.worldY / scene.levelEditorPlacement.height ) * scene.levelEditorPlacement.height ) + ( scene.levelEditorPlacement.height / 2 );
    scene.levelEditorPlacement.saveY   = ( Math.floor( scene.input.mousePointer.y / scene.levelEditorPlacement.height ) * scene.levelEditorPlacement.height ) + ( scene.levelEditorPlacement.height / 2 );
}

LevelEditorManager.prototype.onClick = function(scene, pointer, gameObject) {
    if (!scene.player.godMode) {
        this.copyScene2Clipboard(scene);
        return;
    }
    if (!this.activatedKey) return;

    this.copiedScene2Clipboard = false;

    var GlobalScene = scene.scene.manager.keys['SceneGlobal'];

    if ( this.activatedKey == 'BACK_SLASH' ) {
        gameObject.destroy();
        return;
    }

    // prevent double blocks at the same points
    var sceneData = this.getSceneData(scene, scene.levelEditorPlacement.SceneKey) || [];
    var blockFound;
    for (var index = 0; index < sceneData.length; index++ ) {
        var entry = sceneData[index];

        if ( scene.levelEditorPlacement.saveX != entry.x ) continue;
        if ( scene.levelEditorPlacement.saveY != entry.y ) continue;

        blockFound = true;
    }

    if ( blockFound ) return;

    GlobalScene[scene.levelEditorPlacement.Manager].createBlock(scene, scene.levelEditorPlacement.saveX, scene.levelEditorPlacement.saveY, scene.levelEditorPlacement.ManagerTexture);
}

LevelEditorManager.prototype.copyScene2Clipboard = function(scene) {
    if ( this.copiedScene2Clipboard ) return;

    this.copiedScene2Clipboard = true;

    var exportData = {};
    for (var index = 0; index < this.KeyboardMap.length; index++) {
        var data = this.KeyboardMap[index];

        if ( !data['SceneKey'] ) continue;

        var sceneData = this.getSceneData(scene, data['SceneKey']) || [];

        exportData[ data['SceneKey'] ] = exportData[ data['SceneKey'] ] || [];
        for (var exportIndex = 0; exportIndex < sceneData.length; exportIndex++) {
            var entry = sceneData[exportIndex];

            exportData[ data['SceneKey'] ].push({
                x: entry.x,
                y: entry.y,
                texture: entry.texture.key,
            });
        }
    }

    this.copyToClipboard(JSON.stringify(exportData));
}

LevelEditorManager.prototype.copyToClipboard = function(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return clipboardData.setData("Text", text);

    }
    else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
}

LevelEditorManager.prototype.getSceneData = function(scene, key) {
    if (!scene[key]) return;
    if (!scene[key].children) return;
    if (!scene[key].children.entries) return;

    return scene[key].children.entries;
}