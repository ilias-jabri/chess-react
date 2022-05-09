import react from "react"
const positionNumToSquare = new Map();
const positionSquareToNum = new Map();

let positionToArray = (pos) => {
    let position = pos || 'Rwa1/Nwcb1/Bwc1/Qwd1/Kwe1/Bwf1/Nwg1/Rwh1/Pwa2/Pwb2/Pwc2/Pwd2/Pwe2/Pwf2/Pwg2/Pwh2';
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
        generatedArray[index] = [positionSquareToNum.get(pos[1]), pos[0]];
    })
    return generatedArray;
}

export class Board extends react.Component {
    static count = 0;
    constructor (props){
        super(props);
        this.state = {
            position: positionToArray(this.props.position),
            lastMove: null,
            playerToPlay: 'white',
            selectedPiece: null,
            highlightedMoves: []
        }
        this.mapPosition();
        this.highlightPossibleMoves = this.highlightPossibleMoves.bind(this);
    }
    highlightPossibleMoves(move){
        this.setState(pState => {
            return {
                position: pState.position,
                lastMove: pState.lastMove,
                playerToPlay: pState.playerToPlay,
                selectedPiece: pState.selectedPiece,
                highlightedMoves: move
            }   
        })
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
            files.forEach((file, i) => {
                doWork(file, i+1);
            })
            for( const [key, value] of positionNumToSquare.entries()){
                positionSquareToNum.set(value,key);
            }
    }
    componentDidUpdate(){
    }
    setSquares(){
        const squares = [];
        const position = new Map (setPosition(this.state.position));
        console.log(this.state.highlightedMoves)
        let coloredSquares = this.state.highlightedMoves;
        console.log("colored squares: " , coloredSquares)
        console.log(coloredSquares.includes(5));
        let switcher = false;
        let squaresCounter = 65;
        for(let i = 1; i<=8; i++){
            if(switcher){
                squaresCounter -= 8;
                for(let i = 1; i<=8; i++){
                    if (i % 2 === 0) {
                        squares.push(<BoardSquare highlightHandle = {this.highlightPossibleMoves} piece = {position.has(squaresCounter) ? position.get(squaresCounter): false} id = {squaresCounter} key = {squaresCounter} highlighted = {coloredSquares.includes(squaresCounter)} color = {coloredSquares.includes(squaresCounter) ? "red" : "white"} />);
                        squaresCounter++;
                    }
                    else {
                        squares.push(<BoardSquare highlightHandle = {this.highlightPossibleMoves} piece = {position.has(squaresCounter) ? position.get(squaresCounter): false} id = {squaresCounter} key = {squaresCounter} color = {coloredSquares.includes(squaresCounter) ? "red" : "black"} />);
                        squaresCounter++;
                    }
                }
            }else{
                squaresCounter -= 8;
                for(let i = 1; i<=8; i++){
                    if (i % 2 === 0) {
                        squares.push(<BoardSquare highlightHandle = {this.highlightPossibleMoves} piece = {position.has(squaresCounter) ? position.get(squaresCounter): false} id = {squaresCounter} key = {squaresCounter} color = {coloredSquares.includes(squaresCounter) ? "red" : "black"} />);
                        squaresCounter++;
                    }
                    else {
                        squares.push(<BoardSquare highlightHandle = {this.highlightPossibleMoves} piece = {position.has(squaresCounter) ? position.get(squaresCounter): false} id = {squaresCounter} key = {squaresCounter} color = {coloredSquares.includes(squaresCounter) ? "red" : "white"} />);
                        squaresCounter++;    
                    }
                }
            }
            squaresCounter -= 8;
            switcher === true ? switcher = false: switcher = true;
        }
        Board.setCount();
        console.log(Board.count);
        return squares;
    }
    static setCount (){
        Board.count++;
    }
    get getCount(){
        return this.count;
    }
    render(){
        return (
            <>
            <h1> the square is: {this.state.highlightedMoves}</h1>
            <div className="chess-board">
                {this.setSquares()}
            </div>
            </>
        )
    }
}
function translatePieces(acro){
    let color = 'none',type = 'none';
    // eslint-disable-next-line default-case
    switch(acro[0]){
        case 'K':
            type = "king";
            break;
        case 'N':
            type = "knight";
            break;
        case 'Q':
            type = "queen";
            break;
        case 'P':
            type = "pown";
            break;
        case 'B':
            type = "bishop";
            break;
        case 'R':
            type = "rook";
            break
    }
    // eslint-disable-next-line default-case
    switch(acro[1]){
        case 'w':
            color = "white";
            break;
        case 'b':
            color = "black";
        break
    }

    return `${color}-${type}`;
}
class BoardSquare extends react.Component {
    constructor (props) {
        super (props)
        this.state = {
            color: "black",
            position: positionNumToSquare.get(this.props.id),
            piece: null
        }
        this.state.color = this.props.color ?? this.state.color;
        if(this.props.piece) this.state.piece = translatePieces(this.props.piece);
    }
    clickHandler = () => {
        this.props.highlightHandle(this.position);
    }
    render(){
        let content = '';
        let thePiece;
        let pos = positionNumToSquare.get(this.props.id);
        let rendredColor = this.state.color;
        this.props.highlighted ? rendredColor = "red": rendredColor = this.state.color;

        if (this.props.piece) {
            thePiece = translatePieces(this.props.piece);
            content = <img src = {require(`./chess-pieces/${thePiece}.png`)} alt = 'chess-piece' />
        }
        return (
            <div onClick = {()=>{this.props.highlightHandle([this.props.id])}} 
                id = {`${this.props.id}`} 
                className = {`board-square ${rendredColor}`}>
                    {content} 
            </div>
        )
    }
}