(function() {
  define(function(){;

  var SocketHandler;

  SocketHandler = new Class({
    Implements: [Options, Events],
    initialize: function(host, options) {
      var tunnelURL,
        _this = this;
      this.host = host;
      this.setOptions(options);
      tunnelURL = "ws://" + this.host + "/ski_ws";
      console.log('connecting to ', tunnelURL);
      this.socket = new WebSocket(tunnelURL);
      this.socket.onopen = function() {
        console.log('opened socket');
        return _this.send({
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
      } else if (obj.type === 'initialData') {
        return this.fireEvent('setPlayerId', [obj.myId]);
      }
    },
    send: function(obj) {
      var encoded;
      encoded = JSON.encode(obj);
      console.log('send ', encoded);
      return this.socket.send(encoded);
    },
    playerMoved: function(player) {
      var coords;
      coords = {
        type: 'playerPosition',
        left: player.left,
        top: player.top,
        bottom: player.bottom,
        right: player.right
      };
      return this.send(coords);
    }
  });

  return SocketHandler;

  });


}).call(this);
