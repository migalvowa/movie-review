import { Movie } from "../Movie";

import classNames from "./MoviesList.module.css";

export const MoviesList = ({ title, moviesList }) => {
  return (
    <>
      <h1 className={classNames.moviesListTitle}>{title}</h1>

      <ul className={classNames.moviesList}>
        {moviesList.map((item) => (
          <Movie key={item.netflix_id} item={item} />
        ))}
      </ul>
    </>
  );
};
