function collisionHandler(obj1, obj2){
    if(hpF.width < 0){
        obj2.kill();
        hpF.width = 0;
    }
    else{hpF.width -= dmg;}
}
function obstacle(obj1,player){
    localPlayer.players.body.velocity.x = 0;
    localPlayer.dx = 0;
    localPlayer.dy = 0;
    player.body.velocity.y = 0;
    if(player.facing == 'left') {localPlayer.facing = 'leftStop';}
    if(player.facing == 'right'){localPlayer.facing = 'rightStop';}
    if(player.facing == 'down') {localPlayer.facing = 'downStop';}
    if(player.facing == 'up')   {localPlayer.facing = 'upStop';}
    console.log('hello');
}
function collisionHandler2(obj1, obj2) {
    obj1.kill();
        obj2.kill();
        localPlayer.score +=5;
        killzom.play();
        xpF.width + exp;
}

function collisionHandler3(obj1, obj2) {
    weapon = true;
    obj1.kill();
    HAScs.visible = true;
}

function collisionHandler4(obj1, obj2) {
    obj1.kill();
    localPlayer.score += 100;
}
