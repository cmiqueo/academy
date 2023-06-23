export default async function init(el) {
  const WINNING_COMBINATIONS = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ]

  let move = 0;
  let player = "o"; // The user starts
  const players = {
    o: [],
    x:[]
  }

  const game = document.querySelector('.tictactoe');
  const board = document.querySelector('.tictactoe > div:first-child');
  const cells = game.querySelectorAll('.tictactoe > div:first-child > div');

  const output = game.querySelector('.tictactoe > div:nth-child(2)');
  output.classList.add("output");
  output.querySelector("div").innerHTML = "Welcome!";

  let count = 1;
  cells.forEach (cell => {
    cell.setAttribute("data-cell", count++);
    cell.addEventListener("click", updateGame)
  });

  function updateGame() {
    move++;
    output.querySelector("div").innerHTML = ''; 
    const cellNum = event.target.dataset.cell;
    const cell = board.querySelector(`[data-cell="${cellNum}"]`)
    cell.innerHTML = player;
    cell.classList.add(player)
    cell.removeEventListener("click", updateGame)
    players[player].push(Number(cellNum));

    if (players[player].length > 2 ) {
      WINNING_COMBINATIONS.forEach( (combination) => {
        if (combination.every(elem => players[player].indexOf(elem) > -1) ) {
          endGame(combination);
        } else if (move === 9) {
          gameDraw()
        }
      });
    } 
    player = (player === "x") ? "o" : "x";
  }

 function endGame(combination) {
    cells.forEach (cell => {
      cell.removeEventListener("click", updateGame);
      if (combination?.includes(Number(cell.dataset.cell))) {
        cell.classList.add("highlite");
      }
    })

    output.classList.add("ended"); // v3
    // output.querySelector("div").innerHTML = `(((Player "${player.toUpperCase()}" Wins)))`;
    output.querySelector("div").innerHTML = "Play Again!";
    output.querySelector("div").addEventListener("click", resetGame)
  }

  function gameDraw() {
    cells.forEach (cell => {
      cell.removeEventListener("click", updateGame)}
    )
    output.querySelector("div").innerHTML = "Nobody wins. Play Again!";
    output.querySelector("div").addEventListener("click", resetGame)
  }

  function resetGame() {
    window.location.reload(); // quick hack for now
  }
}
