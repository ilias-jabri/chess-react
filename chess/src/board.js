import react from "react"
import reactDOM from "react-dom"

const position = 'Rwa1/Kwc1/Bwc1/Qwd1/Kwe1/Bwf1/Kwg1/Rwh1/Pwa2/Pwc2/Pwc2/Pwd2/Pwe2/Pwf2/Pwg2/Pwh2/'


export class Board extends react.Component {
    constructor (props){
        super(props);
        this.state = {
            position: this.props.position || 'Rwa1/Kwc1/Bwc1/Qwd1/Kwe1/Bwf1/Kwg1/Rwh1/Pwa2/Pwc2/Pwc2/Pwd2/Pwe2/Pwf2/Pwg2/Pwh2/',
            lastMove: null,
            playerToPlay: 'white',
            selectedPiece: null
        }
        this.positionNumToSquare = new Map();
        this.positionSquareToNum = new Map();
    }
    mapPosition = () => {
        const files = ['a','b','c','d','e','f','g','h'];
        
            let doWork = (file, initialPosition) => {   
                this.positionNumToSquare.set(initialPosition, file+1);
                for (let i = 2; i <= 8; i++) {
                    let pos = file+i;
                    initialPosition += 8;
                    this.positionNumToSquare.set(initialPosition, pos);
                }
            }
            files.forEach((file, i)=>{
                doWork(file, i+1);
            })
            for( const [key, value] of this.positionNumToSquare.entries()){
                this.positionSquareToNum.set(value,key);
            }
            console.log(this.positionSquareToNum);
     
    }
    setPosition = (val) => {
        const position = val || this.state.position;
        
    }
    render(){
        const squares = [];
        let switcher = false;
        for(let i = 1; i<=8; i++){
            if(switcher){
                for(let i = 1; i<=8; i++){
                    if (i % 2 === 0) {
                        squares.push(<BoardSquare color = "white" />);
                    }
                    else {
                        squares.push(<BoardSquare color = "black" />);
                    }
                }
            }else{
                for(let i = 1; i<=8; i++){
                    if (i % 2 === 0) {
                        squares.push(<BoardSquare color = "black" />);
                    }
                    else {
                        squares.push(<BoardSquare color = "white" />);
                    }
                }
            }
            switcher === true ? switcher = false: switcher = true;
        }
        return (
            <div className="chess-board">
                {squares}
            </div>
        )
    }
}
class BoardSquare extends react.Component {
    constructor (props) {
        super (props)
        this.state = {
            color: "black"
        }
    }
    render(){
        this.state.color = this.props.color;
        return (
            <div className = {`board-square ${this.state.color}`}>

            </div>
        )
    }
}