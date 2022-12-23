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
 
    // Parse query parameters for any filters. Filters being with 'f:'.
    for (const [key, value] of searchParams.entries()) {
      if (key.startsWith('f:')) {
        filters[key.substring(2)] = value;
      }
    }

    // Check each item against each key in the filter. All filters must be true to
    // return true. If there are no filters, defaults to true.
    return function(filters) {return function(item) {
      var hasItem = true;
      for (const property in filters) {
        let value = item[property];
        if (!value) {
          // Item doesn't have this property, no need to continue checking.
          return false;
        }
        // using &= since all values need to be true to return true.
        hasItem &= value.toLowerCase() === filters[property].toLowerCase();
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
