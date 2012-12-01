`define(['./CakePit'], function(CakePit){`

base = me.ObjectSettings
base.name = "CakePit"

cls = new Class
    Implements: [Options, Events]

    players: {}

    initialize: (options) ->
        @setOptions options

    setPlayerId: (id) ->
        console.log 'my id is ', id
        @myPlayerId = id

    playersMoved: (locations) ->
        #console.log 'interpret positions', locations
        Object.each  locations, (coords, playerId) =>
            if Number(playerId) != Number(@myPlayerId)
                @movePlayer playerId, coords

    movePlayer: (playerId, coords) ->
        console.log 'move player ', playerId, 'to ', coords
        playerObj = @getPlayerOrRegister(playerId, coords)
        playerObj.set coords, playerObj.width, playerObj.height
        me.game.sort()

    getPlayerOrRegister: (playerId, coords) ->
        player = @players[playerId]
        if not player?
            player = @insertPlayer playerId, coords
        player

    insertPlayer: (playerId, coords) ->
        console.log 'insert player to ', coords
        player = @createPlayer coords
        @players[playerId] = player

    createPlayer: (coords) ->
        cake = new CakePit(coords[0], coords[1], base)
        me.game.add(cake, 1005)
        me.game.sort()
        cake

return cls
`})`
