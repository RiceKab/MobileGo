/**
 * The MoGo module encapsulates all the game related functionality. Building upon
 * game logic provided by WGo.js .
 *
 * TODO: If time left should refactor all the {x y} objects into a position class. WGo has one I think.
 */
var MoGo = (function(){
  // CONSTANTS
  var passMoveString = "PP";
  var unknown = -31; // -31 is arbitrary, just has to differ from empty/WGo.B/WGo.W
  var neutral = 0;
  var blackTerritory = 15;
  var whiteTerritory = -7;

  // HELPER FUNCTIONS
  var compareNodes = function(first, second){
    return (first.x == second.x && first.y == second.y);
  }

  var territoryFloodFill = function(board, x, y, result){
    var traverseStack = [];
    traverseStack.push({x: x, y: y});
    var next;
    while(traverseStack.length > 0){
      next = traverseStack.pop();
      x = next.x;
      y = next.y;
      if(x < 0 || y < 0 || x >= board.length || y >= board.length){
        continue; // Out of bounds
      }
      if(!board[x][y]){    // undefined and 0 count as false which means it's empty
        var left = {x: x-1, y: y, done: false}  // This is what I get for not thinking this through from the start
        var right = {x: x+1, y: y, done: false}  // This'll just have to do as time is not on my side anymore.
        var up = {x: x, y: y+1, done: false}
        var down = {x: x, y: y-1, done: false}
        result.nodes.forEach(function(node, idx, array){  // Check if node has already been traversed
          if(compareNodes(node, left)){ left.done = true; return; }
          if(compareNodes(node, right)){ right.done = true; return; }
          if(compareNodes(node, up)){ up.done = true; return; }
          if(compareNodes(node, down)){ down.done = true; return; }
        });
        traverseStack.forEach(function(node, idx, array){  // Check if node has already been queued
          if(compareNodes(node, left)){ left.done = true; return; }
          if(compareNodes(node, right)){ right.done = true; return; }
          if(compareNodes(node, up)){ up.done = true; return; }
          if(compareNodes(node, down)){ down.done = true; return; }
        });
        result.nodes.push( {x: x, y: y} );
        if(!left.done){traverseStack.push(left)}
        if(!right.done){traverseStack.push(right)}
        if(!up.done){traverseStack.push(up)}
        if(!down.done){traverseStack.push(down)}
        continue;
      }
      if(board[x][y] == WGo.W){
        result.whiteInfluence = true;
      }
      if(board[x][y] == WGo.B){
        result.blackInfluence = true;
      }
    }
  }

  var markerGetNext = function(marked){
    for(a = 0; a < marked.length; a++){
      for(b = 0; b < marked.length; b++){
        if(marked[a][b] == unknown){
          return {x: a, y: b};
        }
      }
    }
    return false;
  }

  // Creates a copy of the board and marks all nodes' states
  var getBoardMarkup = function(board){
    var marked = JSON.parse(JSON.stringify(board)); // Deep Copy
    for(i = 0; i < board.length; i++){
      for(j = 0; j < board.length; j++){
        if(marked[i][j] != WGo.B && marked[i][j] != WGo.W){
          marked[i][j] = unknown; // Empty spaces are unknown
        }
      }
    }
    var result, node, influence;
    var nextCoordinates = markerGetNext(marked);

    while(nextCoordinates){
      result = {
        nodes: [],
        whiteInfluence: false,
        blackInfluence: false
      };
      territoryFloodFill(board, nextCoordinates.x, nextCoordinates.y, result);
      // Process result
      if(result.whiteInfluence && !result.blackInfluence){
        influence = whiteTerritory;
      } else if(!result.whiteInfluence && result.blackInfluence){
        influence = blackTerritory;
      } else{
        influence = neutral;
      }
      for(nodeIdx = 0; nodeIdx < result.nodes.length; nodeIdx++){
        node = result.nodes[nodeIdx];
        marked[node.x][node.y] = influence;
      }
      nextCoordinates = markerGetNext(marked);
    }
    return marked;
  }

  var getAreaScores = function(markedBoard){
    // Empty nodes + stones
    var white = 0;
    var black = 0;
    for(i = 0; i < markedBoard.length; i++){
      for(j = 0; j < markedBoard.length; j++){
        if(markedBoard[i][j] == WGo.B || markedBoard[i][j] == blackTerritory){
          black++;
        } else if(markedBoard[i][j] == WGo.W || markedBoard[i][j] == whiteTerritory){
          white++;
        }
      }
    }
    return {
      black: black,
      white: white
    }
  }

  var getTerritoryScores = function(markedBoard){
    // Empty nodes only
    var white = 0;
    var black = 0;
    for(i = 0; i < markedBoard.length; i++){
      for(j = 0; j < markedBoard.length; j++){
        if(markedBoard[i][j] == blackTerritory){
          black++;
        } else if(markedBoard[i][j] == whiteTerritory){
          white++;
        }
      }
    }
    return {
      black: black,
      white: white
    }
  }

  // Not an actual scoring system. Used for testing without board marking function.
  var getStoneScores = function(markedBoard){
    // Placed stones only
    var white = 0;
    var black = 0;
    for(i = 0; i < markedBoard.length; i++){
      for(j = 0; j < markedBoard.length; j++){
        if(markedBoard[i][j] == WGo.B){
          black++;
        } else if(markedBoard[i][j] == WGo.W){
          white++;
        }
      }
    }
    return {
      black: black,
      white: white
    }
  }


  var getScoringFunction = function(scoring){  // Returns a function that scores a board state.
    switch(scoring){
      case "area":
        return getAreaScores;
      case "territory":
        return getTerritoryScores;
      case "stone":
        return getStoneScores;
    }
  };

  var characterArray = "ABCDERFGHIJKLMNOPQRSTUVWXYZ"; // Used to convert coordinate to character

  var moveStringToCoordinates = function(moveString){
    return {
      x: moveString[0].codePointAt() - "A".codePointAt(),
      y: parseInt(moveString.substring(1))
    };
  }

  var coordinatesToMoveString = function(x, y){
    var move = "";
    move += characterArray[x];
    move += (y + 1);
    return move;
  }

  // GoGame extends a WGo.Game object through composition
  function GoGame(config, loadMoves){  // Constructor function for game logic
    // CONFIG
    this.whitePlayer = config.playerWhite;
    this.blackPlayer = config.playerBlack;
    this.boardsize = config.settings.boardsize;
    this.compensation = config.settings.compensationPoints;
    this.captureValue = config.settings.captureValue;
    // this.scoring = config.settings.scoring;
    this.scoringFn = getScoringFunction(config.settings.scoring);
    // GAME STATE
    this.wgogame = new WGo.Game(this.boardsize, config.settings.repeatPosition);
    // BOARD
    this.moveHistory = [];
    this.boardArray = [];
    for(idx = 0; idx < this.boardsize; idx++){
      this.boardArray[idx] = [];
    }
    var coords;
    if(loadMoves){
      for(moveIdx = 0; moveIdx < config.moves.length; moveIdx++){
        if(config.moves[moveIdx] == passMoveString){
          this.pass();
        } else{
          coords = moveStringToCoordinates(config.moves[moveIdx]);
          this.play(coords.x, coords.y);
        }
      }
    }
  }

  /** Returns false if cannot be played. Returns array of captured nodes otherwise */
  GoGame.prototype.play = function(x, y){
    if(this.wgogame.isValid(x, y)){
      this.boardArray[x][y] = this.wgogame.turn;
      this.moveHistory.push(coordinatesToMoveString(x, y));
      var capturedStones = this.wgogame.play(x, y);
      var node;
      for(i = 0; i < capturedStones.length; i++){
        node = capturedStones[i];
        this.boardArray[node.x][node.y] = neutral;
      }
      return capturedStones;
    }
    return false;
  };

  GoGame.prototype.pass = function(){
    this.moveHistory.push(passMoveString);
    this.wgogame.pass();
  }

  GoGame.prototype.isValid = function(x, y){
    return this.wgogame.isValid(x, y);
  }

  // Returns an object with black and white scores
  GoGame.prototype.getScores = function(){
    var markedBoard = getBoardMarkup(this.boardArray);
    var scores = this.scoringFn(markedBoard);

    return {
      black: (this.wgogame.getCaptureCount(WGo.B) * this.captureValue + scores.black),
      white: (this.wgogame.getCaptureCount(WGo.W) * this.captureValue + scores.white + this.compensation)
    }
  }

  GoGame.prototype.getCurrentColour = function(){
    return this.wgogame.turn;
  }

  GoGame.prototype.undoMove = function(){
    this.wgogame.popPosition();
  }

  ///// GAME CONTROLLERS /////
  function BaseController(cfg, wgoboard, loadMoves){
    this.cfg = cfg;
    this.mogoGame = new GoGame(cfg, loadMoves);
    this.wgoboard = wgoboard;
    this.consecutivePasses = 0;
  }

  BaseController.prototype.getScoreString = function(){
    var scores = this.mogoGame.getScores();
    var s = "";
    s += this.cfg.playerBlack.name;
    s += " ( " + scores.black + " ) - ( " + scores.white + " ) ";
    s += this.cfg.playerWhite.name;
    return s;
  }

  BaseController.prototype.undoMove = function(){
    return this.mogoGame.undoMove();
  }

  // LOCAL
  function LocalController(cfg, wgoboard){
    BaseController.call(this, cfg, wgoboard, true);
  }

  LocalController.prototype = Object.create(BaseController.prototype);
  LocalController.prototype.constructor = LocalController;

  // Return true if a move is valid & executed, false otherwise.
  LocalController.prototype.clicked = function(x, y){
    if(this.mogoGame.isValid(x,y)){
      this.wgoboard.addObject({
        x: x,
        y: y,
        c: this.mogoGame.getCurrentColour()
      });
      var captures = this.mogoGame.play(x, y);
      var node;
      for(i = 0; i < captures.length; i++){
        node = captures[i];
        this.wgoboard.removeObjectsAt(node.x, node.y);
      }
      this.consecutivePasses = 0;
      return true;
    }
    return false;
  }

  // Return true if the game has reached an end state
  LocalController.prototype.pass = function(){
    this.consecutivePasses++;
    this.mogoGame.pass();
    if(this.consecutivePasses >= 2){  // Game is over
      return true;
    }
    return false;
  }

  // ONLINE (SOCKET)
  function OnlineController(cfg, wgoboard){
    BaseController.call(this, cfg, wgoboard, true);
  }

  OnlineController.prototype = Object.create(BaseController.prototype);
  OnlineController.prototype.constructor = OnlineController;

  OnlineController.prototype.clicked = function(x, y){
    // TODO: Online - Check validity and emit action by socket
  }

  OnlineController.prototype.pass = function(){
    // TODO - Online Controller Pass
  }

  // REPLAY (NO PLAYABILITY)
  function ReplayController(cfg, wgoboard){
    BaseController.call(this, cfg, wgoboard, false);
    this.moveSequence = cfg.moves;
    this.moveIndex = 0;
  }

  ReplayController.prototype = Object.create(BaseController.prototype);
  ReplayController.prototype.constructor = ReplayController;

  ReplayController.prototype.next = function(){
    if(this.moveIndex < this.moveSequence.length){
      var pos = moveStringToCoordinates(this.moveSequence[this.moveIndex++]);
      this.wgoboard.addObject({
        x: pos.x,
        y: pos.y,
        c: this.mogoGame.getCurrentColour()
      });
      var captures = this.mogoGame.play(pos.x, pos.y);
      var node;
      for(i = 0; i < captures.length; i++){
        node = captures[i];
        this.wgoboard.removeObjectsAt(node.x, node.y);
      }
      return true;
    }
    return false;
  }

  ReplayController.prototype.prev = function(){
    if(this.moveIndex > 0){
      var pos = moveStringToCoordinates(this.moveSequence[--this.moveIndex]);
      this.mogoGame.undoMove();
      this.wgoboard.removeObjectsAt(pos.x, pos.y);
      return true;
      // TODO: This doesn't uncapture things on the visual board (need to sweep?)
    }
    return false;
  }

  // Module exposure
  return {
    GoGame: GoGame,
    LocalController: LocalController,
    OnlineController: OnlineController,
    ReplayController: ReplayController,
    coordinatesToString: coordinatesToMoveString
  };
})();