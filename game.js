var bg, hm, fixed, land, score, text;
score = 0;
var game = new Phaser.Game(500, 500, Phaser.AUTO,'',{preload: preload, create:create, update:update});
function player(){
    dx:0;
    dy:0;
    dist:0;
    time:0;
    speed:100;
    moveBoolX:false;
    moveBoolY:false;
    newX:0;
    newY:0;
    fps:5;
    xy:0;
    facing:'';
}
function preload(){
	game.load.spritesheet('playerSpriteSheet', 'images/character.png',32,32);
	game.load.image('bg','images/bg.jpg');
    game.load.image('coin','images/coin.png');
	game.load.image('hpxp','images/healthexp.png');
  /*game.load.audio('BG', ['Travel.mp3']);
	music = game.add.audio('BG');
    music.play();
  */
}

function create(){
    game.world.setBounds(0, 0, 2000, 2000);
    land = game.add.tileSprite (0, 0, game.width, game.height, 'bg');
    land.fixedToCamera = true;
    playerSprite = game.add.sprite(game.width/2, game.height/2, 'playerSpriteSheet');
    playerSprite.body.collideWorldBounds = true;
    
    playerSprite.animations.add('downStop',  [1],  true);
    playerSprite.animations.add('leftStop',  [4],  true);
    playerSprite.animations.add('rightStop', [7],  true);
    playerSprite.animations.add('upStop',    [10], true);
    
    playerSprite.animations.add('down',      [0,1,2,1],    10, true);
    playerSprite.animations.add('left',      [3,4,5,4],    10, true);
    playerSprite.animations.add('right',     [6,7,8,7],    10, true);
    playerSprite.animations.add('up',        [9,10,11,10], 10, true);
    	
    sprite2 = game.add.sprite(150, 100, 'coin');
	hpxpbar = game.add.sprite(5, 3, 'hpxp');
	hpxpbar.fixedToCamera = true;
	
	text = game.add.text(10, 33, "Score: " + score, {
        font: "25px Arial",
        fill: "#ff0044",
        align: "left"
    });
	text.fixedToCamera = true;
    
    sprite2.anchor.setTo(0.5, 0.5);
    playerSprite.anchor.setTo(0.5, 0.5);
	playerSprite.body.collideWorldBounds = true;
    game.camera.follow(playerSprite);
    game.camera.deadzone = new Phaser.Rectangle(200,200, 130, 130);
	game.camera.focusOnXY(0, 0);
}
function getThere(){
    player.speed = 100;
    player.newX = game.input.worldX;
    player.newY = game.input.worldY;
    player.dx = Math.round(player.newX-playerSprite.x);
    player.dy = Math.round(player.newY-playerSprite.y);
    player.dist = Math.round(Math.sqrt
                             (player.dx*player.dx+player.dy*player.dy));
    player.time = Math.round((player.dist/player.speed)*1000);
    player.moveBoolX = true;
    player.moveBoolY = true;
    player.xy = Math.abs(player.dx)-Math.abs(player.dy);
    console.log(player.xy);
    playerAnimation();
}

function update(){
    game.physics.collide(playerSprite, sprite2, collisionHandler, null, this);
 
    game.input.onDown.add(getThere, this);
    if(player.moveBoolX){
        if(player.dx > 0){
            playerSprite.body.velocity.x = player.speed;
            player.facing = 'rightStop';
        }
        if(player.dx < 0){
            playerSprite.body.velocity.x = -player.speed;
            player.facing = 'leftStop';
        }
        if((playerSprite.x < player.newX+5) && (playerSprite.x > player.newX-5)){
            playerSprite.body.velocity.x = 0;
            playerSprite.x = player.newX;
            player.moveBoolX = false;
        }
    }
    if(player.moveBoolY){
        if(player.dy > 0){
            playerSprite.body.velocity.y = player.speed
            player.facing = 'downStop';
        }
        if(player.dy < 0){
            playerSprite.body.velocity.y = -player.speed
            player.facing = 'upStop';
        }
        if((playerSprite.y < player.newY+5) && (playerSprite.y > player.newY-5)){
            playerSprite.body.velocity.y = 0;
            playerSprite.y = player.newY;
            player.moveBoolY = false;
        }
    }
    if(playerSprite.body.velocity.y == 0 && playerSprite.body.velocity.x == 0){
            playerSprite.animations.play(player.facing);
        console.log(player.facing);
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

function collisionHandler(){
	sprite2.kill();
    updateText();
}

function updateText(){
    score++;
    text.setText("Score: " + score);
}