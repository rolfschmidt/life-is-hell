Block.DEFAULTS = {
    'blockX':       320,
    'blockY':       320,
    'blockWidth':   32,
    'blockHeight':  32,
};
Block.STATICS = {
    'name': 'Block',
};

function Block(params) {
    this.data = objectManager.setParams(params, Block.DEFAULTS, Block.STATICS);
}

Block.prototype.setup = function() {
    var collision = objectManager.getObject('Collision');

    // set collisions active
    collision.setupObject({
        'objectID':        this.data['id'],
        'objectXKey':      'blockX',
        'objectYKey':      'blockY',
        'objectWidthKey':  'blockWidth',
        'objectHeightKey': 'blockHeight',
    });
}

Block.prototype.draw = function() {
    var map = objectManager.getObject('Map');

    push();
    scale(map.scaleWidth, map.scaleHeight);
    image(assets['block'], this.data['blockX'], this.data['blockY']);
    pop();
}

Block.prototype.eventCollisionCheckCollision = function(params) {
}