import React, { useState } from "react";
import { calculateWinner } from "../helper";
import Board from "./Board";

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(history[stepNumber]);
  const xO = xIsNext ? "X" : "O";

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];
    // return if won or occupied
    if (winner || squares[i]) return;
    // select square
    squares[i] = xO;
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  const renderMoves = () =>
    history.map((_step, move) => {
      const destination = move ? `Go to move #${move}` : `Go to Start`;
      return (
        <li key={move}>
          <span className="moves" onClick={() => jumpTo(move)}>
            {destination}
          </span>
        </li>
      );
    });

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Tic Tac Toe</h1>
      <h3 className={`winner-box ${winner ? "blink" : null}`}>
        {winner ? "Winner: " + winner : "Next Player: " + xO}
      </h3>
      <Board squares={history[stepNumber]} onClick={handleClick} />
      <div className="info-wrapper">
        <div className="histroy-box">
          <h3>History</h3>
          {renderMoves()}
        </div>
      </div>
    </>
  );
};

export default Game;
