import data from "./data.json";
import "./App.css";
import Grid from "./Grid";
import Header from "./Header";
import Stats from "./Stats";
import { useSearchParams } from "react-router-dom";

function App() {
  let [searchParams] = useSearchParams();

  let getSortFunction = function () {
    return function (a, b) {
      let aHasRank = a.hasOwnProperty("rank");
      let bHasRank = b.hasOwnProperty("rank");
      if (aHasRank && !bHasRank) {
        return -1;
      } else if (!aHasRank && bHasRank) {
        return 1;
      } else if (!aHasRank && !bHasRank) {
        return parseFloat(a.price) - parseFloat(b.price);
      } else {
        return a.rank - b.rank;
      }
    };
  };

  let getFiltersFromQuery = function () {
    var filters = {};

    // Parse query parameters for any filters. Filters being with 'f:'.
    for (const [key, value] of searchParams.entries()) {
      if (key.startsWith("f:")) {
        filters[key.substring(2)] = value;
      }
    }

    return filters;
  };

  let getFilterFunction = function () {
    let filters = getFiltersFromQuery();

    // Check each item against each key in the filter. All filters must be true to
    // return true. If there are no filters, defaults to true.
    return (function (filters) {
      return function (item) {
        var hasItem = true;
        for (const property in filters) {
          let sourceValue = filters[property].toLowerCase();
          let value = item[property];
          if (!value) {
            // Item doesn't have this property, no need to continue checking.
            return false;
          }
          // using &= since all values need to be true to return true.
          if (typeof value === "object") {
            // if typeof is an object, assuming array.
            for (const i in value) {
              if (value[i].toLowerCase() === sourceValue) {
                hasItem &= true;
              }
            }
          } else {
            hasItem &= value.toLowerCase() === sourceValue;
          }
        }
        return hasItem;
      };
    })(filters);
  };

  var dataCopy = data.filter(getFilterFunction()).sort(getSortFunction());

  return (
    <div className="App">
      <Header />
      <Grid data={dataCopy} />
      <Stats data={dataCopy} />
    </div>
  );
}

export default App;
