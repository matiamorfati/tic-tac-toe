



const gameBoard = ( function(){
    let board = ["", "", "", "", "", "", "", "", "",];

    const getBoard = () => board;

    const placeMarker = (index, marker) => {
       if(board[index] === "") board[index] = marker;
    };

    const resetBoard = () => board.fill("");

    return {getBoard, placeMarker, resetBoard};
})();

const gameController = ( function(){

    const player1 = createPlayer("mat", "O");
    const player2 = createPlayer("pat", "X");
    let currentPlayer = player1;

    const getCurrentPlayer = () => currentPlayer;
    const switchTurns = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    const checkState = () => {
        const winPatterns = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], //poziom
        [0, 3, 6], [1, 4, 7], [2, 5, 8], //pion
        [0, 4, 8], [2, 4, 6] ]; //skos
    
        return winPatterns.some(pattern => pattern.every(index => gameBoard.getBoard()[index] === currentPlayer.marker));
               
        
                                                            /*  ALTERYNATYWA POWYZSZEGO ONELINERA

                                                                    for(let i = 0; winPatterns.length > i; i++){
                                                                        let pattern = winPatterns[i];
                                                                        let isWinningPattern = true;
                                                                        for(let j = 0; pattern > j; j++){
                                                                            let index = pattern[j];

                                                                            if(gameBoard.getBoard[index] !== currentPlayer.marker){
                                                                                isWinningPattern = false;
                                                                                break;
                                                                            }
                                                                        }
                                                                    if(isWinningPattern) return true;
                                                                    }
                                                                    return false; */
    }

    return {getCurrentPlayer, switchTurns, checkState};
})();

function createPlayer(name, marker){
    let points = 0;
    const addPoint = () => points++;
    const showPoints = () => console.log("Points: " + points );
return {name, marker, addPoint, showPoints};
}