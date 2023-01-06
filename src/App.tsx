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

  const getSortFunction = () => {
    return sortByKey("rank");
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
        return a[key]- b[key];
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
