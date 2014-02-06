function moveEnemy(){
    for(var i = 0; i<numOfZombs; i++){        
        enemies[i].dx = localPlayer.sprite.x-enemies[i].sprite.x;
        enemies[i].dy = localPlayer.sprite.y-enemies[i].sprite.y;
        enemies[i].dist = Math.sqrt(enemies[i].dx*enemies[i].dx+enemies[i].dy*enemies[i].dy);
        enemies[i].xTime = enemies[i].dist/enemies[i].vx;
        enemies[i].yTime = enemies[i].dist/enemies[i].vy;
        enemies[i].sprite.body.velocity.x = (enemies[i].dx/enemies[i].xTime)*2.5;
        enemies[i].sprite.body.velocity.y = (enemies[i].dy/enemies[i].yTime)*2.5;
        var zomXY = Math.abs(enemies[i].dx)-Math.abs(enemies[i].dy);
        
        if(enemies[i].sprite.body.velocity.x == 0 ||
           enemies[i].sprite.body.velocity.y == 0){
            enemies[i].sprite.animations.play(enemies[i].facing);
        }
        else if(enemies[i].dx < 0 && zomXY > 0){
            enemies[i].sprite.animations.play('leftZ');
            enemies[i].facing = 'left';
        }
        else if(enemies[i].dx > 0 && zomXY > 0){
            enemies[i].sprite.animations.play('rightZ')
            enemies[i].facing = 'right';
        }
        else if(enemies[i].dy < 0 && zomXY < 0){
            enemies[i].sprite.animations.play('upZ')
            enemies[i].facing = 'up';
        }
        else if(enemies[i].dy > 0 && zomXY < 0){
            enemies[i].sprite.animations.play('downZ')
            enemies[i].facing = 'down';
        }
    }
}