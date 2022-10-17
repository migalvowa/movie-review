import classNames from "./Movie.module.css";

export const Movie = ({ item }) => {
  return (
    <li className={classNames.movie} key={item.netflix_id}>
      <img
        className={classNames.moviePoster}
        src={item.poster}
        alt={item.title}
      />

      <div>
        <h3 className={classNames.movieTitle}>{item.title}</h3>
        <p>
          <strong>Synopsis:</strong> {item.synopsis}
        </p>
        <p>
          <strong>Rating:</strong> {item.rating}
        </p>
        <p>
          <strong>Year:</strong> {item.year}
        </p>
        <p>
          <strong>Date:</strong> {item.title_date}
        </p>
      </div>
    </li>
  );
};
