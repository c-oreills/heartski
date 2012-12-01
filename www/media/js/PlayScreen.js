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
      return window.cake = cake;
    },
    update: function() {},
    draw: function() {},
    onDestroyEvent: function() {}
  });

  return PlayScreen;

  });


}).call(this);
