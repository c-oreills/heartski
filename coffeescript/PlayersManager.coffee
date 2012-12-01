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
        console.log 'interpret positions', locations
        Object.each  locations, (coords, playerId) =>
            if playerId isnt @myPlayerId
                @movePlayer playerId, coords

    movePlayer: (playerId, coords) ->
        playerObj = @getPlayerOrRegister(playerId)


    getPlayerOrRegister: (playerId) ->
        if not @players[playerId]?
            player = @createPlayer()
            @players[playerId] = player
        player

    createPlayer: ->
        console.log 'create player'
        cake = new CakePit(10, 10, base)
        me.game.add(cake, 1000)
        me.game.sort()

return cls
`})`
