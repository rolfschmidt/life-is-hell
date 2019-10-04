Map.DEFAULTS = {
    'cellColors': {},
};
Map.STATICS = {
    'name': 'Map',
};

function Map(params) {
    this.data = objectManager.setParams(params, Map.DEFAULTS, Map.STATICS);

    if ( !this.data['cellColors'].length ) {
        for ( var drawY = 0; drawY < this.data['mapHeight']; drawY += 32 ) {
            for ( var drawX = 0; drawX < this.data['mapWidth']; drawX += 32 ) {
                this.cellColor(drawX, drawY);
            }
        }
    }

    // define window
    this.setWindow();
    createCanvas(this.windowWidth, this.windowHeight);
}

Map.prototype.draw = function() {
    image(assets['map'], 0, 0);
    // for ( var drawY = 0; drawY < this.data['mapHeight']; drawY += 32 ) {
    //     for ( var drawX = 0; drawX < this.data['mapWidth']; drawX += 32 ) {

    //         // draw grey cells for map
    //         rectColor = this.cellColor(drawX, drawY);
    //         push();
    //         scale(this.scaleWidth, this.scaleHeight);
    //         fill(rectColor);
    //         stroke(1);
    //         rect(drawX, drawY, 32, 32 );
    //         pop();
    //     }
    // }
}

Map.prototype.eventObjectManagerUpdateAttribute = function(params) {
    // var eventObject = objectManager.getObject(params.objectID);

    // if ( eventObject.data['name'] != 'Player' ) return;
    // if ( params.attribute != 'playerX' ) return;

    // console.log('player', params);
}

Map.prototype.windowResized = function() {
    // this.setWindow();
    // resizeCanvas(this.windowWidth, this.windowHeight);
}

Map.prototype.setWindow = function() {
    this.windowHeight = this.data['mapHeight'];
    if( window.innerHeight == screen.height) {
        this.windowHeight = windowHeight;
    }
    this.windowWidth = this.data['mapWidth'];
    if(window.innerHeight == screen.height) {
        this.windowWidth = windowWidth;
    }

    // define scaling for objects
    this.scaleHeight = this.windowHeight / this.data['mapHeight'];
    this.scaleWidth  = this.windowWidth / this.data['mapWidth'];
}

Map.prototype.cellColor = function(colorX, colorY) {

    // generate random color for each cell
    if ( !this.data['cellColors'][colorX + '_' + colorY] ) {
        this.data['cellColors'][colorX + '_' + colorY] = random(90, 110);
    }

    return this.data['cellColors'][colorX + '_' + colorY];
}
