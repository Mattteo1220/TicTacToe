const X = "X";
const O = "O";
let isUserTurn = false;
let isCompTurn = false;
let computerScore = 0;
let userScore = 0;

function changeTurn(){
    if(isUserTurn){
        isUserTurn = false;
        isCompTurn = true;
    }
    else{
        isUserTurn = true;
        isCompTurn = false;
    }
}