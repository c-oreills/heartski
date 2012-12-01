import os
from gevent import pywsgi
from geventwebsocket.handler import WebSocketHandler

participants = set()
PORT = 8000

def hello_world(environ, start_response):
    ws = environ["wsgi.websocket"]
    participants.add(ws)
    try:
        while True:
            m = ws.receive()
            for p in participants:
                p.send(m)
    finally:
        participants.remove(ws)

def dispatch(environ, start_response):
    """Resolves to the web page or the websocket depending on the path."""
    if environ['PATH_INFO'] == '/ski':
        return hello_world(environ, start_response)
    else:
        start_response('200 OK', [('content-type', 'text/html')])
        html_path = os.path.join(os.path.dirname(__file__), 'websocket_chat.html')
        return [open(html_path).read() % {'port': PORT}]

if __name__ == '__main__':
    server = pywsgi.WSGIServer(("", PORT), dispatch,
        handler_class=WebSocketHandler)
    server.serve_forever()
