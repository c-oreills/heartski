(function() {
  define(['./CakePit'], function(CakePit){;

  var PlayScreen, base, counter;

  counter = 0;

  base = me.ObjectSettings;

  base.name = "CakePit";

  PlayScreen = me.ScreenObject.extend({
    onResetEvent: function() {
      var cake;
      me.levelDirector.loadLevel('area01');
      cake = new CakePit(100, 100, base);
      return me.game.add(cake, 1000);
    },
    update: function() {},
    draw: function() {},
    onDestroyEvent: function() {}
  });

  return PlayScreen;

  });


}).call(this);
