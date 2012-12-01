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
    draw: function() {
      var cake;
      counter += 1;
      if (counter % 20 === 0) {
        console.log('draw ', counter);
        cake = new CakePit(counter * 10, 100, base);
        me.game.add(cake, 1000);
        return me.game.sort();
      }
    },
    onDestroyEvent: function() {}
  });

  return PlayScreen;

  });


}).call(this);
