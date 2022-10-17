import { useState, useEffect } from "react";
import axios from "axios";

import { Input } from "./components/UI/Input";
import { MoviesList } from "./components/MoviesList";
import { Loader } from "./components/UI/Loader";
import { Button } from "./components/UI/Button";

import { useInput } from "./hooks/useInput";
import { useFetching } from "./hooks/useFetching";

import { API } from "./constants/api";

import classNames from "./App.module.css";

function App() {
  const [moviesList, setMoviesList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const searchInput = useInput("");

  const [fetchMoviesList, isMoviesListLoading, moviesListError] = useFetching(
    async () => {
      const options = {
        method: "GET",
        url: API,
        params: {
          offset,
          limit: "10",
          order_by: "date",
          type: "movie",
          audio: "english",
          subtitle: "english",
        },
        headers: {
          "X-RapidAPI-Key":
            "24c2cc3679msh9fb9683bdb2ef02p182b05jsn007dbc5863d1",
          "X-RapidAPI-Host": "unogs-unogs-v1.p.rapidapi.com",
        },
      };

      const { data } = await axios.request(options);

      setMoviesList([...moviesList, ...data.results]);
      setTotalCount(data.Object.total);
    }
  );

  useEffect(() => {
    fetchMoviesList();
  }, [offset]);

  const filteredMoviesList = moviesList.filter((movie) =>
    movie.title.toLowerCase().includes(searchInput.value.toLowerCase())
  );

  const getMoviesList = () => {
    if (searchInput.value) {
      return filteredMoviesList;
    }

    return moviesList;
  };

  const hasMoviesList = moviesList.length > 0;

  return (
    <div className={classNames.appContainer}>
      {moviesListError && (
        <h1 className={classNames.moviesListError}>Error: {moviesListError}</h1>
      )}

      {hasMoviesList && (
        <>
          <div className={classNames.search}>
            <Input {...searchInput} type="text" placeholder="Search..." />
          </div>

          <MoviesList
            title={getMoviesList().length === 0 ? "No results" : "Movies"}
            moviesList={getMoviesList()}
          />
        </>
      )}

      {isMoviesListLoading && (
        <div className={classNames.loaderContainer}>
          <Loader />
        </div>
      )}

      {hasMoviesList && !isMoviesListLoading && moviesList.length < totalCount && (
        <div className={classNames.buttonContainer}>
          <Button onClick={() => setOffset((prevState) => prevState + 10)}>
            Upload 10 more items
          </Button>
        </div>
      )}
    </div>
  );
}

export default App;
