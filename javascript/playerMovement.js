function movePlayer(){
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