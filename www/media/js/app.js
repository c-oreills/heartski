(function() {
  define(['require', './PlayScreen', './Player', 'domReady!'],
function(require, PlayScreen, Player) {;

  var resources, socket;

  resources = [
    {
      name: "area01_level_tiles",
      type: "image",
      src: "media/images/area01_level_tiles.png"
    }, {
      name: "metatiles32x32",
      type: "image",
      src: "media/images/metatiles32x32.png"
    }, {
      name: "gripe_run_right",
      type: "image",
      src: "media/images/gripe_run_right.png"
    }, {
      name: "area01",
      type: "tmx",
      src: "media/map.tmx"
    }
  ];

  socket = new WebSocket("ws:///ski_ws");

  socket.send('christy is lame');

  me.video.init('appSpace', 640, 480, false, 1.0);

  me.state.change(me.state.LOADING);

  me.loader.onload = function() {
    var screen;
    console.log('loaded sir');
    screen = new PlayScreen();
    me.state.set(me.state.PLAY, screen);
    me.entityPool.add("mainPlayer", Player);
    me.input.bindKey(me.input.KEY.LEFT, "left");
    me.input.bindKey(me.input.KEY.RIGHT, "right");
    return me.state.change(me.state.PLAY);
  };

  me.loader.preload(resources);

  });


}).call(this);
