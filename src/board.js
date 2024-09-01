import { SelectDialog } from "./modal-select.js";
import { pieces } from "./pieces/pieces.js";

class Square {
  constructor(i, j, board) {
    this.i = i;
    this.j = j;
    this.board = board;
    this.divElement = document.createElement("div");
    this.divElement.classList.add(
      "square",
      (i + j) % 2 != 0 ? "dark" : "light"
    );
    this.divElement.addEventListener("click", this.action.bind(this));

    const squareSize =
      board.divElement.getBoundingClientRect().width / board.boardSize;

    this.divElement.style.fontSize = `${squareSize}px`;
    this.colors = new Map();
    for (let k = 1; k < this.board.boardSize; k++) {
      const red = Math.floor((255 / this.board.boardSize) * k);
      const green = Math.floor(255 - (255 / this.board.boardSize) * k);
      this.colors.set(k, `#${red.toString(16)}${green.toString(16)}00`);
    }
  }

  setColor(level) {
    this.divElement.style.backgroundColor = this.colors.get(level);
  }

  action() {
    this.board.action(this.i, this.j);
  }
}

export class Board {
  boardSize = 8;

  constructor(divElement) {
    this.divElement = divElement;
    this.initSquares();
    this.render();
    this.piceSelectDialog = new SelectDialog();
  }

  initSquares() {
    this.squares = [];
    for (let i = 0; i < this.boardSize; i++) {
      this.squares.push([]);
      for (let j = 0; j < this.boardSize; j++) {
        this.squares[i][j] = new Square(i, j, this);
      }
    }
  }

  get(i, j) {
    return this.squares?.[i]?.[j];
  }

  render() {
    for (let i = 0; i < this.boardSize; i++) {
      const row = document.createElement("div");
      row.classList.add("row");
      this.divElement.appendChild(row);
      for (let j = 0; j < this.boardSize; j++) {
        row.appendChild(this.get(i, j)?.divElement);
      }
    }
  }

  clear() {
    for (let i = 0; i < this.boardSize; i++) {
      for (let j = 0; j < this.boardSize; j++) {
        const square = this.get(i, j);
        square.divElement.innerHTML = "";
        square.divElement.style.backgroundColor = "";
      }
    }
  }

  async action(i, j) {
    const pieceName = await this.piceSelectDialog.selectPiece();
    this.clear();
    if (pieceName === "none") return;
    const square = this.get(i, j);
    const piece = new pieces[pieceName](square);
    square.divElement.innerHTML = piece.glyph;

    const rbfs = (squares, level) => {
      if (squares.length == 0) return;
      const nexts = [];
      for (const square of squares) {
        if (square.divElement.innerHTML === "") {
          square.divElement.innerHTML = level;
          square.setColor(level);
        }
        const newPiece = new pieces[pieceName](square);
        const nextMoves = newPiece.moves();
        for (const move of nextMoves) {
          if (move.divElement.innerHTML === "") {
            nexts.push(move);
          }
        }
      }
      rbfs(nexts, level + 1);
    };

    rbfs(piece.moves(), 1);

    console.log({ i, j, pieceName });
  }
}
