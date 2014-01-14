function Obs(x, y, img){
    this.obj = game.add.sprite(x, y, img);
    this.obj.anchor.setTo(0.5, 0.5);
    this.obj.body.immovable = true;
}