`define(function(){`

SocketHandler = new Class
    initialize: (@host) ->

        console.log 'connecting to ', @host
        @socket = new WebSocket("ws://#{@host}/ski_ws")
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

    send: (obj) ->
        @socket.send JSON.encode(obj)
        console.log 'sent ', obj

    playerMoved: (player) ->
        coords = JSON.encode {
            type: 'playerPosition'
            left: player.left
            top: player.top
            bottom: player.bottom
            right: player.right
        }
        console.log 'move ', coords
        @socket.send coords

return SocketHandler
`})`
