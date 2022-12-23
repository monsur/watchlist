import data from './data.json';
import './App.css';
import Grid from './Grid';
import { useSearchParams } from "react-router-dom";

function App() {
  let [searchParams] = useSearchParams();

  let getSortFunction = function() {
    return function(a, b) {
      return parseFloat(a.price) - parseFloat(b.price);
    };
  };

  let getFilterFunction = function() {
    var filters = {};
    var hasFilters = false;

    for (const [key, value] of searchParams.entries()) {
      if (key.startsWith('f:')) {
        filters[key.substring(2)] = value.toLowerCase();
        hasFilters = true;
      }
    }

    if (!hasFilters) {
      return function(item) {
        return true;
      };
    }

    return function(filters) {return function(item) {
      var hasItem = true;
      for (const property in filters) {
        let value = item[property];
        if (!value) {
          return false;
        }
        value = value.toLowerCase();
        if (value == filters[property]) {
          hasItem &= true;
        } else {
          hasItem &= false;
        }
      }
      return hasItem;
    }}(filters);
  };

  var dataCopy = data.filter(getFilterFunction()).sort(getSortFunction());

  return (
    <div className="App">
      <Grid data={dataCopy} />
    </div>
  );
}

export default App;
