(function() {
  define(function(){;

  var SocketHandler;

  SocketHandler = new Class({
    initialize: function(host) {
      this.host = host;
      console.log('connecting to ', this.host);
      this.socket = new WebSocket("ws://" + this.host + "/ski_ws");
      this.socket.onopen = function() {
        return socket.send('New participant joined');
      };
      this.socket.onmessage = function(e) {
        return console.log(e.data);
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
