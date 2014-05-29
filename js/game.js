//changes: firing rate, sprites

//var num=1;

var ammo = 3;

var playerX;

var life = 3;

var score =1000;

var powerUp = 0;

var score = 0;

var AlienFlock = function AlienFlock() {
  this.invulnrable = true;
  this.dx = 10; this.dy = 0;
  this.hit = 1; this.lastHit = 0;
  this.speed = 10;

  this.draw = function() {};

    //loads next level
  this.die = function() {
    if(Game.board.nextLevel()) {
      Game.loadBoard(new GameBoard(Game.board.nextLevel())); 
        ammo=3;
		life=3;
		shots.value = 90;
		health.value = 90;
    } else {
      Game.callbacks['win']();
    }
  }

  this.step = function(dt) { 
    if(this.hit && this.hit != this.lastHit) {
      this.lastHit = this.hit;
      this.dy = this.speed;
    } else {
      this.dy=0;
    }
    this.dx = this.speed * this.hit;

    var max = {}, cnt = 0;
    this.board.iterate(function() {
      if(this instanceof Alien)  {
        if(!max[this.x] || this.y > max[this.x]) {
          max[this.x] = this.y; 
        }
        cnt++;
      } 
    });

    if(cnt == 0) { this.die(); } 

    this.max_y = max;
    return true;
  };

}



var Alien = function Alien(opts) {
  this.flock = opts['flock'];
  this.frame = 0;
  this.mx = 0;
}

Alien.prototype.draw = function(canvas) {
  Sprites.draw(canvas,this.name,this.x,this.y,this.frame);
}

Alien.prototype.die = function() {
  GameAudio.play('die');
  this.flock.speed += 1;
  this.board.remove(this);
  power.value = power.value+=1;
  powerUp++;
  score++;
}

Alien.prototype.step = function(dt) {
  this.mx += dt * this.flock.dx;
  this.y += this.flock.dy;
  if(Math.abs(this.mx) > 10) {
    if(this.y == this.flock.max_y[this.x]) {
      this.fireSometimes();
    }
//changes the number of frames for sprite animation
    this.x += this.mx;
    this.mx = 0;
    this.frame = (this.frame+1) % 3;
    if(this.x > Game.width - Sprites.map.alien1.w * 2) this.flock.hit = -1;
    if(this.x < Sprites.map.alien1.w) this.flock.hit = 1;
  }
  return true;
}

//alien fire rate
Alien.prototype.fireSometimes = function() {
      if(Math.random()*100 < 20) {
        this.board.addSprite('missile3',this.x + this.w/2 - Sprites.map.missile3.w/2,
                                      this.y + this.h,
                                     { dy: 100 });
      }
}

var Player = function Player(opts) { 
  this.reloading = 0;
}

Player.prototype.draw = function(canvas) {
   Sprites.draw(canvas,'player',this.x,this.y);
}


Player.prototype.die = function() {
  GameAudio.play('die');
  life--;
  console.log(life);
health.value = health.value-=30;
power.value = power.value-=10;
this.board.score--;
	if(life==0){
  Game.callbacks['die']();
    ammo=3;
	life=3;
	shots.value = 90;
	health.value = 90;
	power.value = 0;
	}
}

//movement
Player.prototype.step = function(dt) {
  if(Game.keys['left']) { this.x -= 100 * dt; }
  if(Game.keys['right']) { this.x += 100 * dt; }
  if(Game.keys['up']) { this.y -= 100 * dt; }
  if(Game.keys['down']) { this.y += 100 * dt; }
    playerX=this.x;
  if(this.x < 0) this.x = 0;
  if(this.x > Game.width-this.w) this.x = Game.width-this.w;
  if(this.y > 475) this.y = 475;
  if(this.y < 300) this.y = 300;

  this.reloading--;
//player firing rate
  if(Game.keys['fire'] && this.reloading <= 0 && this.board.missiles < 5) {
    GameAudio.play('fire');
    this.board.addSprite('missile',
                          this.x + this.w/2 - Sprites.map.missile.w/2,
                          this.y-this.h,
                          { dy: -100, player: true });
    this.board.missiles++;
    this.reloading = 15;
  }
    if(Game.keys['fire2'] && this.reloading <= 0 && this.board.missiles < 2 && ammo>0) {
    GameAudio.play('fire');
    this.board.addSprite('missile2',
                          this.x + this.w/2 - Sprites.map.missile2.w/2,
                          this.y-this.h,
                          { dy: -100, player: true });
    this.board.missiles++;
    ammo--;
	shots.value = shots.value-=30;
    this.reloading = 30;
    console.log(ammo);
  }
  return true;
}


var Missile = function Missile(opts) {
   this.dy = opts.dy;
   this.player = opts.player;
}

Missile.prototype.draw = function(canvas) {
   Sprites.draw(canvas,'missile',this.x,this.y);
}

Missile.prototype.step = function(dt) {
   this.y += this.dy * dt;
    //homing missiles?
   
   var enemy = this.board.collide(this);
   if(enemy) { 
     enemy.die();
     return false;
   }
   return (this.y < 0 || this.y > Game.height) ? false : true;
}

Missile.prototype.die = function() {
  if(this.player) this.board.missiles--;
  if(this.board.missiles < 0) this.board.missiles=0;
   this.board.remove(this);
}

var Missile2 = function Missile2(opts) {
   this.dy = opts.dy;
   this.player = opts.player;
}

Missile2.prototype.draw = function(canvas) {
   Sprites.draw(canvas,'missile2',this.x,this.y);
}

Missile2.prototype.step = function(dt) {
   this.y += this.dy * dt;
     
   var enemy = this.board.collide(this);
   if(enemy) { 
     enemy.die();
     /* num++;
   }
     if(num>=3){
      num=1;*/
     //return false;
   }
   return (this.y < 0 || this.y > Game.height) ? false : true;
}

Missile2.prototype.die = function() {
  if(this.player) this.board.missiles--;
  if(this.board.missiles < 0) this.board.missiles=0;
   //this.board.remove(this);
}

var Missile3 = function Missile3(opts) {
   this.dy = opts.dy;
   this.player = opts.player;
}

Missile3.prototype.draw = function(canvas) {
   Sprites.draw(canvas,'missile3',this.x,this.y);
}

Missile3.prototype.step = function(dt) {
   this.y += this.dy * dt;
    //homing missiles
      if(this.x>playerX){
    this.x -=1;
    }
     if(this.x<playerX){
    this.x += 1;
    }
    
   var enemy = this.board.collide(this);
   if(enemy) { 
     enemy.die();
     return false;
   }
   return (this.y < 0 || this.y > Game.height) ? false : true;
}

Missile3.prototype.die = function() {
  if(this.player) this.board.missiles--;
  if(this.board.missiles < 0) this.board.missiles=0;
   this.board.remove(this);
}

