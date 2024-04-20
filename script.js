"use strict";
let xTurn = true;
let board = [null, null, null, null, null, null, null, null, null];
let emptyCells = 9;
let res = document.getElementById("result");
let MarkBoard = (idx) => {
  let pos = idx - 1;
  if (board[pos] == null);
  {
    let boardCell = document.getElementById("block-" + idx);
    boardCell.innerHTML = xTurn ? "X" : "O";
    boardCell.classList.remove("hoverBlock");
    boardCell.disabled = true;
    board[pos] = xTurn ? "X" : "O";
    xTurn = !xTurn;
    res.innerHTML = xTurn ? "Player 1 Turn : X" : "Player 2 Turn : O";
    res.style.color = xTurn ? "#213cee" : "#fc7813";
    emptyCells = emptyCells - 1;
    FindWinner();
  }
};

function Reset() {
  xTurn = true;
  board = [null, null, null, null, null, null, null, null, null];
  emptyCells = 9;
  res.innerHTML = "Player 1 Turn : X";
  res.style.color = "#213cee";
  for (let i = 1; i <= 9; i++) {
    let boardCell = document.getElementById("block-" + i);
    boardCell.innerHTML = "";
    boardCell.classList.add("hoverBlock");
    boardCell.disabled = false;
  }
  window.location.reload();
}

function FindWinner() {
  let checkWinner = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let isAnyoneWon = false;
  for (const element of checkWinner) {
    const [a, b, c] = element;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      for (let i = 1; i <= 9; i++) {
        let boardCell = document.getElementById("block-" + i);
        boardCell.classList.remove("hoverBlock");
        boardCell.disabled = true;
      }
      let resultText =
        board[a] == "X"
          ? "Congratulations ! Player 1 Won !!!"
          : "Congratulations ! Player 2 Won !!!";
      let resColor = board[a] == "X" ? "red" : "green";
      res.innerHTML = resultText;
      res.style.color = resColor;
      isAnyoneWon = true;
      setTimeout(Reset, 2000);
      return;
    }
  }
  if (!isAnyoneWon && emptyCells == 0) {
    res.innerHTML = "Game Over !!!";
    res.style.color = "black";
    setTimeout(Reset, 2000);
  }
}
