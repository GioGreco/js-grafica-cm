"use strict";

const playBtn = document.getElementById('play-button');

function mineSweeper(){
    const gameField = document.getElementById('gameField');
    const levelHTML = document.getElementById('level').value;
    let totCells;
    gameField.innerHTML = '';

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

    function createCell(cellNbr){
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.innerHTML = `${cellNbr}`;
        if(totCells === 10){
            cell.classList.add('easy');
        }
        else if(totCells === 9){
            cell.classList.add('hard');
        }
        else{
            cell.classList.add('impossible');
        }
        return cell;
    }

    function createGrid(){
        const grid = document.createElement('div');
        grid.className = 'grid';
        for(let i = 1; i < (totCells*totCells); i++){
            grid.append(createCell(i))
        }
        gameField.append(grid);
    };

    createGrid();
}

playBtn.addEventListener('click', mineSweeper);