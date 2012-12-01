`define(function(){`

Player = me.ObjectEntity.extend
    init: (x, y, settings) ->
        @parent x, y, settings

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

        @updateMovement()

        if @vel.x isnt 0 or @vel.y isnt 0
            @parent this
            return true

        return false

return Player
`})`