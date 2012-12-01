`define(function(){`

SocketHandler = new Class
    initialize: (@host) ->

        console.log 'connecting to ', @host
        @socket = new WebSocket("ws://#{@host}/ski_ws")
        @socket.onopen = ->
            socket.send 'New participant joined'
        @socket.onmessage = (e)->
            console.log e.data
        @socket.onerror = (e)->
            console.log 'error', e.data
        @socket.onclose = (e)->
            console.log 'closed', e

        window.socket = this

        this

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
