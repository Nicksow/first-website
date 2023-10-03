import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";
import {findAllByDisplayValue} from "@testing-library/react";

function Counter(){
    const [value, setValue] = useState(0);
    function add(){
        setValue(value + 1)
    }
    function remove(){
        setValue(value - 1)
    }
    return (
        <div className="App-content">
            <h1 className="Number">Valeur : {value}</h1>
            <button
                className="Minus-button"
                onClick={remove}> - </button>
            <button
                className="Add-button"
                onClick={add}> + </button>

        </div>
    );
}
function Name(){
    const [name, setName]= useState(null);

    return(
        <div>
            <input value={name} onChange={e => setName(e.target.value)}/>
            <div>Coucou {name} ! :D </div>
        </div>
    )
}
function ChildComponent(props){
    return (
        <div className="Child-Div">
            Enfant
            <div className="Number">Numéro : {props.number}</div>
            <button onClick={props.changeNumber}>Changer de numéro</button>
        </div>
    )
}
function ParentComponent(){
    const [number, setNumber] = useState(0);
    function changeNumber(){
        setNumber(Math.floor(Math.random() * 21));
    }
    return (
        <div className="Parent-Div">
            Parent
            <div className="Number"> Numéro : {number}</div>
            <ChildComponent number={number} changeNumber={changeNumber}></ChildComponent>
        </div>
        //Lors du click sur le compo enfant, "onClick" va appeler "changeNumber" qui se trouve dans le
        //compo parent. Ce qui change la valeur de "number" et va update le div du parent et aller dans
        //le paramêtre de "ChildComponent" et va update la valeur dans le compo enfant.
    )
}

function Square(props){
    return <button className="square" onClick={props.onSquareClick}>{props.value}</button>;
}
function Board({ xIsNext, squares, onPlay }){
    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        onPlay(nextSquares);
    }
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }
    return(
        <div className={"TicTacToe"}>
            <div className="board-row">
                <div className="status">{status}</div>
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
        </div>
    )
}
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function Game() {
    const [xIsNext, setXIsNext] = useState(true);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
        setXIsNext(!xIsNext);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
        setXIsNext(nextMove % 2 === 0);
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = 'Go to move #' + move;
        } else {
            description = 'Go to game start';
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
}
function App() {
    return(
        <div>
            <Counter> </Counter>
            <Name></Name>
            <ParentComponent></ParentComponent>
            <Game />
        </div>
    )
}

export default App;
