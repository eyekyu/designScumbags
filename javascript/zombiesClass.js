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
    this.zombie = game.add.sprite(this.x, this.y, 'zombie');
    this.zombie.anchor.setTo(0.5, 0.5);
    this.zombie.body.immovable = true;
    this.zombie.body.collideWorldBounds = true;
    this.zombie.body.immovable = false;
}
EnemyZom.prototype.damage = function(){
    this.health -= 1;
    if (this.health <= 0){
        this.alive = false;
        this.zombie.kill();
        return true;
    }
    return false;
}