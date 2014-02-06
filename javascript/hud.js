function hud(){
    updateText();
    land.tilePosition.x = -game.camera.x+10;
    land.tilePosition.y = -game.camera.y+10;
    text.x = game.camera.x+35;
    text.y = game.camera.y+200;
	levelUp.x = game.camera.x+100;
	levelUp.y = game.camera.y+115;
    pause.x = game.camera.x+450;
    pause.y = game.camera.y+30;
    hpF.x = game.camera.x+165;
    hpF.y = game.camera.y+40;
    hpB.x = game.camera.x+15;
    hpB.y = game.camera.y+7;
    xpF.x = game.camera.x+130;
    xpF.y = game.camera.y+130;
    xpB.x = game.camera.x+32;
    xpB.y = game.camera.y+100;
}

function updateText(){
    text.setText("Score: " + localPlayer.score);levelUp.setText("Lvl: " + level);
}