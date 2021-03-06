var Bodies = require('./lib/factory/Bodies');
var Class = require('../../utils/Class');
var Composites = require('./lib/factory/Composites');
var MatterImage = require('./MatterImage');
var MatterSprite = require('./MatterSprite');

//  When registering a factory function 'this' refers to the GameObjectFactory context.
//  
//  There are several properties available to use:
//  
//  this.scene - a reference to the Scene that owns the GameObjectFactory
//  this.displayList - a reference to the Display List the Scene owns
//  this.updateList - a reference to the Update List the Scene owns

var Factory = new Class({

    initialize:

    function Factory (world)
    {
        this.world = world;

        this.scene = world.scene;

        this.sys = world.scene.sys;
    },

    rectangle: function (x, y, width, height, options)
    {
        var body = Bodies.rectangle(x, y, width, height, options);

        this.world.add(body);

        return body;
    },

    trapezoid: function (x, y, width, height, slope, options)
    {
        var body = Bodies.trapezoid(x, y, width, height, slope, options);

        this.world.add(body);

        return body;
    },

    circle: function (x, y, radius, options, maxSides)
    {
        var body = Bodies.circle(x, y, radius, options, maxSides);

        this.world.add(body);

        return body;
    },

    polygon: function (x, y, sides, radius, options)
    {
        var body = Bodies.polygon(x, y, sides, radius, options);

        this.world.add(body);

        return body;
    },

    fromVertices: function (x, y, vertexSets, options, flagInternal, removeCollinear, minimumArea)
    {
        var body = Bodies.fromVertices(x, y, vertexSets, options, flagInternal, removeCollinear, minimumArea);

        this.world.add(body);

        return body;
    },

    stack: function (x, y, columns, rows, columnGap, rowGap, callback)
    {
        var stack = Composites.stack(x, y, columns, rows, columnGap, rowGap, callback);

        this.world.add(stack);

        return stack;
    },

    image: function (x, y, key, frame, options)
    {
        var image = new MatterImage(this.world, x, y, key, frame, options);

        this.sys.displayList.add(image);

        return image;
    },

    sprite: function (x, y, key, frame, options)
    {
        var sprite = new MatterSprite(this.world, x, y, key, frame, options);

        this.sys.displayList.add(sprite);
        this.sys.updateList.add(sprite);

        return sprite;
    },

    /*
    group: function (children, config)
    {
        return this.sys.updateList.add(new PhysicsGroup(this.world, this.world.scene, children, config));
    }
    */

});

module.exports = Factory;
