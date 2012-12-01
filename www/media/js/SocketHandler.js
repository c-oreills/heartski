(function() {
  define(function(){;

  var SocketHandler;

  SocketHandler = new Class({
    Implements: [Options, Events],
    initialize: function(host, options) {
      var _this = this;
      this.host = host;
      this.setOptions(options);
      console.log('connecting to ', this.host);
      this.socket = new WebSocket("ws://" + this.host + "/ski_ws");
      this.socket.onopen = function() {
        return this.send({
          type: 'playerJoined'
        });
      };
      this.socket.onmessage = function(e) {
        return _this.receive(e);
      };
      this.socket.onerror = function(e) {
        return console.log('error', e.data);
      };
      this.socket.onclose = function(e) {
        return console.log('closed', e);
      };
      window.socket = this;
      return this;
    },
    receive: function(event) {
      var obj;
      obj = JSON.decode(event.data);
      console.log('received ', obj);
      if (obj.type === 'serverTick') {
        return this.fireEvent('playersMoved', [obj.locations]);
      }
    },
    send: function(obj) {
      this.socket.send(JSON.encode(obj));
      return console.log('sent ', obj);
    },
    playerMoved: function(player) {
      var coords;
      coords = JSON.encode({
        type: 'playerPosition',
        left: player.left,
        top: player.top,
        bottom: player.bottom,
        right: player.right
      });
      return this.send(coords);
    }
  });

  return SocketHandler;

  });


}).call(this);
