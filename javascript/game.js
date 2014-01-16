var bg, hm, fixed, land, localPlayer, enemyGroup, text, enemies, numOfZombs, pause, hpB, xpB, hpF, xpF, dmg, boss, killzom, exp, obstacles, bullets, localPlayer, coin, pond, cursors; numOfZombs=10;numOfTrees=20;numOfRocks=20; menuUp = false; dmg = 0.25; exp = 2; weapon = false; origWidth = 1358; origHeight=700; moved=false; inventoryOpen=true; allPlayers = []; rocks = []; trees = []; nextFire = 0; fireRate = 100;

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
    game.load.spritesheet('zombie',            '../images/zombie.png',   26,32);
    
    game.load.audio('kill', ['../sounds/kill.mp3']);
    
    text.setText("Loading..");
        game.load.image('bg',            '../images/bg.jpg');
    game.load.image('hpF',           '../images/hpF3.png');
    game.load.image('hpB',           '../images/hpB3.png');
    game.load.image('xpF',           '../images/xpF.png');
    game.load.image('xpB',           '../images/xpB.png');
    game.load.image('chainsaw',      '../images/bowArrow.png');
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
    text.setText("Loading");
  /*game.load.audio('BG', ['Travel.mp3']);
        music = game.add.audio('BG');
    music.play();
  */
}

function create(){
    //assign assest to vars
    game.world.setBounds(0, 0, 2000, 2000);
        killzom = game.add.audio('kill');
    land = game.add.tileSprite (-50, -50, game.width+100, game.height+100, 'bg');
    land.fixedToCamera = true;
        
        bg = game.add.sprite(0, 0, 'invisibleSheet');
        bg.fixedToCamera = true;
        bg.scale.setTo(origWidth, origHeight);
        bg.inputEnabled = true;
        bg.input.priorityID = 0;
        
        coin = game.add.sprite(760, 180, 'coin');
        coin.anchor.setTo(0.5, 0.5);
    
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
        rocks[i].obj.width = 30;
        rocks[i].obj.height = 30;
    }
        
    new Obs(670, 700, 'pond');
        
        //allows us to add more touch inputs
        //game.input.addPointer();
        
    for(var i = 0; i < 1; i++){
        allPlayers.push(new Player());
        //sprites for when not moving
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
    for(var i = 0; i < numOfZombs; i++){
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
    
    for(var i = 0; i < numOfTrees; i++){
        trees.push(new Obs(game.world.randomX, game.world.randomY, 'tree'));
        if(trees[i].obj.x < localPlayer.players.x+300 && trees[i].obj.x > localPlayer.players.x-300 ){
            if(trees[i].obj.x > localPlayer.players.x){trees[i].obj.x += 250}
            if(trees[i].obj.x < localPlayer.players.x){trees[i].obj.x -= 250}
        }
        if(trees[i].obj.y < localPlayer.players.y+300 && trees[i].obj.y > localPlayer.players.y-300 ){
            if(trees[i].obj.y > localPlayer.players.y){trees[i].obj.y += 250}
            if(trees[i].obj.y < localPlayer.players.y){trees[i].obj.y -= 250}
        }
    }
    text = game.add.text(10, 33, "Score: " + localPlayer.score, {
    font: "25px Arial",
    fill: "#ff0044",
    align: "left"
});
    text.fixedToCamera = true;
   
    game.camera.follow(localPlayer.players);
    game.camera.deadzone = new Phaser.Rectangle(400, 200, 558, 300);
    game.camera.focusOnXY(0, 0);

    hpF = game.add.sprite(2, 2, 'hpF');
    hpB = game.add.sprite(2, 2, 'hpB');
        
    hpF.height = 50;
    hpF.width = 200;
    
    hpB.height = 50;
    hpB.width = 200;
    
    xpB = game.add.sprite(2, hpF.y+20, 'xpB');
    xpF = game.add.sprite(2,hpF.y+20, 'xpF');
    xpF.height = 40;
    xpF.width = 160;
        
    xpB.height = 10;
    xpB.width = 160;
        
    overMenu = game.add.sprite(game.camera.x, game.camera.y, 'overMenu');
    overMenu.visible = false;

    menuRight = game.add.button(465, 3, 'menu', menuClickRight, this, 2, 1, 0);
    menuRight.input.priorityID = 2;
    menuRight.alpha = 0;
        
    inven = game.add.button(-100, -100, 'inven', menuClickRight, this, 2, 1, 0);
    inven.input.priorityID = 3;
    inven.alpha = 0;
        
    xpF.width = 1;
    pause = game.add.button(5, 230, 'pausebutton', pauseGame, this, 2, 1, 0);
    pause.height = 50  ;
    pause.width = 50 ;
        
    cs = game.add.sprite(game.world.randomX, game.world.randomY, 'chainsaw');
    HAScs = game.add.sprite(inven.x+5, inven.y+5, 'chainsaw');
    HAScs.visible = false;
    console.log(cs.x + ':' + cs.y);
        
    arrows = game.add.group();
    arrows.createMultiple(30, 'arrow');
    arrows.setAll('anchor.x', 0.5);
    arrows.setAll('anchor.y', 0.5);
    arrows.setAll('outOfBoundsKill', true);
        
        cursors = game.input.keyboard.createCursorKeys();
}

function update(){
    updateText();
    //game.input.onDown.add(getThere, this);
    bg.events.onInputDown.add(getThere, this);
    localPlayer.players.events.onInputDown.add(inventory, this);         
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
            localPlayer.moveBoolY = false
                        
        }
    }
    if(localPlayer.players.body.velocity.y == 0 &&
       localPlayer.players.body.velocity.x == 0){
        localPlayer.players.animations.play(localPlayer.facing);
    }
        
    for(var i=0; i<rocks.length; i++){game.physics.collide(rocks[i].obj, localPlayer.players, obstacle);}
    for(var i=0; i<trees.length; i++){game.physics.collide(trees[i].obj, localPlayer.players, obstacle);}
    
    land.tilePosition.x = -game.camera.x;
    land.tilePosition.y = -game.camera.y;
    text.x = game.camera.x+5;
    text.y = game.camera.y+80;
    pause.x = game.camera.x+210;
    pause.y = game.camera.y+1;
    hpF.x = game.camera.x+2;
    hpF.y = game.camera.y+2;
    hpB.x = game.camera.x+2;
    hpB.y = game.camera.y+2;
    xpF.x = game.camera.x+2;
    xpF.y = game.camera.y+60;
    xpB.x = game.camera.x+2;
    xpB.y = game.camera.y+60;

    overMenu.x = game.camera.x+120;
        overMenu.y = game.camera.y+50;
        HAScs.x = inven.x+8;
        HAScs.y = inven.y+14;
        HAScs.sclae = 0.6;
        
    if(localPlayer.players.alive){moveEnemy();}
    for (var i = 0; i < enemies.length; i++){
        if (enemies[i].alive){
            game.physics.collide(enemies[i].zombie, localPlayer.players, collisionHandler);
                        game.physics.collide(enemies[i].zombie, arrows, collisionHandler2);
                        game.physics.collide(cs, localPlayer.players, collisionHandler3);
                        game.physics.collide(coin, localPlayer.players, collisionHandler4);
        }
    }
    //if(localPlayer.score == 5){text.setText("You Win!");}    
        if (weapon){if (cursors.up.isDown){fire();}}
        
        if(localPlayer.score == 50){
        rocks[4].visible = false;
        rocks[6].visible = false;
        }
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
    if(!menuUp){
        moved = true;
        //game.add.tween(inven).to({alpha: 0}, 1000, Phaser.Easing.Linear.None,true,0,0,false);
inven.x = -200;
inven.y = -200;
inventoryOpen = true;
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
}

function updateText(){text.setText("Score: " + localPlayer.score);}

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
        arrow.reset(localPlayer.players.x, localPlayer.players.y);
        arrow.rotation = game.physics.moveToPointer(arrow, 1000);
    }
}

function inventory() {
    if(inventoryOpen){
        if(moved){
            inven.x = localPlayer.newX + 20;
            inven.y = localPlayer.newY - 20;
            game.add.tween(inven).to({alpha: 1}, 1000, Phaser.Easing.Linear.None,true,0,0,false);
            game.add.tween(HAScs).to({alpha: 1}, 1000, Phaser.Easing.Linear.None,true,0,0,false);
            inventoryOpen = false;
        
        }
        else{
            inven.x = localPlayer.x-10;
            inven.y = localPlayer.y;
            game.add.tween(inven).to({alpha: 1}, 1000, Phaser.Easing.Linear.None,true,0,0,false);
            game.add.tween(HAScs).to({alpha: 1}, 1000, Phaser.Easing.Linear.None,true,0,0,false);
            inventoryOpen = false;
        }
    }
    else{
        game.add.tween(inven).to({alpha: 0}, 1000, Phaser.Easing.Linear.None,true,0,0,false);
        game.add.tween(HAScs).to({alpha: 0}, 1000, Phaser.Easing.Linear.None,true,0,0,false);
        inven.x = -200;
        inven.y = -200;
        inventoryOpen = true;
    }
}

/*
function bigboss() {
if(localPlayer.score == 50){
    bosses = [];
    for (var i = 0; i < 1; i++){
        bosses.push(new EnemyZom());
        bosses[i].zombie.animations.add('downZ',  [0,1,2,1],    localPlayer.fps, true);
        bosses[i].zombie.animations.add('leftZ',  [3,4,5,4],    localPlayer.fps, true);
        bosses[i].zombie.animations.add('rightZ', [6,7,8,7],    localPlayer.fps, true);
        bosses[i].zombie.animations.add('upZ',    [9,10,11,10], localPlayer.fps, true);
        if(bosses[i].zombie.x < localPlayer.players.x+300 && bosses[i].zombie.x > localPlayer.players.x-300 ){
            if(bosses[i].zombie.x > localPlayer.players.x){bosses[i].zombie.x += 250}
            if(bosses[i].zombie.x < localPlayer.players.x){bosses[i].zombie.x -= 250}
        }
        if(bosses[i].zombie.y < localPlayer.players.y+300 && bosses[i].zombie.y > localPlayer.players.y-300 ){
            if(bosses[i].zombie.y > localPlayer.players.y){bosses[i].zombie.y += 250}
            if(bosses[i].zombie.y < localPlayer.players.y){bosses[i].zombie.y -= 250}
        }
    }
}
}*/