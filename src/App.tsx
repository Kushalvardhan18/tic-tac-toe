import { useState } from "react";
import circle from "./assets/circle.png";
import cross from "./assets/cross.png";
import reset from "./assets/reset.png";
function App() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isCross, setIsCross] = useState(true);

  const [winner, setWinner] = useState("");

  const [draw, setDraw] = useState(false);

  function showImage(index: number) {
    if (board[index] !== null || winner || draw) return;

    const newBoard = [...board];
    newBoard[index] = isCross ? "X" : "O";

    const isWin = checkWinner(newBoard);
    const isBoardFull = newBoard.every((cell) => cell !== null);

    setBoard(newBoard);
    setIsCross(!isCross);

    if (!isWin && isBoardFull) {
      setDraw(true);
      setTimeout(resetGame, 3000);
    }
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
        setWinner(board[a] === "X" ? "Cross" : "Circle");
        setTimeout(resetGame, 5000);
        return true;
      }
    }
    return false;
  }
  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsCross(true);
    setWinner("");
    setDraw(false);
  }

  return (
    <div className="min-h-screen flex flex-col gap-8 justify-center items-center bg-linear-to-b from-gray-950 to-gray-800 text-white px-4">
      <h1 className="text-6xl font-semibold">Tic Tac Toe</h1>

      <div className="text-center">
        <h2 className="text-3xl font-bold text-green-400 mb-2">
          {winner && `${winner} Wins 🎉`}
          <br />
          <div className="text-xl font-semibold text-red-600">
            {winner ? "Game will Reset automatically" : ""}
          </div>
        </h2>
        <h3 className="text-3xl text-yellow-300 my-2">
          {draw ? "Match is Draw 🤝" : ""}
          <div className="text-xl font-semibold text-red-600">
            {draw ? "Game will Reset automatically" : ""}
          </div>
        </h3>
      </div>

      <div
        className="flex flex-col justify-center items-center cursor-pointer group"
        onClick={resetGame}
      >
        {winner || draw ? (
          ""
        ) : (
          <>
            <img
              src={reset}
              alt="reset"
              className="w-12 h-12 group-hover:rotate-180 transition-transform duration-300"
            />
            <div className="text-sm mt-1 text-gray-300 group-hover:text-white">
              Reset Game
            </div>
          </>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3 p-5 bg-gray-900/70 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700">
        {board.map((item, index) => (
          <div
            key={index}
            onClick={() => showImage(index)}
            className="w-24 h-24 sm:w-28 sm:h-28 border border-gray-700 
                     bg-gray-950/60 flex items-center justify-center 
                     cursor-pointer rounded-xl shadow-md
                     hover:bg-gray-800 hover:scale-105 
                     transition-all duration-200 active:scale-95"
          >
            {item && (
              <img
                src={item === "X" ? cross : circle}
                alt={item === "X" ? "cross" : "circle"}
                className="w-16 h-16 sm:w-20 sm:h-20"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
export default App;
