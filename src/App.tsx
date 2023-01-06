import "./App.css";
import Grid from "./Grid";
import Header from "./Header";
import Stats from "./Stats";
import { useSearchParams, useLoaderData } from "react-router-dom";
import { PageData } from "./Types";
import Filters from "./Filters";

// Sort/Filter syntax
// Example: https://localhost/watchlist/#/?f:brand=rolex&sort=price
//
// Filtering syntax: f:<field>=<value1>,<value2>
// "field" matches a field in WatchData
// "value1,value2" matches one more more values for field.
//
// if any one value is valid, its considered a match.
// e.g. "f:color=orange,gold" will match "orange" OR "gold".
//
// Multiple filters can be specified.
// In the case of multiple filters, ALL filters must match.
// e.g. "f:brand=rolex&f:color=orange" will match ONLY gold rolex.
// 
// Sorting syntax: sort=<field1>,<field2>
// Fields are in precdence order.
// e.g field1 will be sorted before field2.
//
// TODO: Support asc/desc sorts.

function App() {
  const [searchParams] = useSearchParams();
  const data = useLoaderData() as PageData;

  let sortFields = ["rank", "price"];
  let sortParam = searchParams.get("sort")
  if (sortParam != null) {
    sortFields = sortParam.split(",");
  }

  const getSortFunction = () => {
    const sortFunctions: ((a: any, b: any) => number)[] = [];
    sortFields.forEach((field, i) => {
      sortFunctions.push(sortByKey(field));
    })

    return function(a: any, b: any) {
      for (let i = 0; i < sortFunctions.length; i++) {
        let c = sortFunctions[i](a, b);
        if (c !== 0) {
          return c;
        }
      }
      return 0;    
    }
  }

  const sortByKey = (key: string) => {
    return function (a: any, b: any) {
      let aHasKey = a.hasOwnProperty(key);
      let bHasKey = b.hasOwnProperty(key);
      if (aHasKey && !bHasKey) {
        return -1;
      } else if (!aHasKey && bHasKey) {
        return 1;
      } else if (!aHasKey && !bHasKey) {
        return 0;
      } else {
        return a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0;
      }
    };
  };

  const getFilterFunction = () => {
    const filters = new Filters(searchParams);
    if (!filters.exists()) {
      return () => true;
    }

    return (function (filters) {
      return function (item: any) {
        return filters.match(item);
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
