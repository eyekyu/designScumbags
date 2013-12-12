function Player(){
    this.x = 240;
    this.y = 160;
    this.dx = 0;
    this.dy = 0;
    this.dist = 0;
    this.time = 0;
    this.speed = 100;
    this.moveBoolX = false;
    this.moveBoolY = false;
    this.newX = 0;
    this.newY = 0;
    this.fps = 10;
    this.xy = 0;
    this.facing = '';
    this.score = 0;
    this.players = game.add.sprite(200, 200, 'playerSpriteSheet');
    this.players.body.collideWorldBounds = true;
    this.players.anchor.setTo(0.5, 0.5);
    this.players.body.immovable = true;
}