(function() {
  define(['./CakePit'], function(CakePit){;

  var PlayScreen, base, counter;

  counter = 0;

  base = me.ObjectSettings;

  base.name = "CakePit";

  PlayScreen = me.ScreenObject.extend({
    onResetEvent: function() {
      return me.levelDirector.loadLevel('area01');
    },
    update: function() {},
    draw: function() {},
    onDestroyEvent: function() {}
  });

  return PlayScreen;

  });


}).call(this);
