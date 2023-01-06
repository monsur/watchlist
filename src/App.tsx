import "./App.css";
import Grid from "./Grid";
import Header from "./Header";
import Stats from "./Stats";
import { useSearchParams, useLoaderData } from "react-router-dom";
import { PageData, WatchData } from "./Types";

function App() {
  const [searchParams] = useSearchParams();
  const data = useLoaderData() as PageData;

  const getSortFunction = () =>
    function (a: WatchData, b: WatchData) {
      let aHasRank = a.hasOwnProperty("rank");
      let bHasRank = b.hasOwnProperty("rank");
      if (aHasRank && !bHasRank) {
        return -1;
      } else if (!aHasRank && bHasRank) {
        return 1;
      } else if (!aHasRank && !bHasRank) {
        return a.price - b.price;
      } else {
        return a.rank - b.rank;
      }
    };

  const getFiltersFromQuery = () => {
    var filters: {
      [key: string]: string;
    } = {};

    // Parse query parameters for any filters. Filters being with 'f:'.
    Object.entries(searchParams).forEach(([key, value]) => {
      if (key.startsWith("f:")) {
        filters[key.substring(2)] = value;
      }
    });

    return filters;
  };

  const getFilterFunction = () => {
    let filters = getFiltersFromQuery();

    // Check each item against each key in the filter. All filters must be true to
    // return true. If there are no filters, defaults to true.
    return (function (filters) {
      return function (item: any) {
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
                hasItem = hasItem && true;
              }
            }
          } else {
            hasItem = hasItem && value.toLowerCase() === sourceValue;
          }
        }
        return hasItem;
      };
    })(filters);
  };

  var dataCopy = data.watches
    .filter(getFilterFunction())
    .sort(getSortFunction());

  return (
    <div className="App">
      <Header title={data.title} />
      <Grid data={dataCopy} />
      <Stats data={dataCopy} />
    </div>
  );
}

export default App;
