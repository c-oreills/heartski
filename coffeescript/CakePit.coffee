`define(function(){`

CakePit = me.ObjectEntity.extend
    init: (x, y, settings) ->
        settings.image = 'gripe_run_right'
        settings.spritewidth = 64
        this.colliable = true
        this.parent x, y, settings

    onCollision: (res, obj) ->
        console.log 'collide! ', res, obj


return CakePit
`})`

