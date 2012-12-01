`define(function(){`

CakePit = me.ObjectEntity.extend
    init: (x, y, settings) ->
        settings.image = 'gripe_run_right'
        settings.spritewidth = 64
        this.parent x, y, settings

return CakePit
`})`

