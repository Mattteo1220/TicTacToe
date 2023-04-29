const nought = "X";
const cross = "O";
let isUserTurn = true;
let isCompTurn = false;
let computerScore = 0;
let userScore = 0;
let turns = 0;
let playerTypes = {
    None : 0,
    User : 1,
    Computer : 2
}
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

function strategize(){
    for(let outcome of possibleOutcomes){
        let row = new Array();
        row.push(cells[outcome[0]]);
        row.push(cells[outcome[1]]);
        row.push(cells[outcome[2]]);

        if((!isFilled(row[0], nought) && !isFilled(row[0], cross)) && isFilled(row[1], nought) && isFilled(row[2], nought)){
            fillCross(outcome[0]);
            return;
        }
        else if(isFilled(row[0], nought) && (!isFilled(row[1], nought) && !isFilled(row[1], cross)) && isFilled(row[2], nought)){
            fillCross(outcome[1]);
            return;
        }
        else if(isFilled(row[0], nought) && isFilled(row[1], nought) && (!isFilled(row[2], nought)  && !isFilled(row[2], cross))){
            fillCross(outcome[2]);
            return;
        }
        else{
            continue;
        }
    } 
    fillRandomCell();//Only fill if nothing works out above.
}

function stopGame(){
    cells.forEach(c => {
        c.style.opacity = 0.3;
        c.addEventListener("click", (event) => {
            event.preventDefault();
        });
    })
}

function hasWinner(){
    let winner = playerTypes.None;
    for(let outcome of possibleOutcomes){
        let row = new Array();
        row.push(cells[outcome[0]]);
        row.push(cells[outcome[1]]);
        row.push(cells[outcome[2]]);

        if(isFilled(row[0], nought) && isFilled(row[1], nought) && isFilled(row[2], nought)){
            winner = playerTypes.User;
        }
        else if(isFilled(row[0], cross) && isFilled(row[1], cross) && isFilled(row[2], cross)){
            winner = playerTypes.Computer;
        }
        else{
            continue;
        }
    }
    return winner;
}

function threeInARow(winner){
    winnerToast.hidden = false;
    winnerToast.innerHTML = `The winner is: ${winner}`;
}

function isFilled(cell, value){
    return cell.innerHTML === value;
}

cells.forEach(c => c.addEventListener("click", function(event){
    if(isCompTurn){
        event.preventDefault();
    }
    if(c.innerHTML === cross){
        return;
    }
    c.innerHTML = nought;
    c.style.backgroundColor = "#ff726f";
    c.disabled = true;
    turns++;
    let timeout = Math.floor(Math.random() * 1500);
    setTimeout(compTurn, timeout);
    if(isGameOver()){
        return;
    }
    isUserTurn = false;
    isCompTurn = true;
}));

function getRandomCell(cellLength){
    return Math.floor(Math.random() * cellLength);
}

function isGameOver(){
    var winner = hasWinner();
    if((turns == 9 && winner != playerTypes.None) || (turns <= 9 && winner != playerTypes.None)){
        if(winner === playerTypes.User){
            userScore++;
            userScoreElement.innerHTML = userScore;
            threeInARow("User");
            stopGame();
        }
        else{
            computerScore++;
            compScoreElement.innerHTML = computerScore;
            threeInARow("Computer");
            stopGame();
        }
        console.log("End of game.");
        return true;
    }
    else if(turns == 9 && !winner){
        winnerToast.hidden = false;
        winnerToast.innerHTML = "Tie. Please try again!";
    }
}

function getEmptyCells(cell){
    return cell.v.innerHTML !== nought && cell.v.innerHTML !== cross
}

function fillCross(randomCell){
    cells[randomCell].disabled = true;
    cells[randomCell].innerHTML = cross;
    cells[randomCell].style.backgroundColor = "#ffec82";
}

function fillRandomCell(){
    let emptyCells = cells
        .map((v, i) => ({v, i}))
        .filter(getEmptyCells);

    let randomCell = emptyCells[getRandomCell(emptyCells.length)].i;
    fillCross(randomCell);
}

function compTurn(event){
    
    if(isUserTurn){
        event.preventDefault();
    }
    if(turns >= 2){
        strategize();
    }
    else{
        fillRandomCell();
    }

    turns++;
    if(isGameOver()){
        return;
    }
    isUserTurn = true;
    isCompTurn = false;
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
