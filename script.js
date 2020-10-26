const shapeCircle = `
<svg aria-label="circle" width="50" height="50" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <use href="#shape-circle"></use>
</svg>
`;
const shapeCross = `
<svg aria-label="cross" width="50" height="50" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <use href="#shape-cross"></use>
</svg>
`;

function logic() {
  const board = document.querySelector('.board');
  const pieces = board.querySelectorAll('button');
  const newGame = document.querySelector('.new-game');
  const message = document.querySelector('.message');
  let boardMatrix = ['', '', '', '', '', '', '', '', ''];
  let currentPlayer = 'O';
  let winner = false;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === 'O' ? 'X' : 'O';
  };

  const disableBoard = () => {
    Array.from(pieces).forEach(button => {
      button.disabled = true;
    });
  };

  const colorWinner = indices => {
    indices.forEach(index => {
      Array.from(pieces)[index].classList.add('won');
    });
    message.innerHTML = `${currentPlayer} is the winner!`;
  };

  // 0, 1, 2
  // 3, 4, 5
  // 6, 7, 8

  const checkRows = () => {
    if (!winner) {
      for (let i = 0; i < 7; i += 3) {
        winner =
          boardMatrix[i] !== '' &&
          boardMatrix[i] === boardMatrix[i + 1] &&
          boardMatrix[i] === boardMatrix[i + 2];
        if (winner) {
          disableBoard();
          colorWinner([i, i + 1, i + 2]);
          return;
        }
      }
    }
  };

  // 0, 3, 6
  // 1, 4, 7
  // 2, 5, 8

  const checkCols = () => {
    if (!winner) {
      for (let i = 0; i < 3; i += 1) {
        winner =
          boardMatrix[i] !== '' &&
          boardMatrix[i] === boardMatrix[i + 3] &&
          boardMatrix[i] === boardMatrix[i + 6];
        if (winner) {
          disableBoard();
          colorWinner([i, i + 3, i + 6]);
          return;
        }
      }
    }
  };

  // 0, 4, 8
  // 2, 4, 6

  const checkDias = () => {
    if (!winner) {
      winner =
        (boardMatrix[0] !== '' &&
          boardMatrix[0] === boardMatrix[4] &&
          boardMatrix[0] === boardMatrix[8]) ||
        (boardMatrix[2] !== '' &&
          boardMatrix[2] === boardMatrix[4] &&
          boardMatrix[2] === boardMatrix[6]);
      if (winner) {
        disableBoard();
        if (
          boardMatrix[0] !== '' &&
          boardMatrix[0] === boardMatrix[4] &&
          boardMatrix[0] === boardMatrix[8]
        ) {
          colorWinner([0, 4, 8]);
        } else {
          colorWinner([2, 4, 6]);
        }
      }
    }
  };

  board.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON' && e.target.innerHTML === '' && !winner) {
      const buttonIndex = e.target.dataset.index;
      boardMatrix[buttonIndex] = currentPlayer === 'O' ? 'O' : 'X';
      e.target.innerHTML = currentPlayer === 'O' ? shapeCircle : shapeCross;
      checkRows();
      checkCols();
      checkDias();
      if (!winner) switchPlayer();
    }
  });

  newGame.addEventListener('click', () => {
    boardMatrix = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'O';
    winner = false;
    message.innerHTML = '';
    Array.from(pieces).forEach(button => {
      button.disabled = false;
      button.innerHTML = '';
      button.classList.remove('won');
    });
  });
}

window.onload = () => {
  logic();
};

export default logic;
