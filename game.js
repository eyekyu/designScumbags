var bg, hm, fixed, land;
var game = new Phaser.Game(500, 500, Phaser.AUTO,'',{preload: preload, create:create, update:update});
function player(){
    dx:0;
    dy:0;
    dist:0;
    time:0;
    speed:100;
    counter:0;
    moveBool:false;
    newX:0;
    newY:0;
    fps:5;
    xy:0;
}

function preload(){
	game.load.spritesheet('playerSprite', 'images/character.png',32,32);
	game.load.image('bg','images/bg.jpg');
    game.load.image('coin','images/coin.png');
	game.load.image('hpxp','images/healthexp.png');
	game.load.audio('BG', ['Travel.mp3']);
	//music = game.add.audio('BG');
	// music.play();
}


function create(){
    game.world.setBounds(0, 0, 2000, 2000);
    land = game.add.tileSprite (0, 0, game.width, game.height, 'bg');
    land.fixedToCamera = true;
    playerSprite = game.add.sprite(256, 256, 'playerSprite');
    playerSprite.body.collideWorldBounds = true;
    playerSprite.animations.add('down', [0,1,2,1], 10, true);
    playerSprite.animations.add('left', [3,4,5,4],10, true);
    playerSprite.animations.add('right', [6,7,8,7], 10, true);
    playerSprite.animations.add('up', [9,10,11,10], 10, true);
    	
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
	
	hpxpbar = game.add.sprite(10, 10, 'hpxp');
	hpxpbar.name = 'bar';
	hpxpbar.fixedToCamera = true;
	
	
	text = game.add.text(80, 60, "Score: " +player.counter, {
        font: "25px Arial",
        fill: "#ff0044",
        align: "center"
    });
	text.fixedToCamera = true;

    text.anchor.setTo(0.5, 0.5);
    playerSprite.anchor.setTo(0.5, 0.5);
	playerSprite.body.collideWorldBounds = true;
    game.camera.follow(playerSprite);
    game.camera.deadzone = new Phaser.Rectangle(200,200, 130, 130);
	game.camera.focusOnXY(0, 0);
    //music.play();
}
function getThere(){
    player.speed = 100;
    player.newX = game.input.worldX;
    player.newY = game.input.worldY;
    player.dx = Math.round(player.newX-playerSprite.x);
    player.dy = Math.round(player.newY-playerSprite.y);
    player.dist = Math.round(Math.sqrt(player.dx*player.dx+player.dy*player.dy));
    player.time = Math.round((player.dist/player.speed)*1000);
    player.moveBool = true;
    console.log("x" +player.dx);
    console.log("y" +player.dy);
    player.xy = Math.abs(player.dx)-Math.abs(player.dy);
    console.log(player.xy);
    playerAnimation();
}

function update() {
game.physics.collide(playerSprite, sprite2, collisionHandler, null, this);
 game.physics.collide(playerSprite, sprite3, collisionHandler2, null, this);
 game.physics.collide(playerSprite, sprite4, collisionHandler3, null, this);
 game.physics.collide(playerSprite, sprite5, collisionHandler4, null, this);
 game.physics.collide(playerSprite, sprite6, collisionHandler5, null, this);
 
    game.input.onDown.add(getThere, this);
    if(player.moveBool){
        game.add.tween(playerSprite).to({ x: player.newX, y:player.newY }, player.time, Phaser.Easing.Linear.None, true);
    player.moveBool = true;
        
    }
    if(playerSprite.x==player.newX && playerSprite.y == player.newY){
        playerSprite.animations.stop();
    }
    land.tilePosition.x = -game.camera.x;
    land.tilePosition.y = -game.camera.y;
}

function playerAnimation(){
       if(player.dx<0 && player.xy > 0){
        playerSprite.animations.play('left');
        if(playerSprite.x==player.newX && playerSprite.y == player.newY){
        playerSprite.animations.stop();
        playerSprite.frame=1;
    	}
        
       // console.log(player.dx);
    }
     else if(player.dx>0 && player.xy > 0){
        playerSprite.animations.play('right');
    }
     else if(player.dy<0 && player.xy < 0){
        playerSprite.animations.play('up');
    }
     else if(player.dy>0 && player.xy < 0){
        playerSprite.animations.play('down');
    }
}
  /* if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;

        if (facing != 'left')
        {
            player.animations.play('left');
            facing = 'left';
        }
    }*/

function collisionHandler (obj1, obj2) {

	obj2.kill();
    console.log(obj1.name + ' collided with ' + obj2.name);
	updateText();

}

function collisionHandler2 (obj1, obj2) {

	obj2.kill();
    console.log(obj1.name + ' collided with ' + obj2.name);
	updateText();
}

function collisionHandler3 (obj1, obj2) {

	obj2.kill();
    console.log(obj1.name + ' collided with ' + obj2.name);
	updateText();
}

function collisionHandler4 (obj1, obj2) {

	obj2.kill();
    console.log(obj1.name + ' collided with ' + obj2.name);
   updateText();
}

function collisionHandler5 (obj1, obj2) {

	obj2.kill();
    console.log(obj1.name + ' collided with ' + obj2.name);
updateText();
}

function render() {
    /*
    game.debug.renderCameraInfo(game.camera, 32, 32);
    game.debug.renderSpriteCoords(hm, 32, 200);
    game.debug.renderSpriteCoords(fixed, 600, 200);
    */
}

function updateText() {
player.counter++;
text.setText("Nope: " + player.counter);

}