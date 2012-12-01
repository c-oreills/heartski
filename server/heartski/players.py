import json

class Player(object):
    _players = set()

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

    def error(self, err, **kwargs):
        self.send(dict(error=err, **kwargs))

    @classmethod
    def send_all(cls, data):
        for p in cls._players:
            p.send(data)

    @classmethod
    def _init(cls, ws):
        player = cls(ws)
        cls._players.add(player)
        init_data = {'type': 'initialData',
                'locations': get_all_player_locations(),
                'myId': player.id}
        player.send(init_data)
        return player

    @classmethod
    def _cleanup(cls, player):
        cls._players.remove(player)

def get_all_player_locations():
    return {p.id: (p.x, p.y) for p in Player._players}
