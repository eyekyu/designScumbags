var bg, hm, fixed, land, localPlayer, enemyGroup, text, enemies, pause, hpB, xpB, hpF, xpF, dmg,boss,killzom,exp;
numOfZombs = 0;
dmg = 0.25;
exp = 2;
var menuUp = false;
var obstacles;
var weapon = false;
var origWidth = 1358;
var origHeight = 700; 
var moved = false;
var inventoryOpen = true;
var allPlayers = [];
var chest;
var quiver;
var window;
var tut1;
var tut2;
var timer = 0;
var cycle = 1000;
var timetext;
var timerScore = 0;
var door;

var t = 0;
var index = 0;
var line = '';
var next = false;
var shown = false;
var finish = false;
var s, box;
var canExit = false;
var content = [
    'Lets get the basics Started. \nWalk to that chest.         ',
    'You can do this by tapping the \nscreen where the chest is.         '
    ];
var boxOn = true;

var game = new Phaser.Game(origWidth, origHeight, Phaser.AUTO,'',{preload: preload, create:create, update:update});
//game.state.add('one', one, true);

function preload(){
    text = game.add.text(240, 160, "", {
        font: "25px Arial",
        fill: "#ff0044",
        align: "left"
    });
    //load assets
	game.load.spritesheet('playerSpriteSheet', '../images/character.png',27,32);
	game.load.image('door','../images/door.png');
	game.load.image('bg','../images/floor.jpg');
    game.load.image('hpF','../images/hpF3.png');
    game.load.image('hpB','../images/hpB3.png');
    game.load.image('xpF','../images/xpF.png');
    game.load.image('xpB','../images/xpB.png');
	game.load.image('menu','../images/QA.png');
	game.load.image('inven','../images/inventory.png');
	game.load.image('invisibleSheet','../images/sheet.png');
	game.load.image('table','../images/table.png');
	game.load.image('overMenu','../images/menu.png');
	game.load.image('pausebutton','../images/pausebutton.png');
	game.load.image('chest', '../images/chest.gif');
	game.load.image('window', '../images/window.png');
	game.load.image('bz1', '../images/blackzone1.png');
	game.load.image('tut1', '../images/tut1.png');
	game.load.image('tut2', '../images/tut2.png');
    text.setText("Loading");
    game.load.image('box','../images/box2.png');
  /*game.load.audio('BG', ['Travel.mp3']);
	music = game.add.audio('BG');
    music.play();
  */
}
var nextFire = 0;
var fireRate = 100;
var cursors;

function create(){
    game.world.setBounds(0, 0, 1358, 700);
	killzom = game.add.audio('kill');
    land = game.add.tileSprite (-50, -50, game.width+100, game.height+100, 'bg');
    land.fixedToCamera = true;
	
	bg = game.add.sprite(0, 0, 'invisibleSheet');
	bg.fixedToCamera = true;
	bg.scale.setTo(origWidth, origHeight);
	bg.inputEnabled = false;
	bg.input.priorityID = 0;	
	quiver = 20;
	chest = game.add.sprite(760, 300, 'chest');
	door = game.add.sprite(100, 150, 'door');
	obstacles = game.add.group();
	table  = obstacles.create(350, 300, 'table');
	table2 = obstacles.create(350, 150, 'table');
	table3 = obstacles.create(550, 150, 'table');
	table4 = obstacles.create(750, 150, 'table');
	var  window = obstacles.create(370, 0, 'window');
	var  window2 = obstacles.create(610, 0, 'window');
	var  window3 = obstacles.create(850, 0, 'window');
	var  window4 = obstacles.create(1090, 0, 'window');
	var  blackzone1 = obstacles.create(0, 550, 'bz1');
    
	tut1 = game.add.sprite(50, 560, 'tut1');
	tut1.inputEnabled = true;
	tut1.input.priorityID = 3;
	
	tut2 = game.add.sprite(300, 560, 'tut2');
	tut2.inputEnabled = true;
	tut2.input.priorityID = 4;
	 table.body.immovable = true;
	 table2.body.immovable = true;
	 table3.body.immovable = true;
	 table4.body.immovable = true;
	 window.body.immovable = true;
	 window2.body.immovable = true;
	 window3.body.immovable = true;
	 window4.body.immovable = true;
	 blackzone1.body.immovable = true;
    for(var i = 0; i < 1; i++){
        allPlayers.push(new Player());
        //sprites for when not moving
        allPlayers[i].sprite.animations.add('downStop',  [1], true);
        allPlayers[i].sprite.animations.add('leftStop',  [4], true);
        allPlayers[i].sprite.animations.add('rightStop', [7], true);
        allPlayers[i].sprite.animations.add('upStop',    [10],true);
        //animation for moving
        allPlayers[i].sprite.animations.add('down',  [0,1,2,1],    allPlayers[i].fps, true);
        allPlayers[i].sprite.animations.add('left',  [3,4,5,4],    allPlayers[i].fps, true);
        allPlayers[i].sprite.animations.add('right', [6,7,8,7],    allPlayers[i].fps, true);
        allPlayers[i].sprite.animations.add('up',    [9,10,11,10], allPlayers[i].fps, true);
    }
    localPlayer = allPlayers[0];
   // localPlayer.sprite.animations.play('downStop');
	
    enemies = [];
    for(var i = 0; i<numOfZombs; i++){
        enemies.push(new EnemyZom());
        
        enemies[i].sprite.animations.add('downStop',  [1], true);
        enemies[i].sprite.animations.add('leftStop',  [4], true);
        enemies[i].sprite.animations.add('rightStop', [7], true);
        enemies[i].sprite.animations.add('upStop',    [10],true);
        
        enemies[i].sprite.animations.add('downZ',  [0,1,2,1],    localPlayer.fps, true);
        enemies[i].sprite.animations.add('leftZ',  [3,4,5,4],    localPlayer.fps, true);
        enemies[i].sprite.animations.add('rightZ', [6,7,8,7],    localPlayer.fps, true);
        enemies[i].sprite.animations.add('upZ',    [9,10,11,10], localPlayer.fps, true);
        
        if(enemies[i].sprite.x < localPlayer.sprite.x+300 && enemies[i].sprite.x > localPlayer.sprite.x-300 ){
            if(enemies[i].sprite.x > localPlayer.sprite.x){enemies[i].sprite.x += 250}
            if(enemies[i].sprite.x < localPlayer.sprite.x){enemies[i].sprite.x -= 250}
        }
        if(enemies[i].sprite.y < localPlayer.sprite.y+300 && enemies[i].sprite.y > localPlayer.sprite.y-300 ){
            if(enemies[i].sprite.y > localPlayer.sprite.y)     {enemies[i].sprite.y += 250}
            if(enemies[i].sprite.y < localPlayer.sprite.y){enemies[i].sprite.y -= 250}
        }
    }
    
	text = game.add.text(10, 33, "Score: " + localPlayer.score, {
        font: "25px Arial",
        fill: "#ff0044",
        align: "left"
    });
	
	timetext = game.add.text(50, 33, "Time: " + timerScore, {
        font: "25px Arial",
        fill: "#ff0044",
        align: "left"
    });
	text.fixedToCamera = true;
   
    game.camera.follow(localPlayer.sprite);
    game.camera.deadzone = new Phaser.Rectangle(100,100, 130, 130);
	game.camera.focusOnXY(0, 0);

    hpF = game.add.sprite(2, 2, 'hpF');
    hpB = game.add.sprite(2, 2, 'hpB');
	
	hpF.height = 25;
	hpF.width = 238;
	
	hpB.height = 50;
	hpB.width = 300;
    xpB = game.add.sprite(2, hpF.y+20, 'xpB');
    xpF = game.add.sprite(2,hpF.y+20, 'xpF');
	xpF.height = 40;
	xpF.width = 160;
	
	xpB.height = 40;
	xpB.width = 230;
	
	overMenu = game.add.sprite(game.camera.x, game.camera.y, 'overMenu');
	overMenu.visible = false;
	
	xpF.width = 1;
	
	cursors = game.input.keyboard.createCursorKeys();
    
	box = game.add.sprite(250, 80, 'box');
    box.width = 800;
    box.height = 200; 
	box.inputEnabled = true;
    var style = { font: "30pt Courier", fill: "#19cb65", stroke: "#119f4e", strokeThickness: 2 };
    s = game.add.text(box.x+30, box.y+30, '', style);
    t = game.time.now + 40;
}

function update(){
	if(game.time.now > timer){
        timer = game.time.now +cycle;
        timerScore +=1;
	}
    updateText();
    
    //game.input.onDown.add(getThere, this);
    if(bg.inputEnabled){bg.events.onInputDown.add(getThere, this);}
    if(localPlayer.moveBoolX){
        localPlayer.sprite.body.velocity.x = (localPlayer.dx/localPlayer.time)*1000;
        if(localPlayer.dx > 0){localPlayer.facing = 'rightStop';}
        else{localPlayer.facing = 'leftStop';}
        if((localPlayer.sprite.x < localPlayer.newX+2) && (localPlayer.sprite.x > localPlayer.newX-2)){
            localPlayer.sprite.body.velocity.x = 0;
            localPlayer.sprite.x = localPlayer.newX;
            localPlayer.moveBoolX = false;
        }
    }
    if(localPlayer.moveBoolY){
        localPlayer.sprite.body.velocity.y = (localPlayer.dy/localPlayer.time)*1000;
        if(localPlayer.dy > 0){localPlayer.facing = 'downStop';}
        else{localPlayer.facing = 'upStop';}
        if((localPlayer.sprite.y < localPlayer.newY+2) && (localPlayer.sprite.y > localPlayer.newY-2)){
            localPlayer.sprite.body.velocity.y = 0;
            localPlayer.sprite.y = localPlayer.newY;
            localPlayer.moveBoolY = false
        }
    }
    if(localPlayer.sprite.body.velocity.y == 0 &&
       localPlayer.sprite.body.velocity.x == 0){
        localPlayer.sprite.animations.play(localPlayer.facing);
    }
	
    land.tilePosition.x = -game.camera.x;
    land.tilePosition.y = -game.camera.y;
    text.x = game.camera.x+5;
    text.y = game.camera.y+80;
	timetext.x = game.camera.x+5;
    timetext.y = game.camera.y+100;
    hpF.x = game.camera.x+20;
    hpF.y = game.camera.y+15;
    hpB.x = game.camera.x+2;
    hpB.y = game.camera.y+2;
    xpF.x = game.camera.x+2;
    xpF.y = game.camera.y+40;
    xpB.x = game.camera.x+2;
    xpB.y = game.camera.y+40;

    overMenu.x = game.camera.x+120;
	overMenu.y = game.camera.y+50;
    
    
    
    game.physics.collide(chest, localPlayer.sprite, getItemPoints);
    if(localPlayer.sprite.alive){moveEnemy();}
    checkCollisions();   
	if (weapon && cursors.up.isDown){fire();}
    if(boxOn){textBox();}
}

function getThere(){
    if(!menuUp){
	   moved = true;
        localPlayer.speed = 100;
        localPlayer.newX = game.input.worldX;
        localPlayer.newY = game.input.worldY;
        localPlayer.dx = Math.round(localPlayer.newX-localPlayer.sprite.x);
        localPlayer.dy = Math.round(localPlayer.newY-localPlayer.sprite.y);
        localPlayer.dist = Math.round(Math.sqrt(localPlayer.dx*localPlayer.dx+localPlayer.dy*localPlayer.dy));
        localPlayer.time = Math.round((localPlayer.dist/localPlayer.speed)*1000);
        localPlayer.moveBoolX = true;
        localPlayer.moveBoolY = true;
        localPlayer.xy = Math.abs(localPlayer.dx)-Math.abs(localPlayer.dy);
        if(localPlayer.dx<0 && localPlayer.xy > 0){localPlayer.sprite.animations.play('left');}
        if(localPlayer.dx>0 && localPlayer.xy > 0){localPlayer.sprite.animations.play('right')}
        if(localPlayer.dy<0 && localPlayer.xy < 0){localPlayer.sprite.animations.play('up')}
        if(localPlayer.dy>0 && localPlayer.xy < 0){localPlayer.sprite.animations.play('down')}
	}
}

function updateText(){
    text.setText("Score: " + localPlayer.score);
	timetext.setText("Time: " + timerScore);
}