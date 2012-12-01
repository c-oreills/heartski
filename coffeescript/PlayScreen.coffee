`define(['./CakePit'], function(CakePit){`

counter = 0
base = me.ObjectSettings
base.name = "CakePit"

PlayScreen = me.ScreenObject.extend

    onResetEvent: ->
        me.levelDirector.loadLevel 'area01'

        cake = new CakePit(100, 100, base)
        me.game.add(cake, 1000)


    update: ->
        #console.log 'update'

    draw: ->
        #console.log 'draw'
        counter += 1
        if counter % 20 == 0
            console.log 'draw ', counter
            cake = new CakePit(counter * 10, 100, base)
            me.game.add(cake, 1000)
            me.game.sort()

    onDestroyEvent: ->

return PlayScreen
`})`
