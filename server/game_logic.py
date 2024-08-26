import random


class GameLogic:
    def __init__(self):
        print("Initializing GameLogic")
        self.board = self.initialize_board()
        self.current_turn = 'A'  # Player A starts the game
        print("Initial board state:", self.board)

    def initialize_board(self):
        board = [['' for _ in range(5)] for _ in range(5)]
        board[0] = ['A-P1', 'A-H1', 'A-H2', 'A-H3', 'A-P2']
        board[4] = ['B-P1', 'B-H1', 'B-H2', 'B-H3', 'B-P2']
        return board

    def validate_move(self, piece, move):
        print("Validating move:", move)
        if move is None or len(move) != 2:
            raise ValueError(
                "Invalid move format. Move must be an array of two integers.")

        piece_type = piece['piece'].split('-')[1]
        new_position = self.calculate_new_position(
            piece['row'], piece['col'], move, piece_type)

        if self.is_within_bounds(new_position):
            valid_moves = self.get_valid_moves(piece_type)
            if move in valid_moves:
                target_piece = self.board[new_position['row']
                                          ][new_position['col']]
                if not target_piece or not target_piece.startswith(self.current_turn):
                    return True

        return False

    def apply_move(self, piece, move):
        print("Applying move for piece:", piece, "with move:", move)
        piece_type = piece['piece'].split(
            '-')[1]
        new_position = self.calculate_new_position(
            piece['row'], piece['col'], move, piece_type)

        if self.is_within_bounds(new_position) and self.validate_move(piece, move):
            self.board[piece['row']][piece['col']] = ''

            if piece_type in ['H1', 'H2']:
                self.handle_attacks(piece, new_position)

            self.board[new_position['row']
                       ][new_position['col']] = piece['piece']

            piece['row'] = new_position['row']
            piece['col'] = new_position['col']
        else:
            print("Invalid move, not applying")

    def handle_attacks(self, piece, new_position):
        target_piece = self.board[new_position['row']][new_position['col']]
        if target_piece and not target_piece.startswith(self.current_turn):
            print(
                f"{piece['piece']} attacks and removes {target_piece} at ({new_position['row']}, {new_position['col']})")
            self.board[new_position['row']][new_position['col']] = ''

    def get_game_state(self):
        return self.board, self.current_turn

    def switch_turn(self):
        print("Switching turn from", self.current_turn)
        self.current_turn = 'B' if self.current_turn == 'A' else 'A'
        print("Turn switched to", self.current_turn)

    def get_valid_moves(self, piece_type):
        if piece_type == 'P1' or piece_type == 'P2':
            return [[0, 1], [0, -1], [1, 0], [-1, 0]]
        elif piece_type == 'H1':
            return [[0, 2], [0, -2], [2, 0], [-2, 0]]
        elif piece_type == 'H2':
            return [[2, 2], [2, -2], [-2, 2], [-2, -2]]
        elif piece_type == 'H3':
            return [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [-1, 2], [1, -2], [-1, -2]]
        return []

    def calculate_new_position(self, row, col, move, piece_type):
        if move is None or len(move) != 2:
            raise ValueError(
                "Invalid move format. Move must be an array of two integers.")

        new_row = row + move[0]
        new_col = col + move[1]
        return {'row': new_row, 'col': new_col}

    def is_within_bounds(self, position):
        return 0 <= position['row'] < 5 and 0 <= position['col'] < 5
