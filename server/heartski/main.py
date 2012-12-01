import os
from gevent import pywsgi
from geventwebsocket.handler import WebSocketHandler

players = set()
PORT = 8000

def ski_ws_handler(ws):
    try:
        players.add(ws)
        while True:
            m = ws.receive()
            for p in players:
                p.send(m)
    finally:
        players.remove(ws)

def dispatch(environ, start_response):
    """Resolves to the web page or the websocket depending on the path."""
    path = environ['PATH_INFO']
    if path == '/ski':
        return ski_ws_handler(environ["wsgi.websocket"])
    if path.startswith('/'):
        path = path[1:]
    path = path or 'index.html'
    start_response('200 OK', [('content-type', 'text/html')])
    html_path = os.path.join(os.path.dirname(__file__), '../../www', path)
    return open(html_path).read()

if __name__ == '__main__':
    server = pywsgi.WSGIServer(("", PORT), dispatch,
        handler_class=WebSocketHandler)
    server.serve_forever()
