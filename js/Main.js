/**
 * Created by avrobullet on 12/12/16.
 */
var Main = function(game)
{

};
var player;
var cursors;
var jumpButton;

Main.prototype = {

    create: function()
    {
        //AD: place in other spot?
        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        //Create game world
        this.createPhysics();
        this.createBackground();

        // Create a random generator (AD: not needed)
        var seed = Date.now();
        this.random = new Phaser.RandomDataGenerator([seed]);

        // Create the ceiling
        this.createBlock();

        // Create the player
        this.createPlayer();
    },
    update: function()
    {
        player.body.velocity.x = 0;

        this.playerDirection();
        this.playerJump();
    },

    //Create physical environment
    createPhysics: function()
    {
        // Start the P2 Physics Engine
        this.game.physics.startSystem(Phaser.Physics.P2JS);

        // Set the gravity
        this.game.physics.p2.gravity.y = 1000;
    },
    //Create game background
    createBackground: function()
    {
        // Set the background colour to blue
        this.game.stage.backgroundColor = '#ccddff';

    },
    //Create surface
    createBlock: function()
    {
        // Define a block using bitmap data rather than an image sprite
        var blockShape = this.game.add.bitmapData(this.game.world.width, 200);

        // Fill the block with black color
        blockShape.ctx.rect(0, 0, this.game.world.width, 200);
        blockShape.ctx.fillStyle = '0c0';
        blockShape.ctx.fill();

        // Create a new sprite using the bitmap data
        this.block = this.game.add.sprite(0, 0, blockShape);

        // Enable P2 Physics and set the block not to move
        this.game.physics.p2.enable(this.block);
        this.block.body.static = true;
        this.block.anchor.setTo(0, 0);
    },
    //Create sprite
    createPlayer: function()
    {
        // Add the player to the game
        player = this.game.add.sprite(200, 400, 'betty');
        // Enable physics, use "true" to enable debug drawing
        this.game.physics.p2.enable([player], false);
        //Stop sprite from rotating
        player.body.fixedRotation = true;
        // Get rid of current bounding box
        player.body.clearShapes();
        // Add our PhysicsEditor bounding shape
        player.body.loadPolygon('spr_physics', 'betty');
    },
    //Sprite jumps 'y' high
    playerJump: function()
    {
        //Add some logic where the space bar button is pressed only once
        if (jumpButton.isDown)
        {
            player.body.velocity.y = -250;
            //jumpTimer = game.time.now + 750;
        }
    },
    //Sprite direction
    playerDirection: function()
    {
        //Move sprite left
        if (cursors.left.isDown)
        {
            player.body.velocity.x = -150;
            //Sprite face left
            //code()...
        }
        //Move sprite right
        else if (cursors.right.isDown)
        {
            player.body.velocity.x = 150;
            //Sprite face right
            //code()...
        }
        //Sprite doesn't move
        else
        {
            //Do nothing
        }
    },
    //Sprite speed
    playerVelocity: function()
    {

    },
    gameOver: function()
    {
        this.game.state.start('GameOver');
    },
};