const nought = "X";
const cross = "O";
let isUserTurn = true;
let isCompTurn = false;
let computerScore = 0;
let userScore = 0;
let turns = 0;
let possibleOutcomes = [
    //horizontal
    [0,1,2],
    [3,4,5],
    [6,7,8],
    //vertical
    [0,3,6],
    [1,4,7],
    [2,5,8],
    //diagonal
    [0,4,8],
    [2,4,6]
]

//Elements
let continueElement = document.getElementById("continue");
let reset = document.getElementById("reset");
let grid = document.getElementById("grid");
let cells = Array.from(document.getElementsByClassName("cell"));
let winnerToast = document.getElementById("winner-toast");
let userScoreElement = document.getElementById("userScore");
let compScoreElement = document.getElementById("compScore");

function stopGame(){
    cells.forEach(c => {
        c.style.opacity = 0.3;
        c.addEventListener("click", (event) => {
            event.preventDefault();
        });
    })
}

function hasWinner(){
    let isWinnerDetermined = false;
    for(let outcome of possibleOutcomes){
        let row = new Array();
        row.push(cells[outcome[0]]);
        row.push(cells[outcome[1]]);
        row.push(cells[outcome[2]]);

        if(isFilled(row[0], nought) && isFilled(row[1], nought) && isFilled(row[2], nought)){
            userScore++;
            userScoreElement.innerHTML = userScore;
            threeInARow("User");
            stopGame();
            isWinnerDetermined = true;
        }
        else if(isFilled(row[0], cross) && isFilled(row[1], cross) && isFilled(row[2], cross)){
            computerScore++;
            compScoreElement.innerHTML = computerScore;
            threeInARow("Computer");
            stopGame();
            isWinnerDetermined = true;
        }
        else{
            continue;
        }
    }
    return isWinnerDetermined;
}

function threeInARow(winner){
    winnerToast.hidden = false;
    winnerToast.innerHTML = `The winner is: ${winner}`;
}

function isFilled(cell, value){
    return cell.innerHTML === value;
}

cells.forEach(c => c.addEventListener("click", function(){
    if(isGameOver()){
        return;
    }
    if(c.innerHTML === cross){
        return;
    }
    c.innerHTML = nought;
    c.style.backgroundColor = "#ff726f";
    c.disabled = true;
    turns++;
    let timeout = Math.ceil(Math.random() * 10);
    setTimeout(compTurn, timeout);
}));

function getRandomCell(cellLength){
    return Math.floor(Math.random() * cellLength);
}

function isGameOver(){
    var isWinnerDetermined = hasWinner();
    if(turns >= 9 || isWinnerDetermined){
        console.log("End of game.");
        return true;
    }
}

function getEmptyCells(cell){
    return cell.v.innerHTML !== nought && cell.v.innerHTML !== cross
}

function compTurn(){
    if(isGameOver()){
        return;
    }
    let emptyCells = cells
    .map((v, i) => ({v, i}))
    .filter(getEmptyCells);

    let randomCell = emptyCells[getRandomCell(emptyCells.length)].i;

    turns++;
    cells[randomCell].disabled = true;
    cells[randomCell].innerHTML = cross;
    cells[randomCell].style.backgroundColor = "#ffec82";
}

reset.addEventListener("click", () => {
    turns = 0;
    cells.forEach(c => c.innerHTML = null);
    cells.forEach(c => c.style.backgroundColor = "turquoise");
    cells.forEach(c => c.style.opacity = 1);
    userScore = 0;
    computerScore = 0;
    userScoreElement.innerHTML = userScore;
    compScoreElement.innerHTML = computerScore;
    winnerToast.hidden = true;
});


continueElement.addEventListener("click", () => {
    turns = 0;
    cells.forEach(c => c.innerHTML = null);
    cells.forEach(c => c.style.backgroundColor = "turquoise");
    cells.forEach(c => c.style.opacity = 1);
    winnerToast.hidden = true;
})
