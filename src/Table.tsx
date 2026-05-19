import { useState } from "react";
import circle from "./assets/circle.png";
import cross from "./assets/cross.png";
import reset from "./assets/reset.png";
function Table() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isCross, setIsCross] = useState(true);

  function showImage(index: number) {
    if (board[index] !== null) return;

    const newBoard = [...board];
    newBoard[index] = isCross ? cross : circle;
    setBoard(newBoard);
    setIsCross(!isCross);
  }
  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsCross(true);
  }

  return (
    <div className="text-white flex flex-col gap-10 justify-center items-center mt-10">
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
                src={item}
                alt={item === cross ? "cross" : "circle"}
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
