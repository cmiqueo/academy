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

  let player = "o"; // The user starts
  const players = {
    o: [],
    x:[]
  }
  const board = document.querySelector('.tictactoe > div');
  const cells = board.querySelectorAll('.tictactoe > div > div');
  let count = 1;
  cells.forEach (cell => {
    cell.setAttribute("data-cell", count++);
    cell.addEventListener("click", updateGame)}
  )

  function updateGame() {
    // console.log("updateGame() Loaded!")
    const cellNum = event.target.dataset.cell;
    const cell = board.querySelector(`[data-cell="${cellNum}"]`)
    cell.innerHTML = player;
    cell.classList.add(player)
    cell.removeEventListener("click", updateGame)
    console.log(typeof cellNum)
    players[player].push(Number(cellNum));

    if (players[player].length > 2 ) {
      WINNING_COMBINATIONS.forEach( (combination) => {
        if (combination.every(elem => players[player].indexOf(elem) > -1) ) {
          console.log("******* W I N N E R ******")
          endGame();
        }
      });
    }
    player = (player === "x") ? "o" : "x";
  }

  function endGame() {
    alert(`Player "${player.toUpperCase()}" wins!`);
  }

}
