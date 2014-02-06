function EnemyZom(){
    this.vx = Math.random()*(20)+5;
    this.vy = Math.random()*(20)+5;
    this.x =  game.world.randomX;
    this.y =  game.world.randomY;
    this.dx = 0;
    this.dy = 0;
    this.dist = 0;
    this.xTime = 0;
    this.yTime = 0;
    this.health = 5;
    this.alive = true;
    this.facing = '';
    this.sprite = game.add.sprite(this.x, this.y, 'zombie');
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.body.immovable = false;
	this.sprite.height = (this.sprite.height)*2;
	this.sprite.width = (this.sprite.width)*2;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.inputEnabled = true;
}
EnemyZom.prototype.damage = function(){
    this.health -= 1;
    if (this.health <= 0){
        this.alive = false;
        this.sprite.kill();
        return true;
    }
    return false;
}