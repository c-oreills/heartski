`define(function(){`

PlayScreen = me.ScreenObject.extend
    onResetEvent: ->
        me.levelDirector.loadLevel 'area01'

    onDestroyEvent: ->


return PlayScreen
`})`
