
function checkCollisions(){
	game.physics.collide(table3, localPlayer.sprite, working);
    game.physics.collide(door, localPlayer.sprite, exit);
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

function getItemPoints(obj1, obj2) {
    obj1.kill();
    localPlayer.score += 100;
    content = ["Excellent, you made that \nlook like ya've done that \nbefore            ",
               "Chests can contain items, \nto view your items tap your \ncharacter            ",
               "Now to go outside just use \nthe door to the right            "
              ];
    canExit = true;
    box.visible = true;
    index = 0;
    boxOn = true;
   // textBox();
}

function hitEmemies(obj1, obj2) {
    obj1.kill();
    obj2.kill();
    localPlayer.score+=5;
    //killzom.play();
    xpF.width = xpF.width + 50;
}

function getItem(obj1, obj2) {
    weapon = true;
    obj1.kill();
    HASbow.visible = true;
}

function healPlayer(obj1, obj2) {
    obj1.kill();
    hpF.width = hpF.width + 50;
}

function exit (obj1,obj2) {
    console.log(canExit);
    if(canExit){
        console.log(canExit);
        location.href='game.php';
    }
}
function working (obj1,obj2) {obj1.kill();}
