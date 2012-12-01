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
      console.log('interpret positions', locations);
      return Object.each(locations, function(coords, playerId) {
        if (playerId !== _this.myPlayerId) {
          return _this.movePlayer(playerId, coords);
        }
      });
    },
    movePlayer: function(playerId, coords) {
      var playerObj;
      return playerObj = this.getPlayerOrRegister(playerId);
    },
    getPlayerOrRegister: function(playerId) {
      var player;
      if (!(this.players[playerId] != null)) {
        player = this.createPlayer();
        this.players[playerId] = player;
      }
      return player;
    },
    createPlayer: function() {
      var cake;
      console.log('create player');
      cake = new CakePit(10, 10, base);
      me.game.add(cake, 1000);
      return me.game.sort();
    }
  });

  return cls;

  });


}).call(this);
