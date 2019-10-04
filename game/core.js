var assets = {};
var objectManager;

function preload() {
    assets['player'] = loadImage("./assets/player.png");
    assets['block']  = loadImage("./assets/block.png");
}

function setup() {

    // init object manager
    objectManager = new ObjectManager();

    objectManager.createObject({
        'id': 'Map',
        'name': 'Map',
        'mapWidth': 1024,
        'mapHeight': 768
    });
    objectManager.createObject({
        'id': 'Collision',
        'name': 'Collision',
    });
    objectManager.createObject({
        'id': 'Block1',
        'name': 'Block',
        'blockX': 320,
        'blockY': 320,
    });
    objectManager.createObject({
        'id': 'Block2',
        'name': 'Block',
        'blockX': 288,
        'blockY': 320,
    });
    objectManager.createObject({
        'id': 'Block3',
        'name': 'Block',
        'blockX': 256,
        'blockY': 320,
    });
    objectManager.createObject({
        'id': 'Block4',
        'name': 'Block',
        'blockX': 224,
        'blockY': 320,
    });
    objectManager.createObject({
        'id': 'Block5',
        'name': 'Block',
        'blockX': 192,
        'blockY': 320,
    });

    objectManager.createObject({
        'id': 'Player',
        'name': 'Player',
    });

    objectManager.callFunction('setup');
    // objectManager.createObject({
    //     'id': 'Collision',
    //     'name': 'Collision',
    // });

    setInterval(gameInterval, 1000 / 55);
}

function draw() {
    objectManager.callFunction('draw');
}

function windowResized() {
    objectManager.callFunction('windowResized');
}

function mousePressed() {
    if (!objectManager) return;
    var map = objectManager.getObject('Map');

    objectManager.callFunction('mousePressed', {
        'mouseX': mouseX / map.scaleWidth,
        'mouseY': mouseY / map.scaleHeight
    });
}

function keyPressed() {
    if (!objectManager) return;

    objectManager.callFunction('keyPressed', {
        'keyCode': keyCode
    });
}

function keyReleased() {
    if (!objectManager) return;

    objectManager.callFunction('keyReleased', {
        'keyCode': keyCode
    });
}

function gameInterval() {
    if (!objectManager) return;

    objectManager.callFunction('move');
}