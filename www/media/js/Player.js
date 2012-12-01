(function() {
  define(function(){;

  var Player;

  Player = me.ObjectEntity.extend({
    init: function(x, y, settings) {
      this.parent(x, y, settings);
      this.setVelocity(3, 15);
      return me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    },
    update: function() {
      if (me.input.isKeyPressed('left')) {
        this.flipX(true);
        this.vel.x -= this.accel.x * me.timer.tick;
      } else if (me.input.isKeyPressed('right')) {
        this.flipX(false);
        this.vel.x += this.accel.x * me.timer.tick;
      } else {
        this.vel.x = 0;
      }
      this.updateMovement();
      if (this.vel.x !== 0 || this.vel.y !== 0) {
        this.parent(this);
        return true;
      }
      return false;
    }
  });

  return Player;

  });


}).call(this);
