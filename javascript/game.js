var bg, hm, fixed, land, localPlayer, enemyGroup, text, enemies, numOfZombs,pause, hpB, xpB, hpF, xpF, dmg;
numOfZombs = 10;
dmg = 0.25;
var game = new Phaser.Game(480, 320, Phaser.AUTO,'',{preload: preload, create:create, update:update});

function preload(){
    text = game.add.text(240, 160, "", {
        font: "25px Arial",
        fill: "#ff0044",
        align: "left"
    });
    //load assets
	game.load.spritesheet('playerSpriteSheet', 'images/character.png',27,32);
    game.load.spritesheet('zombie', 'images/zombie.png',26,32);
	game.load.image('bg','images/bg.jpg');
    game.load.image('hpF','images/hpF.png');
    game.load.image('hpB','images/hpB.png');
    game.load.image('xpF','images/xpF.png');
    game.load.image('xpB','images/xpB.png');
    game.load.image('chainsaw','images/cs.png');
	game.load.image('pausebutton','images/pausebutton.png');
    game.load.audio('kill', ['sounds/kill.mp3']);
    text.setText("Loading");
  /*game.load.audio('BG', ['Travel.mp3']);
	music = game.add.audio('BG');
    music.play();
  */
}

function create(){
    //assign assest to vars
    game.world.setBounds(0, 0, 900, 900);
	killzom = game.add.audio('kill');
    land = game.add.tileSprite (-50, -50, game.width+100, game.height+100, 'bg');
    land.fixedToCamera = true;
    allPlayers = [];
    for (var i = 0; i < 1; i++){
        allPlayers.push(new Player());
        //animation for when not moving
        allPlayers[i].players.animations.add('downStop',  [1],  true);
        allPlayers[i].players.animations.add('leftStop',  [4],  true);
        allPlayers[i].players.animations.add('rightStop', [7],  true);
        allPlayers[i].players.animations.add('upStop',    [10], true);
        //animation for moving
        allPlayers[i].players.animations.add('down',  [0,1,2,1],    allPlayers[i].fps, true);
        allPlayers[i].players.animations.add('left',  [3,4,5,4],    allPlayers[i].fps, true);
        allPlayers[i].players.animations.add('right', [6,7,8,7],    allPlayers[i].fps, true);
        allPlayers[i].players.animations.add('up',    [9,10,11,10], allPlayers[i].fps, true);
    }
    localPlayer = allPlayers[0];
    localPlayer.players.animations.play('downStop');
    enemies = [];
    for (var i = 0; i < numOfZombs; i++){
        enemies.push(new EnemyZom());
        enemies[i].zombie.animations.add('downZ',  [0,1,2,1],    localPlayer.fps, true);
        enemies[i].zombie.animations.add('leftZ',  [3,4,5,4],    localPlayer.fps, true);
        enemies[i].zombie.animations.add('rightZ', [6,7,8,7],    localPlayer.fps, true);
        enemies[i].zombie.animations.add('upZ',    [9,10,11,10], localPlayer.fps, true);
        if(enemies[i].zombie.x < localPlayer.players.x+300 && enemies[i].zombie.x > localPlayer.players.x-300 ){
            if(enemies[i].zombie.x > localPlayer.players.x){enemies[i].zombie.x += 250}
            if(enemies[i].zombie.x < localPlayer.players.x){enemies[i].zombie.x -= 250}
        }
        if(enemies[i].zombie.y < localPlayer.players.y+300 && enemies[i].zombie.y > localPlayer.players.y-300 ){
            if(enemies[i].zombie.y > localPlayer.players.y){enemies[i].zombie.y += 250}
            if(enemies[i].zombie.y < localPlayer.players.y){enemies[i].zombie.y -= 250}
        }
    }
    
	text = game.add.text(10, 33, "Score: " + localPlayer.score, {
        font: "25px Arial",
        fill: "#ff0044",
        align: "left"
    });
	text.fixedToCamera = true;
   
    game.camera.follow(localPlayer.players);
    game.camera.deadzone = new Phaser.Rectangle(100,100, 130, 130);
	game.camera.focusOnXY(0, 0);
    
    hpB = game.add.sprite(2, 2, 'hpB');
    hpF = game.add.sprite(2, 2, 'hpF');
    xpB = game.add.sprite(2, 10, 'xpB');
    xpF = game.add.sprite(2, 10, 'xpF');
    xpF.width = 1;
	pause = game.add.button(5, 60, 'pausebutton', pauseGame, this, 2, 1, 0);
    cs = game.add.sprite(game.world.randomX, game.world.randomY, 'chainsaw');
    console.log(cs.x + ':' + cs.y);
}

function update(){
    updateText()
    game.input.onDown.add(getThere, this);
    if(localPlayer.moveBoolX){
        localPlayer.players.body.velocity.x = (localPlayer.dx/localPlayer.time)*1000;
        if(localPlayer.dx > 0){localPlayer.facing = 'rightStop';}
        else{localPlayer.facing = 'leftStop';}
        if((localPlayer.players.x < localPlayer.newX+2) && (localPlayer.players.x > localPlayer.newX-2)){
            localPlayer.players.body.velocity.x = 0;
            localPlayer.players.x = localPlayer.newX;
            localPlayer.moveBoolX = false;
        }
    }
    if(localPlayer.moveBoolY){
        localPlayer.players.body.velocity.y = (localPlayer.dy/localPlayer.time)*1000;
        if(localPlayer.dy > 0){localPlayer.facing = 'downStop';}
        else{localPlayer.facing = 'upStop';}
        if((localPlayer.players.y < localPlayer.newY+2) && (localPlayer.players.y > localPlayer.newY-2)){
            localPlayer.players.body.velocity.y = 0;
            localPlayer.players.y = localPlayer.newY;
            localPlayer.moveBoolY = false;
        }
    }
    if(localPlayer.players.body.velocity.y == 0 &&
       localPlayer.players.body.velocity.x == 0){
        localPlayer.players.animations.play(localPlayer.facing);
    }
    
    land.tilePosition.x = -game.camera.x;
    land.tilePosition.y = -game.camera.y;
    text.x = game.camera.x+5;
    text.y = game.camera.y+33;
    pause.x = game.camera.x+5;
    pause.y = game.camera.y+66;
    hpF.x = game.camera.x+2;
    hpF.y = game.camera.y+2;
    hpB.x = game.camera.x+2;
    hpB.y = game.camera.y+2;
    xpF.x = game.camera.x+2;
    xpF.y = game.camera.y+14;
    xpB.x = game.camera.x+2;
    xpB.y = game.camera.y+14;
    
    if(localPlayer.players.alive){moveEnemy();}
    for (var i = 0; i < enemies.length; i++){
        if (enemies[i].alive){
            game.physics.collide(enemies[i].zombie, localPlayer.players, collisionHandler);
        }
    }
    if(localPlayer.score == 5){text.setText("You Win!");}    
}
function moveEnemy(){
    for(var i = 0; i<numOfZombs; i++){        
        enemies[i].dx = localPlayer.players.x-enemies[i].zombie.x;
        enemies[i].dy = localPlayer.players.y-enemies[i].zombie.y;
        enemies[i].dist = Math.sqrt(enemies[i].dx*enemies[i].dx+enemies[i].dy*enemies[i].dy);
        enemies[i].xTime = enemies[i].dist/enemies[i].vx;
        enemies[i].yTime = enemies[i].dist/enemies[i].vy;
        enemies[i].zombie.body.velocity.x = (enemies[i].dx/enemies[i].xTime)*2.5;
        enemies[i].zombie.body.velocity.y = (enemies[i].dy/enemies[i].yTime)*2.5;
        var zomXY = Math.abs(enemies[i].dx)-Math.abs(enemies[i].dy);
        if(enemies[i].dx < 0 && zomXY > 0){enemies[i].zombie.animations.play('leftZ');}
        if(enemies[i].dx > 0 && zomXY > 0){enemies[i].zombie.animations.play('rightZ')}
        if(enemies[i].dy < 0 && zomXY < 0){enemies[i].zombie.animations.play('upZ')}
        if(enemies[i].dy > 0 && zomXY < 0){enemies[i].zombie.animations.play('downZ')}
    }
}
function getThere(){
    localPlayer.speed = 100;
    localPlayer.newX = game.input.worldX;
    localPlayer.newY = game.input.worldY;
    localPlayer.dx = Math.round(localPlayer.newX-localPlayer.players.x);
    localPlayer.dy = Math.round(localPlayer.newY-localPlayer.players.y);
    localPlayer.dist = Math.round(Math.sqrt(localPlayer.dx*localPlayer.dx+localPlayer.dy*localPlayer.dy));
    localPlayer.time = Math.round((localPlayer.dist/localPlayer.speed)*1000);
    localPlayer.moveBoolX = true;
    localPlayer.moveBoolY = true;
    localPlayer.xy = Math.abs(localPlayer.dx)-Math.abs(localPlayer.dy);
    if(localPlayer.dx<0 && localPlayer.xy > 0){localPlayer.players.animations.play('left');}
    if(localPlayer.dx>0 && localPlayer.xy > 0){localPlayer.players.animations.play('right')}
    if(localPlayer.dy<0 && localPlayer.xy < 0){localPlayer.players.animations.play('up')}
    if(localPlayer.dy>0 && localPlayer.xy < 0){localPlayer.players.animations.play('down')}
}

function collisionHandler(obj1, obj2){
    if(hpF.width < 0){
        obj2.kill();
        hpF.width = 0;
    }
    else{hpF.width -= dmg;}
}

function updateText(){
    text.setText("Score: " + localPlayer.score);
}
function pauseGame(){
    text.setText('PAUSED');
	game.paused = true;
    pause.events.onInputDown.remove(pauseGame,this);
    pause.events.onInputDown.add(resumeGame,this);
}
function resumeGame(){
	game.paused = false;
    pause.events.onInputDown.remove(resumeGame,this);
    pause.events.onInputDown.add(pauseGame,this);
}