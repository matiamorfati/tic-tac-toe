const changeMarkerButton = document.getElementById("changeMarkerBtn");
const restartButton = document.getElementById("restartBtn");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const scoreTie = document.getElementById("ties");
const gameCellContainer = document.getElementById("gameCellContainer");
const gameCells = document.querySelectorAll(".gameCell");
const playButton = document.getElementById("playBtn");
const changeMarkerPre = document.getElementById("changeMarkerPreword");
const pixelArtButton = document.getElementById("showPixels");



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

    const playerO = createPlayer("O");
    const playerX = createPlayer("X");
    let currentPlayer = playerO; 

    const Ties = tieManager();
    const getTiesManager = () => Ties;

    const getCurrentPlayer = () => currentPlayer;
    const switchTurns = () => {
        currentPlayer = currentPlayer === playerO ? playerX : playerO;
    }
    const restartPlayerPoints = () => {
        playerO.restartPoints();
        playerX.restartPoints();
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

    const isDraw = () => {
        return gameBoard.getBoard().every(cell => cell !== "") && !checkState();
    }

    return {getCurrentPlayer, switchTurns, checkState, isDraw, getTiesManager, restartPlayerPoints};
})();

function createPlayer(marker){
    let points = 0;
    const addPoint = () => points++;
    const showPoints = () => {
        return points;
    }
    const restartPoints = () => {
        points = 0;
    }
return {marker, addPoint, showPoints, restartPoints};
}

function tieManager(){
    let tiesCount = 0;
    const addTie = () => tiesCount++;
    const resetTies = () => tiesCount = 0;
    const getTies = () => tiesCount;
    
return {addTie, resetTies, getTies};
}

const gameUI = (function(){

    const changeFirstMarkerUI = () => {
        const current = gameController.getCurrentPlayer();

        if(current.marker === "O"){
            gameController.switchTurns();
            changeMarkerButton.textContent = "1st Marker: X";
        }
        else if(current.marker === "X"){
            gameController.switchTurns();
            changeMarkerButton.textContent = "1st Marker: O";
        }

        
    }

    changeMarkerButton.addEventListener('click', () => {

      changeFirstMarkerUI();

    });

    restartButton.addEventListener('click', () => {
        changeMarkerButton.classList.remove("deactivate");
        changeMarkerPre.style.opacity = 1;
        changeFirstMarkerUI();

        playButton.classList.remove("deactivate");
        playButton.innerText = "Unleash the possum monstrum"

        scoreTie.innerText = "Ties: 0";
        scoreX.innerText = "X: 0";
        scoreO.innerText = "O: 0";

        gameCells.forEach(cell => {
            cell.classList.remove("active", "marked");
            cell.innerText = "";

        gameBoard.resetBoard();
        gameController.getTiesManager().resetTies();   
        gameController.restartPlayerPoints();
        })
    });

    playButton.addEventListener('click', () => {

        changeMarkerButton.classList.add("deactivate");
        changeMarkerPre.style.opacity = 0;

        gameCells.forEach(cell => {
            cell.classList.add("active");
            cell.classList.remove("marked");
            cell.innerText = "";
        })

        playButton.classList.add("deactivate");
        playButton.innerText = "Unleashed the possum monstrum"
    });

    gameCells.forEach(cell =>
         cell.addEventListener("click", () => {
            if(cell.classList.contains("marked") || !cell.classList.contains("active")) return;
        
        const index = parseInt(cell.dataset.id) - 1;
        const currentPlayer = gameController.getCurrentPlayer();

        gameBoard.placeMarker(index, currentPlayer.marker);

        cell.textContent = currentPlayer.marker;
        cell.classList.add("marked");

        if(gameController.checkState()) {

            (currentPlayer.marker + " wins");

            gameCells.forEach(cell => 
                cell.classList.add("marked"));
            playButton.classList.remove("deactivate");
            playButton.innerText = "Unleash the possum monstrum";
            gameBoard.resetBoard();
            changeFirstMarkerUI();

            currentPlayer.addPoint();
            if(currentPlayer.marker === "X"){
            scoreX.innerText = ("X: " + currentPlayer.showPoints());
            }
            else if(currentPlayer.marker === "O"){
            scoreO.innerText = ("O: " + currentPlayer.showPoints());
            }
        }
        else if(gameController.isDraw()){
            gameController.getTiesManager().addTie();
            scoreTie.innerText = "Ties: " + gameController.getTiesManager().getTies();

            gameCells.forEach(cell =>
                 cell.classList.add("marked"));
            playButton.classList.remove("deactivate");
            playButton.innerText = "Unleash the possum monstrum";
            gameBoard.resetBoard(); 
            gameController.restartPlayerPoints();
            changeFirstMarkerUI();
    }
        else {
            gameController.switchTurns();
        }

        

    }));

    pixelArtButton.addEventListener("click", () => {
        
        if(pixelArtButton.classList.contains("opossumShowed")){
            gameCellContainer.style.opacity = 1;
            pixelArtButton.classList.remove("opossumShowed");
        }
        else {
            gameCellContainer.style.opacity = 0;
            pixelArtButton.classList.add("opossumShowed");
        }
        
    });

})();