import { useState } from "react";
import "./App.css";
import FieldContent from "./assets/components/FieldContent";

function App() {
  let size: number = 3;
  const [board, setBoard] = useState<string[][]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");

  if (board.length == 0) {
    let updatedBoard = [];

    for (let i = 0; i < size; i++) {
      let row = [];
      for (let y = 0; y < size; y++) {
        row.push("");
      }
      updatedBoard.push(row);
    }

    setBoard(updatedBoard);
  }

  const onFieldClicked = (field: string, row: number, column: number) => {
    if (field === "") {
      let updatedBoard = [...board];
      updatedBoard[row][column] = currentPlayer;
      setBoard(updatedBoard);
      currentPlayer === "X" ? setCurrentPlayer("O") : setCurrentPlayer("X");

      checkIfWon();
    }
  };

  const checkIfWon = () => {
    // check rows
    let playerWon = "";
    board.every((row) => {
      let player = row[0];

      for (let i = 1; i < row.length && player !== ""; i++) {
        if (row[i] !== player) break;
        else if (i === row.length - 1) playerWon = player;
      }
      if (playerWon !== "") {
        return false;
      }
      return true;
    });

    // check columns
    for (let i = 0; i < board[0].length; i++) {
      let player = board[0][i];
      for (let y = 1; y < board.length; y++) {
        if (board[y][i] !== player) break;
        else if (y === board.length - 1) playerWon = player;
      }
      if (playerWon !== "") {
        break;
      }
    }

    // check diagonal 1
    for (let i = 1; i < board.length; i++) {
      let player = board[0][0];
      if (board[i][i] !== player) break;
      else if (i === board.length - 1) playerWon = player;
      if (playerWon !== "") {
        break;
      }
    }

    // check diagonal 2
    let row = board.length - 1;
    let player = board[row][0];
    for (let i = 1; i < board.length; i++) {
      row--;
      if (board[row][i] !== player) break;
      else if (i === board.length - 1) playerWon = player;
    }

    if (playerWon !== "") {
      alert(`Player ${playerWon} won the game!`);
    }
  };

  return (
    <>
      <h1>TicTacToe</h1>
      <div>
        It's Player{" "}
        <strong className={currentPlayer === "X" ? "color-red" : ""}>
          {currentPlayer}
        </strong>
        's turn
      </div>
      <table className="board">
        <tbody>
          {board.map((row, i) => (
            <tr key={`row-${i}`} className={i > 0 ? "row-border-top" : ""}>
              {row.map((field, j) => (
                <td
                  key={`field-${j}`}
                  className={j > 0 ? "field-border-left" : ""}
                  onClick={() => onFieldClicked(field, i, j)}
                >
                  <FieldContent>{field}</FieldContent>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
