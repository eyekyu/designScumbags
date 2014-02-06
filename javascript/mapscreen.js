var game = new Phaser.Game(1358, 700, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var map;
var LOne;
var LTwo;
var LThree;
var notify1;
var notify2;
var notify3;
var pressed = false;
var goBtn;

function preload() {
this.game.stage.scaleMode = Phaser.StageScaleMode.EXACT_FIT;
 this.game.stage.scaleMode.forceLandscape = true;
	game.load.spritesheet('locate', 'images/locate.png',50,70);
	game.load.image('map', 'images/mapScreen.jpg');
	//game.load.image('locate', 'images/locate.png');
	game.load.image('notify1', 'images/notify1.png');
	game.load.image('notify2', 'images/notify2.png');
	game.load.image('notify3', 'images/notify3.png');
	game.load.image('go', 'images/GO.png');

   
}

function create() {
	
	
	
	
	
	
  
	map = game.add.sprite(0, 0, 'map');
	map.height=700;
	map.width= 1358;
	
	LOne = game.add.sprite(400, 400, 'locate');
	LOne.inputEnabled = true;
	
	LOne.animations.add('One',  [0,1,2,3,4,5,6,7,0],    10, true);
	
	LTwo = game.add.sprite(500, 320, 'locate');
	LTwo.inputEnabled = true;
	
	LTwo.animations.add('Two',  [0,1,2,3,4,5,6,7,0],    10, true);
	
	LThree = game.add.sprite(200, 500, 'locate');
	LThree.inputEnabled = true;
	
	LThree.animations.add('Three',  [0,1,2,3,4,5,6,7,0],    10, true);
	
	notify1 = game.add.sprite(1100, 200, 'notify1');
	notify1.height = 400;
	notify1.visible = false;
	
	notify2 = game.add.sprite(1100, 200, 'notify3');
	notify2.height = 400;
	notify2.visible = false;
	
	notify3 = game.add.sprite(1100, 200, 'notify2');
	notify3.height = 400;
	notify3.visible = false;
	
	goBtn = game.add.sprite(1150, 550, 'go');
	goBtn.inputEnabled = true;
	goBtn.visible = false;
	
	
	LOne.animations.play('One', 10, true);
	LTwo.animations.play('Two', 10, true);
	LThree.animations.play('Three', 10, true);

}

function update() {

goBtn.events.onInputDown.add(newLocation, this);
LOne.events.onInputDown.add(locationOne, this);
LTwo.events.onInputDown.add(locationTwo, this);
LThree.events.onInputDown.add(locationThree, this);


	
	 }
	 
	 function locationOne() {

	 if(!pressed){

notify1.visible = true;
notify1.inputEnabled = true;
LOne.alpha = 0.4;
goBtn.visible = true;
goBtn.inputEnabled = true;
//location.href='game.php';
pressed = true;
}else{
LOne.alpha = 1;
LTwo.alpha = 1;
LThree.alpha = 1;
notify2.visible = false;
notify3.visible = false;
notify1.visible = false;
notify1.inputEnabled = false;
goBtn.visible = false;
pressed = false;
goBtn.inputEnabled = false;
}

	
	 }
	 
	 	 function locationTwo() {


if(!pressed){
LTwo.alpha = 0.4;
notify2.visible = true;
notify2.inputEnabled = true;
goBtn.inputEnabled = true;
goBtn.visible = true;
//location.href='game.php';
pressed = true;
}else{

LOne.alpha = 1;
LTwo.alpha = 1;
LThree.alpha = 1;
notify1.visible = false;
notify3.visible = false;
notify2.visible = false;
notify2.inputEnabled = false;
goBtn.visible = false;
pressed = false;
goBtn.inputEnabled = false;
}

	
	 }
	 
	 	 function locationThree() {


if(!pressed){
LThree.alpha = 0.4;
notify3.visible = true;
notify3.inputEnabled = true;
goBtn.inputEnabled = true;
goBtn.visible = true;
//location.href='game.php';
pressed = true;
}else{
LOne.alpha = 1;
LTwo.alpha = 1;
LThree.alpha = 1;
notify1.visible = false;
notify2.visible = false;
notify3.visible = false;
notify3.inputEnabled = false;
goBtn.visible = false;
pressed = false;
goBtn.inputEnabled = false;
}

	
	 }
	 
	 	 	 function newLocation() {

location.href='game.php';


	
	 }
	 
	
	 
	  
	  


