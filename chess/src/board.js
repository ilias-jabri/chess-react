import react from "react"
const testPosition = "Rwa1/"
const positionNumToSquare = new Map();
const positionSquareToNum = new Map();

let positionToArray = (pos) => {
    let position = pos || 'Rwa1/Nwcb1/Bwc1/Qwd1/Kwe1/Bwf1/Nwg1/Rwh1/Pwa2/Pwb2/Pwc2/Pwd2/Pwe2/Pwf2/Pwg2/Pwh2/';
    const generatedArray = [];
        position = position.match(/\w+\d(?=\/)/g);
        position.forEach((pos, index) => {
            const arr = [pos.match(/\D{2}/g)[0], pos.match(/\w\d/g)[0]];
            generatedArray[index] = arr;
        })
        return generatedArray;
}
let setPosition = (position) => {
    const generatedArray = [];
    position.forEach((pos, index) => {
        generatedArray[index] = positionSquareToNum.get(position[index][1]);
    })
    return generatedArray;
}


export class Board extends react.Component {
    constructor (props){
        super(props);
        this.state = {
            position: positionToArray(this.props.position),
            lastMove: null,
            playerToPlay: 'white',
            selectedPiece: null
        }
        this.mapPosition();
    }
    mapPosition = () => {
        const files = ['a','b','c','d','e','f','g','h'];
        
            let doWork = (file, initialPosition) => {
                positionNumToSquare.set(initialPosition, file+1);
                for (let i = 2; i <= 8; i++) {
                    let pos = file + i;
                    initialPosition += 8;
                    positionNumToSquare.set(initialPosition, pos);
                }
            }
            files.forEach((file, i)=>{
                doWork(file, i+1);
            })
            for( const [key, value] of positionNumToSquare.entries()){
                positionSquareToNum.set(value,key);
            }
    }
    setSquares(){
        const squares = [];
        const position = setPosition(this.state.position);

        let switcher = false;
        let squaresCounter = 65;
        for(let i = 1; i<=8; i++){
            if(switcher){
                squaresCounter -= 8;
                for(let i = 1; i<=8; i++){
                    if (i % 2 === 0) {
                        squares.push(<BoardSquare piece = {"white-knight"} id = {squaresCounter} key = {squaresCounter} color = {position.includes(squaresCounter) ? "red" : "white"} />);
                        squaresCounter++;
                    }
                    else {
                        squares.push(<BoardSquare piece = {"white-knight"} id = {squaresCounter} key = {squaresCounter} color = {position.includes(squaresCounter) ? "red" : "black"} />);
                        squaresCounter++;
                    }
                }
            }else{
                squaresCounter -= 8;
                for(let i = 1; i<=8; i++){
                    if (i % 2 === 0) {
                        squares.push(<BoardSquare piece = {"white-knight"} id = {squaresCounter} key = {squaresCounter} color = {position.includes(squaresCounter) ? "red" : "black"} />);
                        squaresCounter++;
                    }
                    else {
                        squares.push(<BoardSquare piece = {"white-knight"} id = {squaresCounter} key = {squaresCounter} color = {position.includes(squaresCounter) ? "red" : "white"} />);
                        squaresCounter++;    
                    }
                }
            }
            squaresCounter -= 8;
            switcher === true ? switcher = false: switcher = true;
        }
        return squares;
    }
    render(){
        return (
            <div className="chess-board">
                {this.setSquares()}
            </div>
        )
    }
}
class BoardSquare extends react.Component {
    constructor (props) {
        super (props)
        this.state = {
            color: "black",
            piece: "white-knight"
        }
    }
    render(){
        this.state.color = this.props.color;
        let content = 1;
        if(this.props.piece !== undefined){
            console.log(this.props.piece)
            content = <img src = {`../public/chess-pieces/black-bishop.png`} alt = '' /> 
        }
        return (
            <div id = {`${this.props.id}`} className = {`board-square ${this.state.color}`}>
                {content}
            </div>
        )
    }
}