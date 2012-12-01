(function() {
  define(function(){;

  var CakePit;

  CakePit = me.ObjectEntity.extend({
    init: function(x, y, settings) {
      settings.image = 'gripe_run_right';
      settings.spritewidth = 64;
      this.colliable = true;
      return this.parent(x, y, settings);
    },
    onCollision: function(res, obj) {
      return console.log('collide! ', res, obj);
    }
  });

  return CakePit;

  });


}).call(this);
