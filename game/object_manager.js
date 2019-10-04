function ObjectManager(params) {
    this.data                     = {};
    this.data['objects']          = {};
    this.data['objectsOrdered']   = {};
    this.data['objectsOrderTypes'] = [
        'Map',
        'Block',
        'Player',
        'Other',
    ];
    this.data['deleteObjects']    = [];
    this.data['objectCounter']     = 0;
}

ObjectManager.prototype.loopObjects = function(category, callback) {
/*

example structure of the index

    this.data['objectsOrdered']   = {
        'move': {
            'Map': [],
            'Other': [],
        },
        'DEFAULT': [
            'Map': [],
            'Other': [],
        ],
    };
*/

    if ( typeof this.data['objectsOrdered'][category] === 'undefined' ) return;

    for (var orderTypeIndex = 0; orderTypeIndex < this.data['objectsOrderTypes'].length; orderTypeIndex++) {
        var orderTypeName = this.data['objectsOrderTypes'][orderTypeIndex];

        if ( typeof this.data['objectsOrdered'][category][orderTypeName] === 'undefined' ) continue;

        for (var objectIndex = 0; objectIndex< this.data['objectsOrdered'][category][orderTypeName].length; objectIndex++) {
            var objectID = this.data['objectsOrdered'][category][orderTypeName][objectIndex];
            var object   = this.getObject(objectID);

            var result = callback(objectID, object);

            if (result === false) return;
        };
    }
}

ObjectManager.prototype.callFunction = function(functionName, functionArguments) {
    var objectManager = this;
    this.loopObjects(functionName, function(objectID, object) {
        objectManager.callFunctionObject(objectID, functionName, functionArguments);
    });
}

ObjectManager.prototype.callFunctionObjectPossible = function(objectID, functionName) {
    if ( typeof this.data['objects'][objectID][functionName] !== 'function' ) return;
    return true;
}

ObjectManager.prototype.callFunctionObject = function(objectID, functionName, functionArguments) {
    if ( !this.data['objects'][objectID] ) return;
    if ( typeof this.data['objects'][objectID][functionName] !== 'function' ) return;

    return this.data['objects'][objectID][functionName](functionArguments);
}

ObjectManager.prototype.getObject = function(objectID) {
    return this.data['objects'][objectID];
}

ObjectManager.prototype.getObjectOrderType = function(name) {
    var result = 'Other';

    for (var orderIndex = 0; orderIndex < this.data['objectsOrderTypes'].length; orderIndex++) {
        var orderType = this.data['objectsOrderTypes'][orderIndex];

        if ( orderType != name ) continue;

        result = orderType;

        break;
    }

    return result;
}

ObjectManager.prototype.createObjectIndex = function(functionArguments, newObject) {

    // create index for object get
    this.data['objects'][ functionArguments['id'] ] = newObject;

/*

example structure of the index

    this.data['objectsOrdered']   = {
        'move': {
            'Map': [],
            'Other': [],
            'All': [],
        },
        'DEFAULT': [
            'Map': [],
            'Other': [],
        ],
    };
*/

    // get order type of object
    var orderType = this.getObjectOrderType(functionArguments['name']);

    // create index to loop over all objects
    if ( this.data['objectsOrdered']['DEFAULT'] === undefined ) this.data['objectsOrdered']['DEFAULT'] = {};
    if ( this.data['objectsOrdered']['DEFAULT'][orderType] === undefined ) this.data['objectsOrdered']['DEFAULT'][orderType] = [];
    if ( this.data['objectsOrdered']['DEFAULT']['Other'] === undefined ) this.data['objectsOrdered']['DEFAULT']['Other'] = [];
    this.data['objectsOrdered']['DEFAULT'][orderType].push(functionArguments['id']);

    // create index for object available functions
    var functionList = Object.getOwnPropertyNames(Object.getPrototypeOf(newObject));
    for (var functionIndex = 0; functionIndex < functionList.length; functionIndex++) {
        var category = functionList[functionIndex];

        if ( this.data['objectsOrdered'][category] === undefined ) this.data['objectsOrdered'][category] = {};
        if ( this.data['objectsOrdered'][category][orderType] === undefined ) this.data['objectsOrdered'][category][orderType] = [];
        if ( this.data['objectsOrdered'][category]['Other'] === undefined ) this.data['objectsOrdered'][category]['Other'] = [];
        this.data['objectsOrdered'][category][orderType].push(functionArguments['id']);
    }
}

ObjectManager.prototype.createObject = function(functionArguments) {

    // create id
    functionArguments['id'] = functionArguments['id'] || this.createID();

    // init object with functionArguments
    var newObject = new window[ functionArguments['name'] ](functionArguments);

    this.createObjectIndex(functionArguments, newObject);

    return newObject;
}

ObjectManager.prototype.updateObject = function(attributes) {
    var objectID = attributes['id'];

    if ( !objectID || this.data['objects'][ objectID ] === undefined ) {
        this.createObject(attributes);
    }
    else {
        for (var attributeKey in attributes) {
            this.updateAttribute(objectID, attributeKey, attributes[attributeKey]);
        }
    }
}

ObjectManager.prototype.createID = function() {
    this.data['objectCounter']++;

    return this.data['objectCounter'];
}

ObjectManager.prototype.updateAttribute = function(objectID, attribute, attributeValue) {
    var object = this.getObject(objectID);

    if ( !object ) return;
    if ( typeof attributeValue !== 'object' && object.data[attribute] == attributeValue ) return;

    object.data[attribute] = attributeValue;

    this.callFunction('eventObjectManagerUpdateAttribute', {
        'objectID': objectID,
        'attribute': attribute,
    });
};

ObjectManager.prototype.destroyObjectIndex = function(objectID) {
    var object = this.getObject(objectID);

/*

example structure of the index

    this.data['objectsOrdered']   = {
        'move': {
            'Map': [],
            'Other': [],
            'All': [],
        },
        'DEFAULT': [
            'Map': [],
            'Other': [],
        ],
    };
*/

    if (!object) return;

    delete this.data['objects'][objectID];

    // get order type of object
    var orderType = this.getObjectOrderType(object.data['name']);

    // delete index to loop over all objects
    for (var objectIndex = 0; objectIndex < this.data['objectsOrdered']['DEFAULT'][orderType].length; objectIndex++) {
        var orderedObjectID = this.data['objectsOrdered']['DEFAULT'][orderType][objectIndex];

        if ( objectID != orderedObjectID ) continue;

        this.data['objectsOrdered']['DEFAULT'][orderType].splice(objectIndex, 1);

        break;
    }

    // delete index for object available functions
    var functionList = Object.getOwnPropertyNames(Object.getPrototypeOf(object));
    for (var functionIndex = 0; functionIndex < functionList.length; functionIndex++) {
        var category = functionList[functionIndex];

        for (var objectIndex = 0; objectIndex < this.data['objectsOrdered'][category][orderType].length; objectIndex++) {
            var orderedObjectID = this.data['objectsOrdered'][category][orderType][objectIndex];

            if ( objectID != orderedObjectID ) continue;

            this.data['objectsOrdered'][category][orderType].splice(objectIndex, 1);

            break;
        }
    }
}

ObjectManager.prototype.destroyObject = function(objectID) {
    this.destroyObjectIndex(objectID);

    this.callFunction('eventObjectManagerDestroyObject', {
        'objectID': objectID,
    });
}

ObjectManager.prototype.setParams = function(params, defaults, static) {
    var result = {};

    // get data of params
    for (key in params) {
        result[key] = params[key];
    }

    // set defaults for non existing values
    for (key in defaults) {
        if (result[key] !== undefined) continue;
        if (defaults[key] === undefined) continue;
        result[key] = defaults[key];
    }

    // overwrite static values
    for (key in static) {
        result[key] = static[key];
    }

    return result;
}
