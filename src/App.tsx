import "./App.css";
import Grid from "./Grid";
import Header from "./Header";
import Stats from "./Stats";
import { useSearchParams, useLoaderData } from "react-router-dom";
import { PageData } from "./Types";
import Filters from "./Filters";
import Sorter from "./Sorter";
import { useEffect } from "react";

// Sort/Filter syntax
// Example: https://localhost/watchlist/#/?f:brand=rolex&sort=price|desc
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
// Sorting syntax: sort=<field1>|<asc/desc>,<field2>|<asc/desc>
// Fields are in precdence order.
// e.g field1 will be sorted before field2.
// Defaults to "asc" sort, can be changed by adding "|desc" to the sort param.

function App() {
  const [searchParams] = useSearchParams();
  const data = useLoaderData() as PageData;
  const filters = new Filters(data, searchParams);

  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem("scrollPosition", window.scrollY.toString());
    };

    window.addEventListener("scroll", handleScroll);

    const scrollPosition = sessionStorage.getItem("scrollPosition");
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition, 10));
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  let sortFields = ["rank", "price"];
  let sortParam = searchParams.get("sort")
  if (sortParam != null) {
    sortFields = sortParam.split(",");
  }

  const getSortFunction = () => {
    const sorters: Sorter[] = [];
    sortFields.forEach((field, i) => {
      sorters.push(new Sorter(field));
    })

    return function(a: any, b: any) {
      for (let i = 0; i < sorters.length; i++) {
        let c = sorters[i].sort(a, b);
        if (c !== 0) {
          return c;
        }
      }
      return 0;    
    }
  }

  const getFilterFunction = () => {
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
      <Header title={data.title} filters={filters} />
      <Grid data={dataCopy} source={data.source} />
      <Stats data={dataCopy} />
    </div>
  );
}

export default App;
