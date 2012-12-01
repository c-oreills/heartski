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
        playerObj = @getPlayerOrRegister(playerId, coords)
        if playerObj.pos.x isnt coords[0] or playerObj.pos.y isnt coords[1]
            console.log 'move player'
            if coords[0] > playerObj.pos.x
                playerObj.flipX true
            else
                playerObj.flipX false

            playerObj.pos.set coords[0], coords[1]
        me.game.sort()

    getPlayerOrRegister: (playerId, coords) ->
        player = @players[playerId]
        if not player?
            player = @insertPlayer playerId, coords
        player

    insertPlayer: (playerId, coords) ->
        player = @createPlayer coords
        @players[playerId] = player

    createPlayer: (coords) ->
        cake = new CakePit(coords[0], coords[1], base)
        me.game.add(cake, 1005)
        me.game.sort()
        cake

return cls
`})`
