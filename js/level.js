/*what else to add:
	Power up: Shield or huge laser.
	Boss: Larger enemy with health and faster firing rate.

*/
  var levelData = { 
  
     1:  [[0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,2,2,2,2,2,2,2,0,0],
          [0,0,2,2,2,2,2,2,2,0,0],
          [0,0,1,1,1,1,1,1,1,0,0],
          [0,0,1,1,1,1,1,1,1,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0]],
    
	 2:  [[0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,3,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,2,2,2,2,2,0,0,0],
          [0,0,1,1,1,1,1,1,1,0,0],
          [0,2,2,2,2,2,2,2,2,2,0],
          [0,0,1,1,1,1,1,1,1,0,0],
          [0,0,0,2,2,2,2,2,0,0,0],
          [0,0,0,0,1,1,1,0,0,0,0],
          [0,0,0,0,0,2,0,0,0,0,0]],
	
     3:  [[0,0,0,2,2,2,2,2,0,0,0],
          [0,0,2,1,1,1,1,1,2,0,0],
          [0,2,1,0,1,1,1,0,1,2,0],
          [0,2,1,0,0,1,0,0,1,2,0],
          [0,2,1,1,1,1,1,1,1,2,0],
          [0,0,2,2,2,2,2,2,2,0,0],
          [0,3,2,0,0,0,3,0,2,0,0],
          [0,2,2,0,0,0,0,0,2,2,0],
          [0,0,2,2,0,0,0,2,2,0,0],
          [0,0,0,0,3,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0]],
  };

  //loads each sprite from the spritesheet
  var spriteData = {
    'alien1': { sx: 0,  sy: 0,  w: 24, h: 18, cls: Alien, frames: 3 },
    'alien2': { sx: 0,  sy: 18, w: 24, h: 18, cls: Alien, frames: 3 },
	'alien3': { sx: 0,  sy: 54, w: 42, h: 32, cls: Alien2, frames: 2},
    'player': { sx: 0,  sy: 36, w: 26, h: 17, cls: Player, frames: 2},
    'missile': { sx: 4,  sy: 86, w: 3,  h: 14, cls: Missile },
    'missile2': { sx: 12,  sy: 86, w: 18,  h: 14, cls: Missile2 },
    'missile3': { sx: 0,  sy: 86, w: 3,  h: 14, cls: Missile3 }
  }
  

  function startGame() {
    var screen = new GameScreen("Alien Invaders","Press Z!",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
    Game.loop();
  }

  function endGame() {
    var screen = new GameScreen("Game Over","(press Fire to restart)",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
  }


  function winGame() {
    var screen = new GameScreen("You Win!","(press Fire to restart)",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
  }

  $(function() {
    GameAudio.load({ 'fire' : 'media/laser.ogg', 'die' : 'media/SmallExplosion8Bit.ogg', 'wow' : 'media/explosion8bit.ogg'}, 
                   function() { 
                       Game.initialize("#gameboard", levelData, spriteData,
                                      { "start": startGame,
                                        "die"  : endGame,
                                        "win"  : winGame });
                   });
   });
