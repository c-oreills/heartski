`define(function(){`

CakePit = me.ObjectEntity.extend
    init: (x, y, settings) ->
        settings.image = 'wheelie_right'
        settings.spritewidth = 64
        this.parent x, y, settings

return CakePit
`})`

