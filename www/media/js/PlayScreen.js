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
      cake = new CakePit(10, 10, base);
      me.game.add(cake, 1000);
      me.game.sort();
      window.cake = cake;
      return console.log('tried to move');
    },
    update: function() {},
    draw: function() {},
    onDestroyEvent: function() {}
  });

  return PlayScreen;

  });


}).call(this);
