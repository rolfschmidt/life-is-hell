Player.DEFAULTS = {
    'playerX':      200,
    'playerY':      200,
    'playerWidth':  32,
    'playerHeight': 64,
    'playerSpeed':  6,
    'playerDead':   false,
    'directionX':   0,
    'directionY':   0,
    'playerHealth':   100,
};
Player.STATICS = {
    'name': 'Player',
};

function Player(params) {
    this.data = objectManager.setParams(params, Player.DEFAULTS, Player.STATICS);
}

Player.prototype.setup = function() {
    var collision = objectManager.getObject('Collision');

    // set collisions active
    collision.setupObject({
        'objectID':        this.data['id'],
        'objectXKey':      'playerX',
        'objectYKey':      'playerY',
        'objectWidthKey':  'playerWidth',
        'objectHeightKey': 'playerHeight',
    });
}

Player.prototype.draw = function() {
    var map    = objectManager.getObject('Map');

    push();
    scale(map.scaleWidth, map.scaleHeight);
    if ( this.data['playerDead'] ) {
        image(assets['playerDeath'], this.data['playerX'], this.data['playerY']);
    }
    else {
        image(assets['player'], this.data['playerX'], this.data['playerY']);
    }
    // rect(this.data['playerX'], this.data['playerY'], this.data['playerWidth'], this.data['playerHeight']);
    pop();
}

Player.prototype.move = function() {
    if ( this.data['playerDead'] ) return;

    var map = objectManager.getObject('Map');

    if (this.data['directionX']) {

        // check that the player can go out the map to the right
        if ( (this.data['playerX'] + (this.data['directionX'] * this.data['playerSpeed']) + this.data['playerWidth']) > map.data['mapWidth'] ) return;
        // check that the player can go out the map to the left
        if ( (this.data['playerX'] + (this.data['directionX'] * this.data['playerSpeed'])) < 0 ) return;

        objectManager.updateAttribute( this.data['id'], 'playerX', this.data['playerX'] + this.data['directionX'] * this.data['playerSpeed'] );
    }
    if (this.data['directionY']) {

        // check that the player can go out the map to the bottom
        if ( (this.data['playerY'] + (this.data['directionY'] * this.data['playerSpeed']) + this.data['playerHeight']) > map.data['mapHeight'] ) return;
        // check that the player can go out the map to the top
        if ( (this.data['playerY'] + (this.data['directionY'] * this.data['playerSpeed'])) < 0 ) return;

        objectManager.updateAttribute( this.data['id'], 'playerY', this.data['playerY'] + this.data['directionY'] * this.data['playerSpeed'] );
    }
}

Player.prototype.keyPressed = function(params) {
    switch (params['keyCode']) {
        case 65: // A
            this.data['directionX'] = -1;
        break;
        case 68: // D
            this.data['directionX'] = 1;
        break;
        case 87: // W
            this.data['directionY'] = -1;
        break;
        case 83: // S
            this.data['directionY'] = 1;
        break;
    }

    // console.log(params['keyCode'], this.data['directionX'], this.data['directionY']);
}

Player.prototype.keyReleased = function(params) {
    switch (params['keyCode']) {
        case 65: // A
            if ( this.data['directionX'] != -1 ) break;
            this.data['directionX'] = 0;
        break;
        case 68: // D
            if ( this.data['directionX'] != 1 ) break;
            this.data['directionX'] = 0;
        break;
        case 87: // W
            if ( this.data['directionY'] != -1 ) break;
            this.data['directionY'] = 0;
        break;
        case 83: // S
            if ( this.data['directionY'] != 1 ) break;
            this.data['directionY'] = 0;
        break;
    }

    //console.log(params['keyCode'], this.data['directionX'], this.data['directionY']);
}

Player.prototype.mousePressed = function(params) {
}

Player.prototype.eventCollisionCheckCollision = function(params) {
    this.collisionBlock(params);
}

Player.prototype.collisionBlock = function(params) {
    // console.log('player collides', params);

    // var collisionObject = params['collisionObject'];
    // var distance        = params['distance'];

    // // skip if fireball already exploded
    // if ( collisionObject.data['fireballExplode'] ) return;

    // // owner needs to be different for damage
    // if ( collisionObject.data['owner'] == this.data['owner'] ) return;

    // // only interested if player has health
    // if ( this.data['playerHealth'] <= 0 ) return;

    // // fireball collision are only relevant for players
    // if ( collisionObject.data['name'] != 'Fireball' ) return;

    // // fireball needs a good distance to take the player damage
    // if ( distance > 35 ) return;
    // collisionObject.explode();

    // objectManager.updateAttribute(this.data['id'], 'playerHealth', this.data['playerHealth'] - 15);
    // console.log('distance', distance, this.data['playerHealth']);
    // objectManager.updateAttribute(this.data['id'], 'killedBy', collisionObject.data['owner']);
}