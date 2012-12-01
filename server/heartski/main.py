import os
import json

from gevent import pywsgi
from geventwebsocket.handler import WebSocketHandler

class Player(object):
    def __init__(self, ws):
        self.ws = ws
        self.x = 0
        self.y = 0

    @property
    def id(self):
        return id(self.ws)

    def send(self, m):
        if isinstance(m, unicode):
            self.ws.send(m)
        elif isinstance(m, dict):
            self.ws.send(json.dumps(m))

    @classmethod
    def send_all(data):
        for p in players:
            p.send(data)

players = set()
PORT = 8000

def get_all_player_locations():
    return {p.id: (p.x, p.y) for p in players}

def init_player(ws):
    player = Player(ws)
    players.add(player)
    init_data = {'locations': get_all_player_locations()}
    init_data.update({'my_id': player.id})
    player.send(init_data)
    return player

def cleanup_player(player):
    players.remove(player)

def ski_ws_handler(ws):
    player = None
    try:
        player = init_player(ws)
        while True:
            m = json.loads(ws.receive())
            Player.send_all({'gehan_state': 'bellend', 'received': m})
    finally:
        if player:
            cleanup_player(player)

def dispatch(environ, start_response):
    """Resolves to the web page or the websocket depending on the path."""
    path = environ['PATH_INFO']
    if path == '/ski_ws':
        return ski_ws_handler(environ["wsgi.websocket"])
    if path.startswith('/'):
        path = path[1:]
    path = path or 'index.html'
    start_response('200 OK', [('content-type', 'text/html')])
    www_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../www'))
    html_path = os.path.abspath(os.path.join(www_path, path))
    assert html_path.startswith(www_path), 'Security breach!'
    return open(html_path).read()

if __name__ == '__main__':
    server = pywsgi.WSGIServer(("", PORT), dispatch,
        handler_class=WebSocketHandler)
    server.serve_forever()
