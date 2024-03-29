function CollisionManager() {}

CollisionManager.prototype.preload = function(scene) {
}

CollisionManager.prototype.create = function(scene) {

    scene.physics.add.collider(scene.boss, scene.platforms);

    //  Collide the scene.player and the scene.stars with the scene.platforms
    scene.physics.add.collider(scene.player, scene.platforms);
    scene.physics.add.collider(scene.player, scene.bossDoor);
    scene.physics.add.collider(scene.stars, scene.platforms);
    scene.physics.add.collider(scene.bombs, scene.platforms);
    scene.physics.add.collider(scene.traps, scene.platforms);
    scene.physics.add.collider(scene.bossDoors, scene.platforms);

    var CollisionManager = this;

    //  Checks to see if the scene.player overlaps with any of the scene.stars, if he does call the collectStar function
    scene.physics.add.overlap(scene.player, scene.stars, function(player, star) {
        CollisionManager.collectStar(scene, player, star);
    }, null, scene);

    scene.physics.add.collider(scene.player, scene.bombs, function(player, bomb) {
        CollisionManager.hitBomb(scene, player, bomb);
    }, null, scene);
    scene.physics.add.collider(scene.player, scene.traps, function(player, trap) {
        CollisionManager.hitTrap(scene, player, trap)
    }, null, scene);
    scene.physics.add.collider(scene.player, scene.bossDoors, function(player, door) {
        CollisionManager.enterBoss(scene, player, door);
    }, null, scene);
}

CollisionManager.prototype.update = function(scene) {
}


CollisionManager.prototype.collectStar = function(scene, player, star) {
    var GlobalScene = scene.scene.manager.keys['SceneGlobal'];

    if (scene.player.godMode) return;

    star.disableBody(true, true);

    var addValue = 10;
    if ( GlobalScene.gameDifficulty == 'easy' ) {
        addValue = 50;
    }
    else if ( GlobalScene.gameDifficulty == 'hard' ) {
        addValue = 30;
    }

    //  Add and update the score
    scene.scoreCount += addValue;
    if (player.godMode) scene.scoreCount += 10000;

    var GlobalScene = scene.scene.manager.keys['SceneGlobal'];
    GlobalScene.ScoreManager.refresh(scene);

    // if (scene.stars.countActive(true) === 0)
    // {
    //     //  A new batch of scene.stars to collect
    //     scene.stars.children.iterate(function (child) {

    //         child.enableBody(true, child.x, 0, true, true);

    //     });

    //     var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

    //     var bomb = scene.bombs.create(x, 16, 'level1_bomb');
    //     bomb.setBounce(1);
    //     bomb.setCollideWorldBounds(true);
    //     bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    // }
}

CollisionManager.prototype.damagePlayer = function(scene, player, damage) {
    scene.scoreCount = scene.scoreCount - damage;

    var GlobalScene = scene.scene.manager.keys['SceneGlobal'];
    GlobalScene.ScoreManager.refresh(scene);

    if ((scene.scoreCount / 100) > 0) return;

    scene.physics.pause();

    player.anims.play('dead_'+ scene.player.lastDirection);

    var GlobalScene = scene.scene.manager.keys['SceneGlobal'];

    GlobalScene.StateManager.done = true;

    setTimeout(function() {
        scene.scene.start("SceneGameOver");
    }, 500);
}

CollisionManager.prototype.hitTrap = function(scene, player, trap) {
    if (player.godMode) return;
    if ( trap.x > player.x && trap.x - player.x > trap.width * 0.9 ) return;
    if ( player.x > trap.x && player.x - trap.x > trap.width * 0.9 ) return;

    var GlobalScene = scene.scene.manager.keys['SceneGlobal'];
    GlobalScene.CollisionManager.damagePlayer(scene, player, 2.5);
}

CollisionManager.prototype.hitBomb = function(scene, player, bomb) {
    if (player.godMode) return;

    var GlobalScene = scene.scene.manager.keys['SceneGlobal'];
    GlobalScene.CollisionManager.damagePlayer(scene, player, 15);
}

CollisionManager.prototype.enterBoss = function(scene, player, door) {
    if (player.godMode) return;
    if (!scene.cursors.up.isDown && !scene.cursors.W.isDown) return;

    scene.scene.start("SceneLevel1Boss");
}
