`define(function(){`

SocketHandler = new Class
    Implements: [Options, Events]

    initialize: (@host, options) ->
        @setOptions options

        tunnelURL = "ws://#{@host}/ski_ws"
        console.log 'connecting to ', tunnelURL
        @socket = new WebSocket(tunnelURL)
        @socket.onopen = ->
            @send type: 'playerJoined'
        @socket.onmessage = (e) =>
            @receive(e)
        @socket.onerror = (e)->
            console.log 'error', e.data
        @socket.onclose = (e)->
            console.log 'closed', e

        window.socket = this

        this

    receive: (event) ->
        obj = JSON.decode(event.data)
        console.log 'received ', obj
        if obj.type == 'serverTick'
            @fireEvent 'playersMoved', [obj.locations]

    send: (obj) ->
        @socket.send JSON.encode(obj)
        console.log 'sent ', obj

    playerMoved: (player) ->
        coords =
            type: 'playerPosition'
            left: player.left
            top: player.top
            bottom: player.bottom
            right: player.right
        @send coords

return SocketHandler
`})`
