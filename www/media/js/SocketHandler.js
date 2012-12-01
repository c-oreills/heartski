(function() {
  define(function(){;

  var SocketHandler;

  SocketHandler = new Class({
    initialize: function(host) {
      var _this = this;
      this.host = host;
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
      return console.log('received ', obj);
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
      console.log('move ', coords);
      return this.socket.send(coords);
    }
  });

  return SocketHandler;

  });


}).call(this);
