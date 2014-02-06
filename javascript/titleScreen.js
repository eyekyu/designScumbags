var game = new Phaser.Game(400, 400, Phaser.CANVAS, '', { preload: preload, create: create});
var music;
var title;

function preload() {

    

    //  Firefox doesn't support mp3 files, so use ogg
   game.load.audio('bgm', ['sounds/titleScreen.mp3']);
  game.load.spritesheet('title', 'images/ZOMBIETITLE.png',300,150);
    //game.load.image('titleZom', 'images/titleZom.png');
    music = game.add.audio('bgm');
    music.play();
	



}




function create() {

    title = game.add.sprite(10, 50, 'title');
	title.height = 280;
	title.width = 400;
	title.animations.add('title',  [0,0,0,0,0,0,0,0,1,3,4,5,6,7,8,9,0],    20, true);

	title.animations.play('title', 10, true);

   

}

