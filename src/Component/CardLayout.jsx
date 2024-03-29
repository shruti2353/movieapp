// CardLayout.jsx

import React from "react";
import { Link } from "react-router-dom";
import "../Styles/CardLayoutBoot.css";

function CardLayout({ movie }) {
  const cardStyle = {
    width: "18rem",
    margin: "2rem",
  };

  const imageSource = movie.image; // Use movie image directly

  return (
    <div className="card" style={cardStyle}>
      {imageSource && (
        <img src={imageSource} className="card-img-top" alt="Movie poster" />
      )}
      <div className="card-body">
        <h5 className="card-title">{movie.title || "Movie Title"}</h5>
        <p className="card-text">
          {movie.description || "Movie description goes here..."}
        </p>
        <p className="card-text">Year: {movie.year || "Year"}</p>
        <Link
          to={{
            pathname: "/editmovie",
            state: { movie }, // Pass the movie details as state
          }}
          className="btn btn-primary"
        >
          Edit
        </Link>
      </div>
    </div>
  );
}

export default CardLayout;
