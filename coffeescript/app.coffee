`define(['require', './PlayScreen', './Player', './CakePit',
'./SocketHandler', './PlayersManager', 'domReady!'],
function(require, PlayScreen, Player, CakePit, SocketHandler,
PlayersManager) {`

resources = [
    name: "area01_level_tiles",
    type: "image",
    src: "media/images/area01_level_tiles.png"
,
    name: "metatiles32x32",
    type: "image",
    src: "media/images/metatiles32x32.png"
,
    name: "gripe_run_right",
    type: "image",
    src: "media/images/gripe_run_right.png"
,
    name: "spinning_coin_gold",
    type: "image",
    src: "media/images/spinning_coin_gold.png"
,
    name: "wheelie_right",
    type: "image",
    src: "media/images/wheelie_right.png"
,
    name: "area01",
    type: "tmx",
    src: "media/map.tmx"
]

# Init screen
me.video.init 'appSpace', 640, 480, false, 1.0
me.state.change me.state.LOADING

me.loader.onload = ->
    console.log 'loaded sir'
    screen = new PlayScreen true
    me.state.set me.state.PLAY, screen

    me.entityPool.add "mainPlayer", Player
    #me.entityPool.add "cakePit", CakePit

    # enable the keyboard
    me.input.bindKey me.input.KEY.UP,  "up"
    me.input.bindKey me.input.KEY.DOWN, "down"
    me.input.bindKey me.input.KEY.LEFT,  "left"
    me.input.bindKey me.input.KEY.RIGHT, "right"
    me.input.bindKey me.input.KEY.SPACE, "jump", true

    me.state.change me.state.PLAY

    playersManager = new PlayersManager()

    tunnelCode = window.location.hash.substring 1
    if tunnelCode
        tunnelHost = "#{tunnelCode}.localtunnel.com"
    else
        tunnelHost = document.location.host
    new SocketHandler tunnelHost,
        onPlayersMoved: (locations) ->
            playersManager.playersMoved locations
        onSetPlayerId: (playerId) ->
            playersManager.setPlayerId playerId

me.loader.preload resources

`})`
