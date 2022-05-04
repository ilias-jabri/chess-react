import react from "react"
import reactDOM from "react-dom"

export class Board extends react.Component {
    constructor (props){
        super(props);
        this.state = {
            something: 1
        }
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