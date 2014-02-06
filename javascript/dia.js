var game = new Phaser.Game(1358, 700, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var content = [
    "There is a zombie outbreak!\nWe need to escape now! ",
    "Everyone in the school is dead!\nI can hear them coming! ",
    "We need to alert the mayor!\nMaybe he can help us!      ",
	"     "
];

var t = 0;
var index = 0;
var line = '';
var next = false;
var shown = false;
var finish = false;
var s, box;
    
function preload(){
    game.load.image('box','../images/box.png');
}

function create() {
	box = game.add.sprite(20, 250, 'box');
    box.width = 851;
    box.height = 227; 
	box.inputEnabled = true;
    var style = { font: "30pt Courier", fill: "#19cb65", stroke: "#119f4e", strokeThickness: 2 };
    s = game.add.text(80, 300, '', style);
    t = game.time.now + 40;
}

function update() {
    box.events.onInputDown.add(nextLine, this);
        if (game.time.now > t && index < content.length){
            //  get the next character in the line
            if (line.length < content[index].length){
                line = content[index].substr(0, line.length + 1);
                s.setText(line);
                t = game.time.now + 40;
            }
            else{
                t = game.time.now + 1000;
                if (index < content.length){
                    next=false;
                    index++;
                    line = '';
                }
            }
        }else if(index==3){
            s.setText(" ");
            next=false;
            box.visible=false;
            finish=true;
            shown = false;
        }
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