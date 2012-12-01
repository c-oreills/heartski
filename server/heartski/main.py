import os
import json

import gevent
from gevent import pywsgi
from geventwebsocket.handler import WebSocketHandler
from geventwebsocket.exceptions import WebSocketError

from players import Player, get_all_player_locations

PORT = 8000


def update_player_position(player, m):
    player.x = m['left']
    player.y = m['top']

noop = lambda *a, **k: None

typed_message_fns = {
        'playerPosition': update_player_position,
        'playerJoined': noop}

def route_typed_message(player, m):
    type_ = m['type']
    message_fn = typed_message_fns.get(type_)
    if not message_fn:
        player.error('No such message type: %s' % type)
        return
    message_fn(player, m)

def ski_ws_handler(ws):
    player = None
    try:
        player = Player._init(ws)
        while True:
            m = ws.receive()
            if m:
                try:
                    m = json.loads(m)
                except ValueError:
                    err = 'Not valid JSON: %s' % m
                    print err
                    player.error(err)
                if isinstance(m, dict) and 'type' in m:
                    route_typed_message(player, m)
    finally:
        if player:
            Player._cleanup(player)

def server_tick():
    while True:
        try:
            Player.send_all({'type': 'serverTick',
                'locations': get_all_player_locations(),
                })
            gevent.sleep(0.1)
        except WebSocketError:
            pass

def dispatch(environ, start_response):
    """Resolves to the web page or the websocket depending on the path."""
    path = environ['PATH_INFO']
    if path == '/ski_ws':
        if 'wsgi.websocket' not in environ:
            print environ
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
    gevent.spawn(server_tick)
    server = pywsgi.WSGIServer(("", PORT), dispatch,
        handler_class=WebSocketHandler)
    server.serve_forever()
