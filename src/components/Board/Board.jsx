import React, { useState, useEffect } from "react";
import { Cell } from "../Cell/Cell";
import "./Board.css";

const combos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState(null);
  const [tie, setTie] = useState(null);

  const checkWinner = (sqauresArray, currentTurn) => {
    for (let combo of combos) {
      let [a, b, c] = combo;
      const checkOne = sqauresArray[a] === currentTurn;
      const checkTwo = sqauresArray[b] === currentTurn;
      const checkThree = sqauresArray[c] === currentTurn;

      if (checkOne && checkTwo && checkThree) {
        setWinner(currentTurn);
      }
    }

    return false;
  };

  const checkTie = () => {
    const totalFilled = squares.filter((item) => item !== "").length;

    if (totalFilled === squares.length) {
      setTie(true);
    }
  };

  const onReset = () => {
    setSquares(Array(9).fill(""));
    setTurn("X");
    setWinner(null);
    setTie(null);
  };

  const handleSquareClick = (i) => {
    if (winner || squares[i]) return;

    const squaresCopy = [...squares];

    squaresCopy[i] = turn;

    setSquares(squaresCopy);

    checkWinner(squaresCopy, turn);

    setTurn(turn === "X" ? "O" : "X");
  };

  useEffect(() => {
    checkTie();
  }, [squares]);

  return (
    <>
      <div className="board">
        {squares.map((square, i) => {
          return (
            <Cell
              className={square ? "animate" : null}
              onClick={() => handleSquareClick(i)}
              key={i}
              value={square}
            />
          );
        })}
      </div>
      <div className="current-turn">
        {winner
          ? `Winner is ${winner}`
          : tie
          ? `Tied`
          : `Current Turn: ${turn}`}
      </div>
      {(winner || tie) && (
        <button className="reset-btn" onClick={onReset}>
          Reset
        </button>
      )}
    </>
  );
};
