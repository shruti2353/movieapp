import React, { useState, useEffect } from "react";
// import "../Styles/ListMovie.css";

function ListMovie() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch movies from local storage on component mount
    const storedMovies = JSON.parse(localStorage.getItem("movies")) || [];
    setMovies(storedMovies);
  }, []);

  const handleDelete = (index) => {
    const updatedMovies = [...movies];
    updatedMovies.splice(index, 1); // Remove the movie at the given index
    setMovies(updatedMovies);
    localStorage.setItem("movies", JSON.stringify(updatedMovies)); // Update local storage
  };

  return (
    <div className="movieTable">
      <h1>Movie List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Year</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie, index) => (
            <tr key={index}>
              <td>{movie.name}</td>
              <td>{movie.year}</td>
              <td>
                {movie.image && (
                  <img
                    src={movie.image}
                    alt={movie.name}
                    className="movieImage"
                  />
                )}
              </td>
              <td>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListMovie;
