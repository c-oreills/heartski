(function() {
  define(function(){;

  var Player;

  Player = me.ObjectEntity.extend({
    init: function(x, y, settings) {
      this.parent(x, y, settings);
      settings.image = 'gripe_run_right';
      settings.spritewidth = 64;
      this.setVelocity(3, 15);
      return me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    },
    update: function() {
      if (me.input.isKeyPressed('left')) {
        this.flipX(false);
        this.vel.x -= this.accel.x * me.timer.tick;
      } else if (me.input.isKeyPressed('right')) {
        this.flipX(true);
        this.vel.x += this.accel.x * me.timer.tick;
      } else {
        this.vel.x = 0;
      }
      if (me.input.isKeyPressed('up')) {
        this.vel.y -= this.accel.y * me.timer.tick;
      } else if (me.input.isKeyPressed('down')) {
        this.vel.y += this.accel.y * me.timer.tick;
      }
      if (me.input.isKeyPressed('jump')) {
        if (!this.jumping && !this.falling) {
          this.vel.y = -this.maxVel.y * me.timer.tick;
          this.jumping = true;
        }
      }
      this.updateMovement();
      if (this.vel.x !== 0 || this.vel.y !== 0) {
        socket.playerMoved(this);
        this.parent(this);
        return true;
      }
      return false;
    }
  });

  return Player;

  });


}).call(this);
