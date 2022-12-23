import data from './data.json';
import './App.css';
import Grid from './Grid';

function App() {
  let getSortFunction = function() {
    return function(a, b) {
      return parseFloat(a.price) - parseFloat(b.price);
    };
  };

  data.sort(getSortFunction());

  return (
    <div className="App">
      <Grid data={data} />
    </div>
  );
}

export default App;
