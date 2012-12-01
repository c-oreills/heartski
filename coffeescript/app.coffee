`define(['require', './PlayScreen', 'domReady!'],
function(require, PlayScreen) {`

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
    name: "area01",
    type: "tmx",
    src: "media/map.tmx"
]

# Init screen
me.video.init 'appSpace', 640, 480, false, 1.0
me.state.change me.state.LOADING

me.loader.onload = ->
    console.log 'loaded sir'
    screen = new PlayScreen()
    me.state.set me.state.PLAY, screen
    me.state.change me.state.PLAY

me.loader.preload resources

`})`
