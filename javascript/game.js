var bg, hm, fixed, land, localPlayer,levelRate, enemyGroup, text, levelUp, pause, hpB, xpB, hpF, xpF, dmg, boss, killzom, exp,medipack, obstacles, bullets, localPlayer, coin, pond, cursors; numOfZombs=100;numOfTrees=20;numOfRocks=10; menuUp = false; dmg = 0.25; exp = 10; weapon = false; level = 1;origWidth = 1358; origHeight=700; moved=false; inventoryOpen=true; allPlayers = []; rocks = []; trees = []; enemies = [],nextFire = 0; fireRate = 500; 

var game = new Phaser.Game(origWidth, origHeight, Phaser.AUTO,'',{preload: preload, create:create, update:update});
//game.state.add('one', one, true);
function preload(){
    text = game.add.text(240, 160, "", {
        font: "25px Arial",
        fill: "#ff0044",
        align: "left"
    });
    
    //load assets
    text.setText("Loading..");
    game.load.spritesheet('playerSpriteSheet', '../images/character.png',27,32);
    game.load.spritesheet('zombie',            '../images/zombie.png',   26,32);
    //game.load.audio('kill',         ['../sounds/kill.mp3']);
    game.load.image('bg',            '../images/bg.jpg');
    game.load.image('hpF',           '../images/hpF3.png');
    game.load.image('hpB',           '../images/hpB3.png');
    game.load.image('xpF',           '../images/xpF.png');
    game.load.image('xpB',           '../images/xpB.png');
    game.load.image('bow',           '../images/bowArrow.png');
    game.load.image('menu',          '../images/QA.png');
    game.load.image('inven',         '../images/inventory.png');
    game.load.image('invisibleSheet','../images/sheet.png');
    game.load.image('tree',          '../images/trees.png');
    game.load.image('overMenu',      '../images/menu.png');
    game.load.image('pausebutton',   '../images/pausebutton.png');
    game.load.image('arrow',         '../images/arrow.png');
    game.load.image('pond',          '../images/pond.png');
    game.load.image('rock',          '../images/rock.png');
    game.load.image('coin',          '../images/coin.png');
	game.load.image('medi',          '../images/medi.png');
  /*game.load.audio('BG', ['Travel.mp3']);
        music = game.add.audio('BG');
    music.play();
  */
   // text.setText("Loaded");
}

function create(){
	game.stage.scaleMode = Phaser.StageScaleMode.EXACT_FIT;
    //assign assest to vars
    game.world.setBounds(0, 0, 2000, 2000);
    //killzom = game.add.audio('kill');
    land = game.add.tileSprite (-50, -50, game.width+100, game.height+100, 'bg');
    land.fixedToCamera = true;
        
    bg = game.add.sprite(0, 0, 'invisibleSheet');
    bg.fixedToCamera = true;
    bg.scale.setTo(origWidth, origHeight);
    bg.inputEnabled = true;
    bg.input.priorityID = 0;
        
    coin = game.add.sprite(760, 180, 'coin');
    coin.anchor.setTo(0.5, 0.5);
	medipack = game.add.sprite(850, 300, 'medi');
	
	levelRate = 100;
    
	for(var i = 0; i<numOfRocks; i++){
        var centX = coin.x;
        var centY = coin.y;
        var rockX;
        var rockY;
        if(i == 0){rockX = centX;    rockY = centY-90;}
        if(i == 1){rockX = centX-30; rockY = centY-60;}
        if(i == 2){rockX = centX+30; rockY = centY-60;}
        if(i == 3){rockX = centX-60; rockY = centY-15;}
        if(i == 4){rockX = centX+60; rockY = centY-15;}
        if(i == 5){rockX = centX-60; rockY = centY+15;}
        if(i == 6){rockX = centX+60; rockY = centY+15;}
        if(i == 7){rockX = centX-30; rockY = centY+60;}
        if(i == 8){rockX = centX+30; rockY = centY+60;}
        if(i == 9){rockX = centX;    rockY = centY+90;}
        rocks.push(new Obs(rockX, rockY, 'rock'));
        rocks[i].obj.width = 80;
        rocks[i].obj.height = 80;
    }
        
    pond = new Obs(670, 700, 'pond');
	pond.height = pond.height +80;
	pond.width = pond.width +80;
        
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
    localPlayer.sprite.animations.play('downStop');
    
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
    
    for(var i = 0; i < numOfTrees; i++){
        trees.push(new Obs(game.world.randomX, game.world.randomY, 'tree'));
        if(trees[i].obj.x < localPlayer.sprite.x+300 && trees[i].obj.x > localPlayer.sprite.x-300 ){
            if(trees[i].obj.x > localPlayer.sprite.x){trees[i].obj.x += 250}
            if(trees[i].obj.x < localPlayer.sprite.x){trees[i].obj.x -= 250}
        }
        if(trees[i].obj.y < localPlayer.sprite.y+300 && trees[i].obj.y > localPlayer.sprite.y-300 ){
            if(trees[i].obj.y > localPlayer.sprite.y){trees[i].obj.y += 250}
            if(trees[i].obj.y < localPlayer.sprite.y){trees[i].obj.y -= 250}
        }
		(trees[i].obj.height = trees[i].obj.height +80)*2;
		(trees[i].obj.width = trees[i].obj.width +80)*2;
		
    }
    text = game.add.text(10, 33, "Score: " + localPlayer.score, {
		font: "25px Arial",
		fill: "#ff0044",
		align: "left"
	});
    text.fixedToCamera = true;
    game.camera.follow(localPlayer.sprite);
    game.camera.deadzone = new Phaser.Rectangle(325, 243, 150, 112);
    game.camera.focusOnXY(0, 0);

    hpF = game.add.sprite(2, 20, 'hpF');
    hpB = game.add.sprite(2, 12, 'hpB');
        
    hpF.height = 50;
    hpF.width = 285;
    
    hpB.height = 100;
    hpB.width = 600;
    
	xpF = game.add.sprite(2,hpF.y+20, 'xpF');
    xpB = game.add.sprite(2, hpF.y+20, 'xpB');
	
    xpF.height = 20;
    xpF.width = 0;
        
    xpB.height = 80;
    xpB.width = 460;
	
		levelUp = game.add.text(300, 20, "Level: " + level, {
		font: "30px impact",
		fill: "#ffffff",
		align: "left"
	});
        
    overMenu = game.add.sprite(game.camera.x, game.camera.y, 'overMenu');
    overMenu.visible = false;

    menuRight = game.add.button(465, 3, 'menu', menuClickRight, this, 2, 1, 0);
    menuRight.input.priorityID = 2;
    menuRight.alpha = 0;
        
    inven = game.add.button(-100, -100, 'inven', menuClickRight, this, 2, 1, 0);
    inven.input.priorityID = 3;
    inven.alpha = 0;
        
    
    pause = game.add.button(5, 230, 'pausebutton', pauseGame, this, 2, 1, 0);
    pause.height = 65 ;
    pause.width = 65;
        
    bow = game.add.sprite(300, 300, 'bow');
	bow.height= bow.height +10;
	bow.width= bow.width +10;
    HASbow = game.add.sprite(inven.x+5, inven.y+5, 'bow');
    HASbow.visible = false;
        
    arrows = game.add.group();
    arrows.createMultiple(30, 'arrow');
    arrows.setAll('anchor.x', 0.5);
    arrows.setAll('anchor.y', 0.5);
    arrows.setAll('outOfBoundsKill', true);
    cursors = game.input.keyboard.createCursorKeys();
}

function update(){
    hud();
    movePlayer();
    checkCollisions();
    lvlOne();
    bg.events.onInputDown.add(getThere, this);
    localPlayer.sprite.events.onInputDown.add(inventory, this);
	
    if (weapon){
        for(var i=0; i<enemies.length;i++){
            enemies[i].sprite.events.onInputDown.add(fire ,this);
        }
    }
	
	if (xpF.width>=300){
        level ++;
        xpF.width = 0;
        levelRate = levelRate -10;
	}
    
    overMenu.x = game.camera.x+120;
    overMenu.y = game.camera.y+50;
    HASbow.x = inven.x+8;
    HASbow.y = inven.y+14;
    HASbow.scale = 0.6;
    
    if(localPlayer.score == 50){
        rocks[4].visible = false;
        rocks[6].visible = false;
    }
    if(localPlayer.sprite.alive){moveEnemy();}
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

function menuClickRight () {}
function menuClickLeft () {if (weapon){fire();}}

function fire () {
    if (game.time.now > nextFire && arrows.countDead() > 0){
        nextFire = game.time.now + fireRate;
        var arrow = arrows.getFirstDead();
        arrow.reset(localPlayer.sprite.x, localPlayer.sprite.y);
        arrow.rotation = game.physics.moveToPointer(arrow, 1500);
    }
}

function inventory() {
    if(inventoryOpen){
        if(moved){
            inven.x = localPlayer.newX + 20;
            inven.y = localPlayer.newY - 20;
            game.add.tween(inven).to({alpha: 1}, 1000, Phaser.Easing.Linear.None,true,0,0,false);
            game.add.tween(HASbow).to({alpha: 1}, 1000, Phaser.Easing.Linear.None,true,0,0,false);
            inventoryOpen = false;
        }
        else{
            inven.x = localPlayer.x-10;
            inven.y = localPlayer.y;
            game.add.tween(inven).to({alpha: 1}, 1000, Phaser.Easing.Linear.None,true,0,0,false);
            game.add.tween(HASbow).to({alpha: 1}, 1000, Phaser.Easing.Linear.None,true,0,0,false);
            inventoryOpen = false;
        }
    }
    else{
        game.add.tween(inven).to({alpha: 0}, 1000, Phaser.Easing.Linear.None,true,0,0,false);
        game.add.tween(HASbow).to({alpha: 0}, 1000, Phaser.Easing.Linear.None,true,0,0,false);
        inven.x = -200;
        inven.y = -200;
        inventoryOpen = true;
    }
}



function bigboss() {
    if(localPlayer.score < 50){
        bosses = [];
        for (var i = 0; i < 1; i++){
            bosses.push(new EnemyZom());
            bosses[i].sprite.animations.add('downZ',  [0,1,2,1],    localPlayer.fps, true);
            bosses[i].sprite.animations.add('leftZ',  [3,4,5,4],    localPlayer.fps, true);
            bosses[i].sprite.animations.add('rightZ', [6,7,8,7],    localPlayer.fps, true);
            bosses[i].sprite.animations.add('upZ',    [9,10,11,10], localPlayer.fps, true);
            if(bosses[i].sprite.x < localPlayer.players.x+300 && bosses[i].zombie.x > localPlayer.players.x-300 ){
                if(bosses[i].sprite.x > localPlayer.sprite.x){bosses[i].sprite.x += 250}
                if(bosses[i].sprite.x < localPlayer.sprite.x){bosses[i].sprite.x -= 250}
            }
            if(bosses[i].zombie.y < localPlayer.players.y+300 && bosses[i].zombie.y > localPlayer.players.y-300 ){
                if(bosses[i].sprite.y > localPlayer.sprite.y){bosses[i].zombie.y += 250}
                if(bosses[i].sprite.y < localPlayer.sprite.y){bosses[i].zombie.y -= 250}
            }
        }
    }
}