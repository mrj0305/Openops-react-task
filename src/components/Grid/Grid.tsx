import React, { useEffect, useState } from 'react';
import Box from '../Box/Box';
import "./Grid.scss";

//Color generator reference: https://stackoverflow.com/a/1484514
const getRandomColor = () => {
	const letters = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};

const options = [[0,1],[1,0],[-1,0],[0,-1]];

const validateIndex = (randomIndex:number[],row:number,column:number) => {
    if((row+randomIndex[0])>=0 && (row+randomIndex[0])<20 && (column+randomIndex[1])>=0 && (column+randomIndex[1])<10){
        return true;
    }
    return false;
}

const Grid = () => {
    const [gridState,setGridState] = useState<string[][]>([]);
    
    useEffect(() => {
        const grid: string[][] = Array(20).fill("").map(() => Array(10).fill("").map(() => getRandomColor()));
        setGridState(grid);
	}, []);
    
    const clickHandler = (row: number, column: number, previousGridState: any) => {
        var newGrid = [...previousGridState];
        newGrid[row][column] = getRandomColor();

        var visitedIndexes = [...options];

        var randomIndex = visitedIndexes[Math.floor(Math.random()*visitedIndexes.length)];
        
        while(!validateIndex(randomIndex,row,column)){
            const index = visitedIndexes.indexOf(randomIndex);
            if (index > -1) {
                visitedIndexes.splice(index, 1);
            }
            randomIndex = visitedIndexes[Math.floor(Math.random()*visitedIndexes.length)];
        }
        newGrid[row+randomIndex[0]][column+randomIndex[1]] = getRandomColor();
        setGridState(newGrid);
	};

    return (
        <div className="grid-container">
            {gridState.map((row, rowIndex) => (
                    <div className="row-container">
                        {row.map((col,columnIndex) => (
                            <div className="box-container" onClick={() => clickHandler(rowIndex,columnIndex,gridState)}>
                                <Box backgroundColor={col}/>
                            </div>
                        ))}
                    </div>
                
            ))}
        </div>
    )
}

export default Grid;

