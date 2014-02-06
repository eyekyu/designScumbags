function checkCollisions(){
    for(var i=0; i<rocks.length; i++){
        game.physics.collide(rocks[i].obj, localPlayer.sprite, obstacle);
        for(var j=0; j<enemies.length; j++){
            game.physics.collide(pond.obj, enemies[j].sprite, obstacle);
            game.physics.collide(enemies[j].sprite, arrows, hitEmemies);
            game.physics.collide(enemies[j].sprite, localPlayer.sprite, hitByEnemy);
            game.physics.collide(rocks[i].obj, enemies[j].sprite, obstacle);
        }
    }
    for(var i=0; i<trees.length; i++){
        game.physics.collide(trees[i].obj, localPlayer.sprite, obstacle);
        for(var k = 0;k<trees.length;k++){
            game.physics.collide(trees[k].obj, enemies[i].sprite,obstacle);
        }
    }
    game.physics.collide(bow, localPlayer.sprite, getItem);
    game.physics.collide(coin, localPlayer.sprite, getItemPoints);
   game.physics.collide(pond.obj, localPlayer.sprite, obstacle);
	game.physics.collide(medipack, localPlayer.sprite, healPlayer);
}

function hitByEnemy(e, p){
    if(hpF.width < 0){
        p.kill();
        hpF.width = 0;
    }else{hpF.width -= dmg;}
}

function obstacle(obj1,obj2){
    obj2.body.velocity.x = 0;
    obj2.body.velocity.y = 0;
    obj2.dx = 0;
    obj2.dy = 0;
    if(obj2.facing == 'left') {obj2.facing = 'leftStop';}
    if(obj2.facing == 'right'){obj2.facing = 'rightStop';}
    if(obj2.facing == 'down') {obj2.facing = 'downStop';}
    if(obj2.facing == 'up')   {obj2.facing = 'upStop';}
}

function hitEmemies(obj1, obj2) {
    obj1.kill();
    obj2.kill();
    localPlayer.score+=5;
    //killzom.play();
    xpF.width = xpF.width + levelRate;
	
}

function getItem(obj1, obj2) {
    weapon = true;
    obj1.kill();
    HASbow.visible = true;
}

function getItemPoints(obj1, obj2) {
    obj1.kill();
    localPlayer.score += 100;
}


function healPlayer(obj1, obj2) {
obj1.kill();
hpF.width = hpF.width + 50;

}
