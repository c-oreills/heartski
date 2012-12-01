(function() {
  define(function(){;

  var PlayScreen;

  PlayScreen = me.ScreenObject.extend({
    onResetEvent: function() {
      return me.levelDirector.loadLevel('area01');
    },
    onDestroyEvent: function() {}
  });

  return PlayScreen;

  });


}).call(this);
