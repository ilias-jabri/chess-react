import logo from './logo.svg';
import { Board } from './board';
import './App.css';

const testPosition = "Rwa1/Kwg6/"

function App() {
  return (
    <div className = "App">
      <h1>Play Chess</h1>
      <Board position = {testPosition} />
    </div>
  );
}

export default App;
