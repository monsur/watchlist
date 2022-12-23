import logo from './logo.svg';
import data from './data.json';
import './App.css';
import Grid from './Grid';

function App() {
  return (
    <div className="App">
      <Grid data={data} />
    </div>
  );
}

export default App;
