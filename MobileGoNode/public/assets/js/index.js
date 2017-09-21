const APPLICATION_KEY = "BHkONVw7xfxzD8W2jBjjKpMmoUJe6EJjO7TMvLsEt29hxH6WWk8hVHKox_x14VJCx7D-TIKIDWmpm-9zBH0kub8";

var urlB64ToUint8Array = function(base64String){
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

// SERVICE WORKER
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(
    "./mobilego-sw.js",
    {
      scope: './'
    }
  ).then(function(register){
    console.log("SW registered");
    if('PushManager' in window){
      register.pushManager.getSubscription().then(function(subscription){
        var isSubbed = subscription !== null;
        if(!isSubbed){  // Request subscription
          register.pushManager.subscribe({
            applicationServerKey: urlB64ToUint8Array(APPLICATION_KEY),
            userVisibleOnly: true
          }).then(function(sub){
            // TODO: TELL SERVER ABOUT SUBSCRIPTION
          }).catch(function(err){
              console.log("Couldn't subscribe", err);
            })
        }
      })
    }
  }).catch(function(err){
    console.log("Failed to register SW", err);
  });
} else{
  console.log("SW are not available in this browser.")
};

/* TODO: Load up the navdrawer just once instead of having server create duplicates via view templating. *
$(document).one('pagebeforecreate', function () {
    var panelDOM = $("[data-role=panel]").length;
    if (panelDOM === 0) {
        // Do things
    } else {
        // Do things
    }
});
*/

$(function () {   // ON PAGE LOAD
  // Event handler attachments
  $('#createlocal').on('click', createLocalHandler);
  $('#loadLocal').on('click', placeHolderHandler);
  $('#createonline').on('click', createOnlineHandler);
  $('#joinonline').on('click', joinOnlineHandler);
  $('#createpbm').on('click', createPBMHandler);
  $('#joinpbm').on('click', joinPBMHandler);
  $('#watchreplay').on('click', watchReplayHandler);
  // $('#spectate').on('click', placeHolderHandler);
  // $('#replayrepo').on('click', placeHolderHandler);

  $('#createGameForm').submit(function(evt){  // Only allow buttons to do things for now
    evt.preventDefault();
    return false;
  });
});

// Event handlers
var createLocalHandler = function(){
  changeCreateFunction(function(){
    var gameCfg = generateGameConfig();
    var wgoBoard = initializeGamePage(gameCfg);
    var gameController = new MoGo.LocalController(gameCfg, wgoBoard);
    $('#scoreHeader').text(gameController.getScoreString());
    wgoBoard.addEventListener("click", function(x, y){
      if(gameController.clicked(x, y)){   // True if board state is changed (valid move)
        $('#scoreHeader').text(gameController.getScoreString());
      }
    });
    $('#passAction').off('click').on('click', function(evt){
      if(gameController.pass()){
        $('#gameEndLink').click();  // TODO: Fix up the dialog for proper end stuff (scores, save replay, etc...)
      }
    });
  });
}

var createOnlineHandler = function(){
  changeCreateFunction(function(){
    alert("Create Online Behaviour");
  });
};

var joinOnlineHandler = function(){

}

var createPBMHandler = function(){
  changeCreateFunction(function(){
    alert("Create PBM Behaviour");
  });
}

var joinPBMHandler = function(){

}

var watchReplayHandler = function(){
  var testCfg = {
    playerBlack: { name: "BlackReplay" },
    playerWhite: { name: "WhiteReplay" },
    settings: {
      boardsize: 19,
      compensationPoints: 7.5,
      captureValue: 0,
      scoring: "area",
      repeatPosition: "ko"
    },
    moves: ["Q3","D2","P16", "C15", "O2", "E15", "P14", "J16", "C8"]
  };
  var wgoBoard = initializeReplayPage(testCfg);

  var replayController = new MoGo.ReplayController(testCfg, wgoBoard);
  $('#replayScoreHeader').text(replayController.getScoreString());
  $('#moveCounter').text(replayController.moveIndex);
  $('#replayUndo').off('click').on('click', function(evt){
    if(replayController.prev()){
      $('#scoreHeader').text(replayController.getScoreString());
      $('#moveCounter').text(replayController.moveIndex);
    }
  });
  $('#replayNext').off('click').on('click', function(evt){
    if(replayController.next()){
      $('#scoreHeader').text(replayController.getScoreString());
      $('#moveCounter').text(replayController.moveIndex);
    }
  });

}

var placeHolderHandler = function(){
  alert("This feature is currently unavailable");
}

// Event handler & various helpers
var changeCreateFunction = function(createBehaviour){
  $('#createGameButton').off('click').on('click', createBehaviour); // Clear old handlers
}

var generateGameConfig = function(){
  var rules = $('input[name=scoring-rules]:checked', '#createGameForm').val();
  var size = parseInt($('input[name=board-size]:checked', '#createGameForm').val());
  var cfg = {
    playerBlack: { name: "BlackAnon" },
    playerWhite: { name: "WhiteAnon" },
    settings: generateSettings(rules),
    moves: []
  };
  cfg.settings.boardsize = size;
  return cfg;
}

var generateSettings = function(rules){
  switch(rules){
    case "chinese":
      return {
        compensationPoints: 7.5,
        captureValue: 0,
        scoring: "area",
        repeatPosition: "ko"
      }
    case "korean":
      return {
        compensationPoints: 5.5,
        captureValue: 1,
        scoring: "territory",
        repeatPosition: "ko"
      }
    case "aga":
      return {
        compensationPoints: 5.5,
        captureValue: 1,
        scoring: "area",
        repeatPosition: "ko"
      }
  }
}

var initializeGamePage = function(gameCfg){
  $('#board').empty();  // Make sure it's empty before adding a new board
  var wgoboard = new WGo.Board($('#board')[0], {   // Board constructor expects DOM element, not jquery object
    size: gameCfg.settings.boardsize,
    width: 540,   // TODO: No variable width option??
    section: {
      top: 0.25,
      left: -0.5,
      right: 0.25,
      bottom: -0.5
    }
  });
  addCoordinateLayer(wgoboard);
  return wgoboard;
}

var initializeReplayPage = function(gameCfg){
  $('#replayboard').empty();  // Make sure it's empty before adding a new board
  var wgoboard = new WGo.Board($('#replayboard')[0], {   // Board constructor expects DOM element, not jquery object
    size: gameCfg.settings.boardsize,
    width: 540,   // TODO: No variable width option??
    section: {
      top: 0.25,
      left: -0.5,
      right: 0.25,
      bottom: -0.5
    }
  });
  addCoordinateLayer(wgoboard);
  return wgoboard;
}

var addCoordinateLayer = function(wgoboard){
  var coordinates = {   // From WGo demo
    // draw on grid layer
    grid: {
      draw: function(args, board) {
        var ch, t, xright, xleft, ytop, ybottom;

        this.fillStyle = "rgba(0,0,0,0.7)";
        this.textBaseline="middle";
        this.textAlign="center";
        this.font = board.stoneRadius+"px "+(board.font || "");

        xright = board.getX(-0.75);
        xleft = board.getX(board.size-0.25);
        ytop = board.getY(-0.75);
        ybottom = board.getY(board.size-0.25);

        for(var i = 0; i < board.size; i++) {
          ch = i+"A".charCodeAt(0);
          t = board.getY(i);
          this.fillText(board.size-i, xright, t);
          this.fillText(board.size-i, xleft, t);

          t = board.getX(i);
          this.fillText(String.fromCharCode(ch), t, ytop);
          this.fillText(String.fromCharCode(ch), t, ybottom);
        }
        this.fillStyle = "black";
      }
    }
  }
  wgoboard.addCustomObject(coordinates);
}

