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
      console.log('move player ', playerId, 'to ', coords);
      playerObj = this.getPlayerOrRegister(playerId, coords);
      playerObj.set(coords, playerObj.width, playerObj.height);
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
      console.log('insert player to ', coords);
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
