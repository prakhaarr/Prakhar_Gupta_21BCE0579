import asyncio
import websockets
import json
from game_logic import GameLogic


class WebSocketServer:
    def __init__(self):
        self.game_logic = GameLogic()

    async def handler(self, websocket, path):
        async for message in websocket:
            data = json.loads(message)
            piece = data.get('piece')
            move = data.get('move')

            if self.game_logic.validate_move(piece, move):
                self.game_logic.apply_move(piece, move)
                lastMove = {
                    'player': self.game_logic.current_turn,
                    'piece': piece,
                    'move': move
                }
                self.game_logic.switch_turn()

                state, turn = self.game_logic.get_game_state()
                await websocket.send(json.dumps({
                    'board': state,
                    'turn': turn,
                    'lastMove': lastMove
                }))
            else:
                await websocket.send(json.dumps({
                    'invalid_move': True,
                    'message': 'Invalid move. Please try again.'
                }))

    def start(self):
        asyncio.get_event_loop().run_until_complete(
            websockets.serve(self.handler, 'localhost', 6789)
        )
        asyncio.get_event_loop().run_forever()


if __name__ == "__main__":
    server = WebSocketServer()
    server.start()
