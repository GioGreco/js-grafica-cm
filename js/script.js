"use strict";

//Play Button ---> event caller
const playBtn = document.getElementById('play-button');

//Game function: event result
function mineSweeper(){
    //HTML constants
    const gameField = document.getElementById('gameField');
    const levelHTML = document.getElementById('level').value;
    const grid = document.createElement('div');
    const recap = document.getElementById('last-game-recap');
    const gameOver = document.getElementById('gameOver');

    //game over layover reset + gamefield reset
    gameOver.classList.add('d-none');
    gameField.innerHTML = '';

    //utility variables and constants
    let totCells;
    const TOT_BOMBS = 16;
    let bombs = [];
    let cells = [];
    let bombsHTML = [];
    let attempts = 0;

    //difficulty level check
    switch(levelHTML){
        case 'easy':
        default: 
            totCells = 10;
            break;
        case 'hard':
            totCells = 9;
            break;
        case 'impossible':
            totCells = 7;
            break;
    }

    //random position bomb generator
    while(bombs.length < TOT_BOMBS){
        const bomb = randomBetween(1, (totCells*totCells));
        if(!(bombs.includes(bomb))){
            bombs.push(bomb);
        }
    };

    let maxAttempts = (totCells*totCells) - TOT_BOMBS;

    console.log(bombs);

    //single cell creation function
    function createCell(cellNbr){
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.innerHTML = `
        <span>${cellNbr}</span>
        `;

        //cell resizing
        if(totCells === 10){
            cell.classList.add('easy');
        }
        else if(totCells === 9){
            cell.classList.add('hard');
        }
        else{
            cell.classList.add('impossible');
        }

        cell.addEventListener('click', selectCell)

        return cell;
    }

    // cell event on click: background + attempts update + remove eventListener after first click + win handling
    function selectCell(){
        this.removeEventListener('click', selectCell)
        this.classList.add('chosen');
        attempts++;
        if(attempts == maxAttempts){
            gameOver.classList.toggle('d-none');
            recap.innerHTML = `HAI VINTO! PUNTEGGIO MASSIMO " ${maxAttempts} " `;
        }
        console.log(maxAttempts, attempts)
    }

    //grid creation function
    function createGrid(){
        grid.className = 'grid';
        //cell generator loop: create an array containing every HTML cell
        for(let i = 1; i <= (totCells*totCells); i++){
            const newCell = createCell(i);
            cells.push(newCell);
            //cell=bomb condition: 1) create array of bombs; 2) show every bomb in bomb-array at click on bomb; 3) game-over layover trigger; 4)print total attempts; 5) call endGame: remove every event from HTML cells array;
            if(bombs.includes(i)){
                bombsHTML.push(newCell);
                newCell.addEventListener('click', function(){
                    for(let j = 0; j < bombsHTML.length; j++){
                        bombsHTML[j].classList.add('loss');
                        bombsHTML[j].innerHTML = `<i class="fa-solid fa-bomb"></i>`;
                    }
                    gameOver.classList.toggle('d-none');
                    recap.innerHTML = `Punteggio Totale: ${attempts - 1}`;
                    endGame();
                })
            }
        grid.append(newCell);
        }
        gameField.append(grid);
        console.log(bombsHTML);
        console.log(cells);
    };

    //calling grid creation --> calling cell creation loop
    createGrid();

    //remove every event from cells
    function endGame(){
        const cells = document.getElementsByClassName('cell');
        for(let i = 0; i < cells.length; i++){
            cells[i].removeEventListener('click', selectCell);
        }
    }
    
}
//play button event listener
playBtn.addEventListener('click', mineSweeper);