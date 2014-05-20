
  var levelData = { 
     1:  [[0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,2,2,0,0,0,0],
          [0,0,0,0,1,0,0,1,0,0,0],
          [0,0,0,2,0,0,0,0,2,0,0],
          [0,0,1,0,0,0,0,0,0,1,0],
          [0,2,0,0,0,1,1,0,0,0,2],
          [0,0,1,0,0,2,2,0,0,1,0],
          [0,0,0,2,0,0,0,0,2,0,0],
          [0,0,0,0,1,0,0,1,0,0,0],
          [0,0,0,0,0,2,2,0,0,0,0],
          [0,0,0,0,0,1,1,0,0,0,0]],
     2:  [[0,1,1,1,0,2,0,0,0,2,0],
          [0,1,0,0,1,2,0,2,0,2,0],
          [0,1,0,0,1,2,0,2,0,2,0],
          [0,1,0,0,1,2,0,2,0,2,0],
          [0,1,1,1,0,0,2,0,2,0,0],
          [0,0,2,2,2,2,2,2,2,0,0],
          [0,0,2,2,2,2,2,2,2,0,0],
          [0,0,1,1,1,1,1,1,1,0,0],
          [0,0,1,1,1,1,1,1,1,0,0],
          [0,0,1,1,1,1,1,1,1,0,0],
          [0,0,1,1,1,1,1,1,1,0,0]],
     3:  [[0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,1,0,0,0,0,0],
          [0,0,0,0,0,2,0,0,0,0,0],
          [0,0,0,0,0,1,0,0,0,0,0],
          [0,0,0,0,0,2,0,0,0,0,0],
          [0,0,2,1,2,1,2,1,2,0,0],
          [0,0,0,0,2,2,2,0,0,0,0],
          [0,0,0,0,0,1,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0]]
  };

  var spriteData = {
    'alien1': { sx: 0,  sy: 0,  w: 24, h: 18, cls: Alien, frames: 3 },
    'alien2': { sx: 0,  sy: 18, w: 24, h: 18, cls: Alien, frames: 3 },
    'player': { sx: 0,  sy: 36, w: 26, h: 17, cls: Player },
    'missile': { sx: 0,  sy: 86, w: 3,  h: 14, cls: Missile },
    'missile2': { sx: 8,  sy: 86, w: 10,  h: 14, cls: Missile2 }
  }

  function startGame() {
    var screen = new GameScreen("Alien Invaders","Press Fire to play!",
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
    GameAudio.load({ 'fire' : 'media/laser.ogg', 'die' : 'media/SmallExplosion8Bit.ogg' }, 
                   function() { 
                       Game.initialize("#gameboard", levelData, spriteData,
                                      { "start": startGame,
                                        "die"  : endGame,
                                        "win"  : winGame });
                   });
   });
