"use strict";

const playBtn = document.getElementById('play-button');

function mineSweeper(){
    const gameField = document.getElementById('gameField');
    const levelHTML = document.getElementById('level').value;
    const grid = document.createElement('div');
    const recap = document.getElementById('last-game-recap');

    gameOver.classList.add('d-none');

    let totCells;
    const TOT_BOMBS = 16;
    let bombs = [];
    gameField.innerHTML = '';
    let cells = [];
    let bombsHTML = [];
    let attempts = 0;

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

    while(bombs.length < TOT_BOMBS){
        const bomb = randomBetween(1, (totCells*totCells));
        if(!(bombs.includes(bomb))){
            bombs.push(bomb);
        }
    };

    console.log(bombs);

    function createCell(cellNbr){
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.innerHTML = `
        <span>${cellNbr}</span>
        `;

        if(totCells === 10){
            cell.classList.add('easy');
        }
        else if(totCells === 9){
            cell.classList.add('hard');
        }
        else{
            cell.classList.add('impossible');
        }

        cell.addEventListener('click', function(){
            this.classList.add('chosen');
            attempts++;
        })

        return cell;
    }

    function createGrid(){
        // const grid = document.createElement('div');
        grid.className = 'grid';

        for(let i = 1; i <= (totCells*totCells); i++){
            const newCell = createCell(i);
            cells.push(newCell);
            if(bombs.includes(i)){
                bombsHTML.push(newCell);
                newCell.addEventListener('click', function(){
                    for(let j = 0; j < bombsHTML.length; j++){
                        bombsHTML[j].classList.add('loss');
                        bombsHTML[j].innerHTML = `<i class="fa-solid fa-bomb"></i>`;
                    }
                    const gameOver = document.getElementById('gameOver');
                    gameOver.classList.toggle('d-none');
                    recap.innerHTML = `Punteggio Totale: ${attempts - 1}`;
                })
            }

        grid.append(newCell);
        }
        gameField.append(grid);
        console.log(bombsHTML);
        console.log(cells);
    };

    createGrid();
}

playBtn.addEventListener('click', mineSweeper);