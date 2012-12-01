`define(function(){`

Player = me.ObjectEntity.extend
    init: (x, y, settings) ->
        @parent x, y, settings
        settings.image = 'gripe_run_right'
        settings.spritewidth = 64
        @setVelocity 3, 15

        me.game.viewport.follow @pos, me.game.viewport.AXIS.BOTH

    update: ->
        if me.input.isKeyPressed 'left'
            @flipX true
            @vel.x -= @accel.x * me.timer.tick
        else if me.input.isKeyPressed 'right'
            @flipX false
            @vel.x += @accel.x * me.timer.tick
        else
            @vel.x = 0
        if me.input.isKeyPressed 'up'
            @vel.y -= @accel.y * me.timer.tick
        else if me.input.isKeyPressed 'down'
            @vel.y += @accel.y * me.timer.tick

        if me.input.isKeyPressed 'jump'
            if not @jumping and not @falling
                @vel.y = -@maxVel.y * me.timer.tick
                @jumping = true

        @updateMovement()

        if @vel.x isnt 0 or @vel.y isnt 0
            socket.playerMoved this
            @parent this
            return true

        return false

return Player
`})`
