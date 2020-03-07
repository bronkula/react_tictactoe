import React, { useState } from 'react';
import './App.css';


const initialGrid = () => ([false,false,false,false,false,false,false,false,false]);

const winRows = [
	[0,1,2], // Row 1
	[3,4,5], // Row 2
	[6,7,8], // Row 3
	[0,3,6], // Column 1
	[1,4,7], // Column 2
	[2,5,8], // Column 3
	[0,4,8], // Diagonal 1
	[2,4,6]  // Diagonal 2
];

const checkWin = (grid,setWinrow) => {
  let winner = false;
  for(let r of winRows) {
    if(r.every((o)=>grid[o]===1)) winner = [...r];
    else if(r.every((o)=>grid[o]===0)) winner = [...r];
  }
  if(!winner && !grid.some(o=>o===false)) winner = true;
  setWinrow(winner);
}

const handleSquareClick = (i,grid,turn,setTurn,setGrid,setWinrow) => {
  if(grid[i]!==false) return;
  grid[i] = turn ? 1 : 0;
  setTurn(!turn);
  setGrid([...grid]);
  checkWin(grid,setWinrow);
}

const Result = ({winrow,grid}) => {
  if(!winrow) return null;
  let winner = winrow===true?false:grid[winrow[0]];
  return <div className="text-center">
    {
      winner===false? 'Stalemate!':
      winner===0? 'Player X wins!':
      'Player O wins!'
    }
  </div>;
}

const WhoseTurn = ({winrow,turn}) => {
  if(winrow) return null;
  return <div className="text-center">Player {turn?'O':'X'}, it's your turn.</div>;
}


const ResetButton = ({winrow,turn,setGrid,setTurn,setWinrow}) => {
  if(winrow===false) return null;
  return <div className="text-center">
    <button type="button" onClick={e=>{
      setGrid(initialGrid());
      setTurn(!turn);
      setWinrow(false);
    }}>Reset</button>
  </div>;
}



const App = () => {
  let [turn,setTurn] = useState(false);
  let [winrow,setWinrow] = useState(false);
  let [grid,setGrid] = useState(initialGrid());

  return (<>
    <div className="grid">
      {grid.map((o,i)=><div key={i} className={`grid-square ${winrow!==false && winrow!==true && winrow.some(o=>o===i)?'winner':''}`} onClick={e=>{
        if(winrow!==false) return;
        handleSquareClick(i,grid,turn,setTurn,setGrid,setWinrow);
      }}>
        {o===false?"":o===0?"X":"O"}
      </div>)}
    </div>
    <div className="scenario">
      <WhoseTurn turn={turn} winrow={winrow} />
      <Result winrow={winrow} grid={grid} />
      <ResetButton winrow={winrow} turn={turn} setTurn={setTurn} setGrid={setGrid} setWinrow={setWinrow} />
    </div>
    <div><a href="https://github.com/bronkula/react-tictactoe">Project on Github</a></div>
  </>);
}

export default App;
