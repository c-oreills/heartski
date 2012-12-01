`define(['./CakePit'], function(CakePit){`

counter = 0
base = me.ObjectSettings
base.name = "CakePit"

PlayScreen = me.ScreenObject.extend

    onResetEvent: ->
        me.levelDirector.loadLevel 'area01'

        #cake = new CakePit(100, 100, base)
        #me.game.add(cake, 1000)


        cake = new CakePit(10, 10, base)
        me.game.add(cake, 1000)
        me.game.sort()
        window.cake = cake
        console.log 'tried to move'

    update: ->
        #console.log 'update'

    draw: ->
        #console.log 'draw'

    onDestroyEvent: ->

return PlayScreen
`})`
