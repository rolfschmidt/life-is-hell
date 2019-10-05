Collision.DEFAULTS = {
    'objectsActive': [],
    'objectsPassive': {},
    'collissionKeys': {},
};
Collision.STATICS = {
    'name': 'Collision',
};

function Collision(params) {
    this.data = objectManager.setParams(params, Collision.DEFAULTS, Collision.STATICS);
}

/*

var collision = objectManager.getObject('Collision');

collision.setupObject({
    'objectID':        123,
    'objectXKey':      123,
    'objectYKey':      123,
    'objectHeightKey': 123,
    'objectWidthKey':  123,
});

*/

Collision.prototype.setupObject = function(params) {
    var object = objectManager.getObject(params['objectID']);
    if (!object) return;

    if ( objectManager.callFunctionObjectPossible(params['objectID'], 'eventCollisionCheckCollision') ) {
        this.data['objectsActive'].push(params['objectID']);
    }
    this.data['objectsPassive'][ params['objectID'] ] = params;

    this.data['collissionKeys'][ params['objectXKey'] ]      = 1;
    this.data['collissionKeys'][ params['objectYKey'] ]      = 1;
    this.data['collissionKeys'][ params['objectHeightKey'] ] = 1;
    this.data['collissionKeys'][ params['objectWidthKey'] ]  = 1;
}

/*

var collision = objectManager.getObject('Collision');

collision.eventObjectManagerUpdateAttribute({
    'objectID': 123,
    'attribute': 123,
});

*/

Collision.prototype.eventObjectManagerUpdateAttribute = function(params) {
    var objectID = params['objectID'];


    var collisionData = this.getCollisionData({
        'objectID': objectID,
    });
    if ( !collisionData ) return;

    if ( !this.data['collissionKeys'][ params['attribute'] ] ) return;

    this.checkCollision({
        'objectID': objectID
    });
}


/*

var collision = objectManager.getObject('Collision');

var collisionData = collision.getCollisionData({
    'objectID': 123,
});

*/

Collision.prototype.getCollisionData = function(params) {
    var collisionData = this.data['objectsPassive'][ params['objectID'] ];
    if ( !collisionData ) return;

    return collisionData;
}

/*

var collision = objectManager.getObject('Collision');

collision.checkCollision({
    'objectID': 123,
});

collision.checkCollision({
    'objectID': 123,
    'collisionObjectA': {
        # object data of player for example
    },
    'collisionCheckNames': {
        'Block': 1
    },
    'triggerEvent': false
});

*/

Collision.prototype.checkCollision = function(params) {
    var collisionDataA = this.getCollisionData({
        'objectID': params['objectID'],
    });

    var collisionObjectA;
    if ( params.collisionObjectA ) {
       collisionObjectA = params.collisionObjectA;
    }
    else {
       collisionObjectA = objectManager.getObject(collisionDataA['objectID']).data;
    }

    if ( !collisionDataA ) return;

    var collided;
    for ( var objectIndexB = 0; objectIndexB < this.data['objectsActive'].length; objectIndexB++ ) {
        var objectIDB = this.data['objectsActive'][objectIndexB];

        if ( collisionDataA['objectID'] == objectIDB ) continue;

        var collisionDataB = this.getCollisionData({
            'objectID': objectIDB,
        });
        if ( !collisionDataB ) continue;

        var collisionObjectB = objectManager.getObject(collisionDataB['objectID']).data;
        if ( !collisionObjectB ) continue;

        if ( params.collisionCheckNames ) {
            if ( !params.collisionCheckNames[ collisionObjectB['name'] ] ) continue;
        }

        var rectA = {
            x:       collisionObjectA[ collisionDataA['objectXKey'] ],
            xCenter: collisionObjectA[ collisionDataA['objectXKey'] ] + ( collisionObjectA[ collisionDataA['objectWidthKey'] ] / 2),
            y:       collisionObjectA[ collisionDataA['objectYKey'] ],
            yCenter: collisionObjectA[ collisionDataA['objectYKey'] ] + ( collisionObjectA[ collisionDataA['objectHeightKey'] ] / 2),
            w:       collisionObjectA[ collisionDataA['objectWidthKey'] ],
            h:       collisionObjectA[ collisionDataA['objectHeightKey'] ]
        };
        var rectB = {
            x:       collisionObjectB[ collisionDataB['objectXKey'] ],
            xCenter: collisionObjectB[ collisionDataB['objectXKey'] ] + ( collisionObjectB[ collisionDataB['objectWidthKey'] ] / 2),
            y:       collisionObjectB[ collisionDataB['objectYKey'] ],
            yCenter: collisionObjectB[ collisionDataB['objectYKey'] ] + ( collisionObjectB[ collisionDataB['objectHeightKey'] ] / 2),
            w:       collisionObjectB[ collisionDataB['objectWidthKey'] ],
            h:       collisionObjectB[ collisionDataB['objectHeightKey'] ]
        };

        var collisionFound = false;
        if (rectA.x < rectB.x + rectB.w
            && rectA.x + rectA.w > rectB.x
            && rectA.y < rectB.y + rectB.h
            && rectA.h + rectA.y > rectB.y) {
            collisionFound = true;
        }

        var distanceX = rectA.xCenter - rectB.xCenter;
        var distanceY = rectA.yCenter - rectB.yCenter;
        var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (!collisionFound) continue;

        if ( params.triggerEvent !== false ) {
            objectManager.callFunctionObject(collisionDataA['objectID'], 'eventCollisionCheckCollision', {
                collisionObject: collisionObjectB,
                distance: distance,
            });
            objectManager.callFunctionObject(collisionDataB['objectID'], 'eventCollisionCheckCollision', {
                collisionObject: collisionObjectA,
                distance: distance,
            });
        }

        collided = {
            'distance': distance,
            'collisionObject': objectManager.getObject(collisionDataB['objectID']),
            'rect': rectB,
        };
    }

    return collided;
}

/*

var collision = objectManager.getObject('Collision');

collision.eventObjectManagerDestroyObject({
    'objectID': 123,
});

*/

Collision.prototype.eventObjectManagerDestroyObject = function(params) {
    var objectID = params['objectID'];

    for ( var objectIndex = 0; objectIndex < this.data['objectsActive'].length; objectIndex++ ) {
        if ( this.data['objectsActive'][objectIndex] != objectID ) continue;

        this.data['objectsActive'].splice(objectIndex, 1);

        break;
    }

    delete this.data['objectsPassive'][objectID];
}
