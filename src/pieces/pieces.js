class King {
  constructor(square) {
    this.square = square;
    this.glyph = "♚";
  }

  moves() {
    const moves = [];
    const { i, j } = this.square;
    moves.push(this.square.board.get(i - 1, j - 1));
    moves.push(this.square.board.get(i - 1, j + 0));
    moves.push(this.square.board.get(i - 1, j + 1));

    moves.push(this.square.board.get(i + 0, j - 1));
    moves.push(this.square.board.get(i + 0, j + 1));

    moves.push(this.square.board.get(i + 1, j - 1));
    moves.push(this.square.board.get(i + 1, j + 0));
    moves.push(this.square.board.get(i + 1, j + 1));

    return moves.filter(Boolean);
  }
}

class Queen {
  constructor(square) {
    this.square = square;
    this.glyph = "♛";
  }

  moves() {
    const moves = [];

    const b = new Bishop(this.square);
    const r = new Rook(this.square);

    moves.push(...b.moves(), ...r.moves());

    return moves.filter(Boolean);
  }
}

class Rook {
  constructor(square) {
    this.square = square;
    this.glyph = "♜";
  }

  moves() {
    const moves = [];
    const { i, j } = this.square;
    const boardSize = this.square.board.boardSize;
    for (let k = 0; k < boardSize; k++) {
      if (k == j) continue;
      moves.push(this.square.board.get(i, k));
    }
    for (let k = 0; k < boardSize; k++) {
      if (k == i) continue;
      moves.push(this.square.board.get(k, j));
    }
    return moves.filter(Boolean);
  }
}

class Bishop {
  constructor(square) {
    this.square = square;
    this.glyph = "♝";
  }

  moves() {
    const moves = [];
    const { i, j } = this.square;
    const boardSize = this.square.board.boardSize;

    for (let k = -boardSize; k < boardSize; k++) {
      if (k == 0) continue;
      moves.push(this.square.board.get(i + k, j + k));
      moves.push(this.square.board.get(i + k, j - k));
    }

    return moves.filter(Boolean);
  }
}

class Knight {
  constructor(square) {
    this.square = square;
    this.glyph = "♞";
  }

  moves() {
    const moves = [];
    const { i, j } = this.square;
    moves.push(this.square.board.get(i - 1, j - 2));
    moves.push(this.square.board.get(i - 1, j + 2));

    moves.push(this.square.board.get(i + 1, j - 2));
    moves.push(this.square.board.get(i + 1, j + 2));

    moves.push(this.square.board.get(i - 2, j - 1));
    moves.push(this.square.board.get(i - 2, j + 1));

    moves.push(this.square.board.get(i + 2, j - 1));
    moves.push(this.square.board.get(i + 2, j + 1));

    return moves.filter(Boolean);
  }
}

export const pieces = {
  king: King,
  queen: Queen,
  rook: Rook,
  bishop: Bishop,
  knight: Knight,
};
