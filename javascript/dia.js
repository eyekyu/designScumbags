var game = new Phaser.Game(1358, 700, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var content = [
    "There is a zombie outbreak!\nWe need to escape now!",
    "Everyone in the school is dead!\nI can hear them coming!",
    "We need to alert the mayor!\nMaybe he can help us!",
	" ",
];

var t = 0;
var index = 0;
var line = '';
var next = false;
var shown = false;
var finish = false;
var welcome, tweenTest, type, bgm, night, s, hint,box, cursor, girl;
    
function preload(){
    this.game.stage.scaleMode = Phaser.StageScaleMode.EXACT_FIT;
    this.game.stage.scaleMode.forceLandscape = true;
    game.load.spritesheet('nextCursor', '../images/nextCursor.png',37,50);
	game.load.spritesheet('welcome',    '../images/welcome.png',130,80);
    
    game.load.image('box',          '../images/box.png');
  //game.load.image('singleCursor', 'images/cursor.png');
	game.load.image('girl',         '../images/girl.png');
	game.load.image('night',        '../images/night.jpg');
    
	game.load.audio('type', ['../sounds/type.mp3']);
	game.load.audio('bgm',  ['../sounds/Scene1.mp3']);
}

function create() {
	type = game.add.audio('type');
	bgm = game.add.audio('bgm');
    night = game.add.sprite(0, 0, 'night');
	night.height = 750;
	night.width=1358;
	girl = game.add.sprite(0, 50, 'girl');
	girl.inputEnabled = true;
	girl.alpha = 0;
	box = game.add.sprite(20, 250, 'box');
	box.alpha = 0;
	cursor = game.add.sprite(600, 400, 'nextCursor');
	cursor.visible = false;
	box.inputEnabled = true;
	box.visible = false;
	cursor.animations.add('next',  [0,1,2,1],    10, true);
    var style = { font: "20pt Courier", fill: "#000000", stroke: "#ffffff", strokeThickness: 2 };
    s = game.add.text(140, 320, '', style);
	s.alpha = 0;
    t = game.time.now + 40;
	hint = game.add.text(300, 20, '', style);
	hint.inputEnabled = true;
	hint.visible =false;
	welcome = game.add.button(600, 360, 'welcome', enterGirl, this, 1, 0, 0);
	cursor.animations.play('next', 10, true);
}

function update() {
    hint.setText("Tap Girl to talk!")
    welcome.events.onInputDown.add(enterGirl, this);
    if(!finish){girl.events.onInputDown.add(showBox, this);}
    if(shown){box.events.onInputDown.add(nextLine, this);}
    if (next) {cursor.visible=true;
        if (game.time.now > t && index < content.length){
            //  get the next character in the line
            if (line.length < content[index].length){
                line = content[index].substr(0, line.length + 1);
                s.setText(line);
                t = game.time.now + 40;
                type.play();
            }
            else{
                t = game.time.now + 1000;
                if (index < content.length){
                    next=false;
                    index++;
                    line = '';
                }
            }
        }
        else if(index==3){
            s.setText(" ");
            next=false;
            box.visible=false;
            cursor.visible=false;
            finish=true;
            shown = false;
            girl.events.onInputDown.remove(showBox, this);
            game.add.tween(girl).to({x: 0}, 2000, Phaser.Easing.Linear.None,true,0,0,false);
            tweenTest = game.add.tween(girl).to({alpha: 0}, 2000, Phaser.Easing.Linear.None,true,0,0,false);
            tweenTest.onComplete.add(doSomething, this);
        }
    }
}
	 
function enterGirl() {
    bgm.play();
    welcome.visible = false;
	hint.visible = true;
	game.add.tween(girl).to({x: 600}, 1500, Phaser.Easing.Linear.None,true,0,0,false);
	game.add.tween(girl).to({alpha: 1}, 2000, Phaser.Easing.Linear.None,true,0,0,false);
}
	 
function nextLine(){next=true;}	 
function showBox() {
    hint.visible = false;
    box.visible = true;
	shown=true;
	next= true;
    game.add.tween(box).to( { alpha: 1 }, 1500, Phaser.Easing.Linear.None, true, 0, 0, false);
	game.add.tween(s).to( { alpha: 1 }, 1500, Phaser.Easing.Linear.None, true, 0, 0, false);
}
function doSomething() {location.href='game.php';}