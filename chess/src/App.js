import { Board } from './board';
import './App.css';

const testPosition = "'Pba7/Pbb7/Pbc7/Pbd7/Pbe7/Pbf7/Pbg7/Pbh7/Rba8/Nbb8/Bbc8/Qbd8/Kbe8/Bbf8/Nbg8/Rbh8////////Rwa1/Nwcb1//Bwc6/Qwg7/Kwe1/Bwf1/Nwg1/Rwd6/Pwa2/Pwb2/Pwc2/Pwd4/Pwe2/Pwf2/Pwg2/Pwh2/'"

function App() {
  return (
    <div className = "App">
      <h1>Play Chess</h1>
      <Board position = {testPosition} />
    </div>
  );
}

export default App;
