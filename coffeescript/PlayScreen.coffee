`define(['./CakePit'], function(CakePit){`

counter = 0
base = me.ObjectSettings
base.name = "CakePit"

PlayScreen = me.ScreenObject.extend

    onResetEvent: ->
        me.levelDirector.loadLevel 'area01'

    update: ->
        #console.log 'update'

    draw: ->
        #console.log 'draw'

    onDestroyEvent: ->

return PlayScreen
`})`
