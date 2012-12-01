(function() {
  define(function(){;

  var CakePit;

  CakePit = me.ObjectEntity.extend({
    init: function(x, y, settings) {
      settings.image = 'gripe_run_right';
      settings.spritewidth = 64;
      return this.parent(x, y, settings);
    }
  });

  return CakePit;

  });


}).call(this);
