import data from './data.json';
import './App.css';
import Grid from './Grid';

function App() {
  let getSortFunction = function() {
    return function(a, b) {
      return parseFloat(a.price) - parseFloat(b.price);
    };
  };

  let getFilterFunction = function() {
    return function(item) {
      return true;
    };
  };

  var dataCopy = data.filter(getFilterFunction()).sort(getSortFunction());

  return (
    <div className="App">
      <Grid data={dataCopy} />
    </div>
  );
}

export default App;
