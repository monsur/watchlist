import "./App.css";
import Grid from "./Grid";
import Header from "./Header";
import Stats from "./Stats";
import { useSearchParams, useLoaderData } from "react-router-dom";
import { PageData, WatchData } from "./Types";
import Filters from "./Filters";

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
