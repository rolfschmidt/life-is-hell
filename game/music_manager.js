function MusicManager() {}

MusicManager.prototype.preload = function(scene) {
    scene.load.audio('level1_music', './sounds/level1_32kbps.mp3');
    scene.load.audio('game_over_music', './sounds/game_over_32kbps.mp3');
    scene.load.audio('game_win_music', './sounds/game_win_32kbps.mp3');
    scene.load.audio('intro_music', './sounds/intro_32kbps.mp3');
    scene.load.audio('level1_boss_music', './sounds/level1_boss_32kbps.mp3');
}

MusicManager.prototype.create = function(scene) {
    var GlobalScene = scene.scene.manager.keys['SceneGlobal'];

    var scene2Music = {
        'SceneGameOver': 'game_over_music',
        'SceneLevel1':   'level1_music',
        'SceneLevel2':   'level1_music',
        'SceneLevel3':   'level1_music',
        'SceneLevel4':   'level1_music',
        'SceneLevel5':   'level1_music',
        'SceneGameWin':  'game_win_music',
        'SceneIntro':    'intro_music',
    };

    if ( scene2Music[scene.scene.key] ) {
        var globalSceneKey = 'gameMusic';
        if ( scene2Music[scene.scene.key] == 'level1_music' ) {
            globalSceneKey = 'levelMusic';
        }

        if ( GlobalScene.levelMusic ) {
            GlobalScene.levelMusic.pause();
        }
        if ( GlobalScene.gameMusic ) {
            GlobalScene.gameMusic.stop();
        }

        // for level music just continue existing one
        if ( globalSceneKey == 'levelMusic' && GlobalScene.levelMusic ) {
            GlobalScene.levelMusic.resume();
            return;
        }

        GlobalScene[globalSceneKey] = scene.sound.add(scene2Music[scene.scene.key], {
            mute: (config.devMode ? true : false),
            volume: 0.1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });
        GlobalScene[globalSceneKey].play();
    }

}

MusicManager.prototype.update = function(scene) {
}
