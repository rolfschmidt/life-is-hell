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

*/

Collision.prototype.checkCollision = function(params) {
    var collisionDataA = this.getCollisionData({
        'objectID': params['objectID'],
    });
    var collisionObjectA = objectManager.getObject(collisionDataA['objectID']);
    if ( !collisionDataA ) return;

    for ( var objectIndexB = 0; objectIndexB < this.data['objectsActive'].length; objectIndexB++ ) {
        var objectIDB = this.data['objectsActive'][objectIndexB];

        if ( collisionDataA['objectID'] == objectIDB ) continue;

        var collisionDataB = this.getCollisionData({
            'objectID': objectIDB,
        });
        if ( !collisionDataB ) continue;

        var collisionObjectB = objectManager.getObject(collisionDataB['objectID']);
        if ( !collisionObjectB ) continue;

        var rectA = {
            x:       collisionObjectA.data[ collisionDataA['objectXKey'] ],
            xCenter: collisionObjectA.data[ collisionDataA['objectXKey'] ] + ( collisionObjectA.data[ collisionDataA['objectWidthKey'] ] / 2),
            y:       collisionObjectA.data[ collisionDataA['objectYKey'] ],
            yCenter: collisionObjectA.data[ collisionDataA['objectYKey'] ] + ( collisionObjectA.data[ collisionDataA['objectHeightKey'] ] / 2),
            w:       collisionObjectA.data[ collisionDataA['objectWidthKey'] ],
            h:       collisionObjectA.data[ collisionDataA['objectHeightKey'] ]
        };
        var rectB = {
            x:       collisionObjectB.data[ collisionDataB['objectXKey'] ],
            xCenter: collisionObjectB.data[ collisionDataB['objectXKey'] ] + ( collisionObjectB.data[ collisionDataB['objectWidthKey'] ] / 2),
            y:       collisionObjectB.data[ collisionDataB['objectYKey'] ],
            yCenter: collisionObjectB.data[ collisionDataB['objectYKey'] ] + ( collisionObjectB.data[ collisionDataB['objectHeightKey'] ] / 2),
            w:       collisionObjectB.data[ collisionDataB['objectWidthKey'] ],
            h:       collisionObjectB.data[ collisionDataB['objectHeightKey'] ]
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

        objectManager.callFunctionObject(collisionDataA['objectID'], 'eventCollisionCheckCollision', {
            collisionObject: collisionObjectB,
            distance: distance,
        });
        objectManager.callFunctionObject(collisionDataB['objectID'], 'eventCollisionCheckCollision', {
            collisionObject: collisionObjectA,
            distance: distance,
        });
    }

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
