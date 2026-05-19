import { useState } from "react";
import circle from "./assets/circle.png";
import cross from "./assets/cross.png";
import reset from "./assets/reset.png";
function Table() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isCross, setIsCross] = useState(true);

  const [winner, setWinner] = useState("");

  function showImage(index: number) {
    if (board[index] !== null) return;

    const newBoard = [...board];
    newBoard[index] = isCross ? "X" : "0";
    setBoard(newBoard);
    setIsCross(!isCross);
    checkWinner(newBoard);
  }

  function checkWinner(board: (string | null)[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[b] == board[c]) {
        setWinner(board[a] === "X" ? "Cross" : "Circle" );
      }
    }
  }
  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsCross(true);
    setWinner("");
  }

  return (
    <div className="text-white flex flex-col gap-10 justify-center items-center mt-10">
      <h2>{winner || "draw"}</h2>
      <div
        className="flex flex-col justify-center items-center cursor-pointer hover:text-red-600 "
        onClick={resetGame}
      >
        <img src={reset} alt="reset" />
        <div className="text-xl">Reset</div>
      </div>
      <div className="grid grid-cols-3 gap-2 p-4 bg-gray-800 rounded-xl shadow-2xl">
        {board.map((item, index) => (
          <div
            key={index}
            onClick={() => showImage(index)}
            className="w-30 h-30 border border-gray-600 bg-gray-900 flex items-center justify-center cursor-pointer 
                   shadow-md hover:border-gray-800 transition-all duration-200"
          >
            {item && (
              <img
                src={item === "X" ? cross : circle}
                alt={item === "X" ? "cross" : "circle"}
                className="w-20 h-20"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
export default Table;
