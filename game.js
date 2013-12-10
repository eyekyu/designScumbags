EnemyZom = function (i) {
    this.vx = Math.random()*(20)+5;
    this.vy = Math.random()*(20)+5;
    this.x =  game.world.randomX;
    this.y =  game.world.randomY;
    this.dx = 0;
    this.dy = 0;
    this.dist = 0;
    this.xTime = 0;
    this.yTime = 0;
    this.name = i.toString();
    this.health = 3;
    this.alive = true;
    this.zombie = game.add.sprite(this.x, this.y, 'zombie');
    this.zombie.anchor.setTo(0.5, 0.5);
    this.zombie.body.immovable = true;
    this.zombie.body.collideWorldBounds = true;
    this.zombie.body.immovable = false;
}
Player = function(game) {
    this.x = 200;
    this.y = 200;
    this.dx = 0;
    this.dy = 0;
    this.dist = 0;
    this.time = 0;
    this.speed = 100;
    this.moveBoolX = false;
    this.moveBoolY = false;
    this.newX = 0;
    this.newY = 0;
    this.fps = 10;
    this.xy = 0;
    this.facing = '';
    this.score = 0;
}

EnemyZom.prototype.damage = function() {
    this.health -= 1;
    if (this.health <= 0){
        this.alive = false;
        this.zombie.kill();
        return true;
    }
    return false;
}


var bg, hm, fixed, land, enemyGroup, text, enemies, numOfZombs;
numOfZombs = 5;
var game = new Phaser.Game(480, 320, Phaser.AUTO,'',{preload: preload, create:create, update:update});

function preload(){
    //load assets
	game.load.spritesheet('playerSpriteSheet', 'images/character.png',32,32);
	game.load.image('bg','images/bg.jpg');
    game.load.image('coin','images/coin.png');
	game.load.image('hpxp','images/healthexp.png');
    game.load.image('zombie', 'images/zombieSprite.png',32,32);
	game.load.image('pausebutton','images/pausebutton.png');
    game.load.audio('kill', ['sounds/kill.mp3']);
  /*game.load.audio('BG', ['Travel.mp3']);
	music = game.add.audio('BG');
    music.play();
  */
}

var myPlayer;
function create(){
    //assign assest to vars
    game.world.setBounds(0, 0, 800, 800);
	killzom = game.add.audio('kill');
    land = game.add.tileSprite (0, 0, game.width, game.height, 'bg');
    land.fixedToCamera = true;
    
    myPlayer = new Player();
    myPlayer.players = game.add.sprite(200, 200, 'playerSpriteSheet');
    myPlayer.players.body.collideWorldBounds = true;
    myPlayer.players.anchor.setTo(0.5, 0.5);
    //animation for when not moving
    myPlayer.players.animations.add('downStop',  [1],  true);
    myPlayer.players.animations.add('leftStop',  [4],  true);
    myPlayer.players.animations.add('rightStop', [7],  true);
    myPlayer.players.animations.add('upStop',    [10], true);
    //animation for moving
    myPlayer.players.animations.add('down',  [0,1,2,1],    myPlayer.fps, true);
    myPlayer.players.animations.add('left',  [3,4,5,4],    myPlayer.fps, true);
    myPlayer.players.animations.add('right', [6,7,8,7],    myPlayer.fps, true);
    myPlayer.players.animations.add('up',    [9,10,11,10], myPlayer.fps, true);
    
    
	text = game.add.text(10, 33, "Score: " + myPlayer.score, {
        font: "25px Arial",
        fill: "#ff0044",
        align: "left"
    });
	text.fixedToCamera = true;
    
    enemies = [];
    for (var i = 0; i < numOfZombs; i++){
        enemies.push(new EnemyZom(i, game));
    }
   
    game.camera.follow(myPlayer.players);
    game.camera.deadzone = new Phaser.Rectangle(200,200, 130, 130);
	game.camera.focusOnXY(0, 0);
	hpxpbar = game.add.sprite(5, 3, 'hpxp');
	hpxpbar.fixedToCamera = true;
	pause = game.add.button(5, 60, 'pausebutton', actionOnClick, this, 2, 1, 0)
}

function update(){
    console.log(myPlayer.moveBoolX);
    game.input.onDown.add(getThere, this);
    if(myPlayer.moveBoolX){
        myPlayer.players.body.velocity.x = (myPlayer.dx/myPlayer.time)*1000;
        if(myPlayer.dx > 0){myPlayer.facing = 'rightStop';}
        else{myPlayer.facing = 'leftStop';}
        if((myPlayer.players.x < myPlayer.newX+2) && (myPlayer.players.x > myPlayer.newX-2)){
            myPlayer.players.body.velocity.x = 0;
            myPlayer.players.x = myPlayer.newX;
            myPlayer.moveBoolX = false;
        }
    }
    if(myPlayer.moveBoolY){
        myPlayer.players.body.velocity.y = (myPlayer.dy/myPlayer.time)*1000;
        if(myPlayer.dy > 0){myPlayer.facing = 'downStop';}
        else{myPlayer.facing = 'upStop';}
        
        if((myPlayer.players.y < myPlayer.newY+2) && (myPlayer.players.y > myPlayer.newY-2)){
            myPlayer.players.body.velocity.y = 0;
            myPlayer.players.y = myPlayer.newY;
            myPlayer.moveBoolY = false;
        }
    }
    if(myPlayer.players.body.velocity.y == 0 &&
       myPlayer.players.body.velocity.x == 0){
        myPlayer.players.animations.play(myPlayer.facing);
    }
    
    land.tilePosition.x = -game.camera.x;
    land.tilePosition.y = -game.camera.y;
    text.x = game.camera.x+5;
    text.y = game.camera.y+33;
    pause.x = game.camera.x+5;
    pause.y = game.camera.y+66;
    moveEnemy();
    for (var i = 0; i < enemies.length; i++){
        if (enemies[i].alive){
            game.physics.collide(enemies[i].zombie, myPlayer.players, collisionHandler);
        }
    }
    if(myPlayer.score == 5){text.setText("You Win!");}
    
}
function moveEnemy(){
    for(var i = 0; i<numOfZombs; i++){        
        enemies[i].dx = myPlayer.players.x-enemies[i].zombie.x;
        enemies[i].dy = myPlayer.players.y-enemies[i].zombie.y;
        enemies[i].dist = Math.sqrt(enemies[i].dx*enemies[i].dx+enemies[i].dy*enemies[i].dy);
        enemies[i].xTime = enemies[i].dist/enemies[i].vx;
        enemies[i].yTime = enemies[i].dist/enemies[i].vy;
        enemies[i].zombie.body.velocity.x = (enemies[i].dx/enemies[i].xTime)*2.5;
        enemies[i].zombie.body.velocity.y = (enemies[i].dy/enemies[i].yTime)*2.5;
    }
}
function getThere(){
    myPlayer.speed = 100;
    myPlayer.newX = game.input.worldX;
    myPlayer.newY = game.input.worldY;
    myPlayer.dx = Math.round(myPlayer.newX-myPlayer.players.x);
    myPlayer.dy = Math.round(myPlayer.newY-myPlayer.players.y);
    myPlayer.dist = Math.round(Math.sqrt(myPlayer.dx*myPlayer.dx+myPlayer.dy*myPlayer.dy));
    myPlayer.time = Math.round((myPlayer.dist/myPlayer.speed)*1000);
    myPlayer.moveBoolX = true;
    myPlayer.moveBoolY = true;
    myPlayer.xy = Math.abs(myPlayer.dx)-Math.abs(myPlayer.dy);
    console.log(myPlayer.xy);
    if(myPlayer.dx<0 && myPlayer.xy > 0){myPlayer.players.animations.play('left');}
    if(myPlayer.dx>0 && myPlayer.xy > 0){myPlayer.players.animations.play('right')}
    if(myPlayer.dy<0 && myPlayer.xy < 0){myPlayer.players.animations.play('up')}
    if(myPlayer.dy>0 && myPlayer.xy < 0){myPlayer.players.animations.play('down')}
}

function collisionHandler(obj1, obj2){
	obj1.kill();
    updateText();
    //myPlayer.players.x = myPlayer.newX;
}

function updateText(){
    myPlayer.score++;
    text.setText("Score: " + myPlayer.score);
}
function actionOnClick(){
    text.setText("clicked");
	game.paused = true;

}