var bg, hm, fixed, speed, moveBoolX, moveBoolY, land;
speed = 100;
moveBoolX = false;
moveBoolY = false;
var game = new Phaser.Game(500, 500, Phaser.AUTO,'',{
	preload: preload, create:create, update:update, render:render});

function player(){
    dx:0;
    dy:0;
    dist:0;
    speed:60;
    counter:0;
    xU:0;
    yU:0;
}
function moveTo(){
    x:200;
    y:200;
}

function preload(){
	game.load.image('playerSprite', 'character.png', 'character.json'); // for Json we will need an atlas instead of image so it would be game.load.atlas('playSprite', character.jpg, jsonfile);
	game.load.image('bg','bg.jpg');
	game.load.image('coin','coin.png');
}



function create(){
   // var jsonData = JSON.parse(game.cache.getText('playerSprite'));
    game.world.setBounds(0, 0, 2000, 2000);
    land = game.add.tileSprite (0, 0, game.world.width/2, game.world.height/2, 'bg');
    land.fixedToCamera = true;
    //fixed = game.add.sprite(-100, 0, 'hm');
    //fixed.fixedToCamera = true;
	

	
    playerSprite = game.add.sprite(256, 256, 'playerSprite', 'characterFront1');
    playerSprite.anchor.setTo(0.5, 0.5);
	playerSprite.body.collideWorldBounds = true;
    playerSprite.animations.add('move',['characterFront1','characterFront2','characterFront3'], 20, true, false);
   // playerSprite.play('move');
                    
    game.camera.follow(playerSprite);
    game.camera.deadzone = new Phaser.Rectangle(200,200, 130, 130);
	game.camera.focusOnXY(0, 0);
	
	 sprite2 = game.add.sprite(700, 220, 'coin');
    sprite2.name = 'coin';
	
	sprite3 = game.add.sprite(500, 110, 'coin');
    sprite3.name = 'coin2';
	
	sprite4 = game.add.sprite(40, 60, 'coin');
    sprite4.name = 'coin3';
	
	sprite5 = game.add.sprite(880, 600, 'coin');
    sprite5.name = 'coin4';
	
	sprite6 = game.add.sprite(1120, 300, 'coin');
    sprite6.name = 'coin5';
}
var newX, newY;
function getThere(){
    moveTo.x = game.input.worldX;
    moveTo.y = game.input.worldY;
    player.dx = Math.round(moveTo.x-playerSprite.x);
    player.dy = Math.round(moveTo.y-playerSprite.y);
    player.dist = Math.round(Math.sqrt(player.dx*player.dx+player.dy*player.dy));
    //player.counter = Math.round(player.dist/speed);
    //player.xU = player.dx/player.counter;
    //player.yU = player.dy/player.counter;
    moveBoolX = true;
    moveBoolY = true;
    newX = Math.round(playerSprite.x+player.dx);
    newY = Math.round(playerSprite.y+player.dy);
}

function update() {
 game.physics.collide(playerSprite, sprite2, collisionHandler, null, this);
 game.physics.collide(playerSprite, sprite3, collisionHandler2, null, this);
 game.physics.collide(playerSprite, sprite4, collisionHandler3, null, this);
 game.physics.collide(playerSprite, sprite5, collisionHandler4, null, this);
 game.physics.collide(playerSprite, sprite6, collisionHandler5, null, this);
 
    game.input.onDown.add(getThere, this);
    if(moveBoolX){
        if(player.dx > 0){playerSprite.body.velocity.x = speed}
        if(player.dx < 0){playerSprite.body.velocity.x = -speed}
        if((playerSprite.x < newX+5) && (playerSprite.x > newX-5)){
            playerSprite.body.velocity.x = 0;
            playerSprite.x = newX;
            moveBoolX = false;
        }
    }
    if(moveBoolY){
        if(player.dy > 0){playerSprite.body.velocity.y = speed}
        if(player.dy < 0){playerSprite.body.velocity.y = -speed}
        if((playerSprite.y < newY+5) && (playerSprite.y > newY-5)){
            playerSprite.body.velocity.y = 0;
            playerSprite.y = newY;
            moveBoolY = false;
        }
    }
    land.tilePosition.x = -game.camera.x;
    land.tilePosition.y = -game.camera.y;
    playerSprite.rotation = game.physics.angleToPointer(playerSprite);
	
	
}

function collisionHandler (obj1, obj2) {

	obj2.kill();
    console.log(obj1.name + ' collided with ' + obj2.name);

}

function collisionHandler2 (obj1, obj2) {

	obj2.kill();
    console.log(obj1.name + ' collided with ' + obj2.name);

}

function collisionHandler3 (obj1, obj2) {

	obj2.kill();
    console.log(obj1.name + ' collided with ' + obj2.name);

}

function collisionHandler4 (obj1, obj2) {

	obj2.kill();
    console.log(obj1.name + ' collided with ' + obj2.name);

}

function collisionHandler5 (obj1, obj2) {

	obj2.kill();
    console.log(obj1.name + ' collided with ' + obj2.name);

}

function render() {
    /*
    game.debug.renderCameraInfo(game.camera, 32, 32);
    game.debug.renderSpriteCoords(hm, 32, 200);
    game.debug.renderSpriteCoords(fixed, 600, 200);
    */
}