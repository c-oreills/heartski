(function() {
  define(['./CakePit'], function(CakePit){;

  var base, cls;

  base = me.ObjectSettings;

  base.name = "CakePit";

  cls = new Class({
    Implements: [Options, Events],
    players: {},
    initialize: function(options) {
      return this.setOptions(options);
    },
    setPlayerId: function(id) {
      console.log('my id is ', id);
      return this.myPlayerId = id;
    },
    playersMoved: function(locations) {
      var _this = this;
      return Object.each(locations, function(coords, playerId) {
        if (Number(playerId) !== Number(_this.myPlayerId)) {
          return _this.movePlayer(playerId, coords);
        }
      });
    },
    movePlayer: function(playerId, coords) {
      var playerObj;
      playerObj = this.getPlayerOrRegister(playerId, coords);
      if (playerObj.pos.x !== coords[0] || playerObj.pos.y !== coords[1]) {
        console.log('move player');
        if (coords[0] > playerObj.pos.x) {
          playerObj.flipX(true);
        } else {
          playerObj.flipX(false);
        }
        playerObj.pos.set(coords[0], coords[1]);
      }
      return me.game.sort();
    },
    getPlayerOrRegister: function(playerId, coords) {
      var player;
      player = this.players[playerId];
      if (!(player != null)) {
        player = this.insertPlayer(playerId, coords);
      }
      return player;
    },
    insertPlayer: function(playerId, coords) {
      var player;
      player = this.createPlayer(coords);
      return this.players[playerId] = player;
    },
    createPlayer: function(coords) {
      var cake;
      cake = new CakePit(coords[0], coords[1], base);
      me.game.add(cake, 1005);
      me.game.sort();
      return cake;
    }
  });

  return cls;

  });


}).call(this);
