import React, { useState } from "react";
import "../Styles/CreateMovie.css";
import { useNavigate } from "react-router-dom";

function CreateMovie() {
  const [movieName, setMovieName] = useState("");
  const [movieYear, setMovieYear] = useState("");
  const [movieImage, setMovieImage] = useState(null);
  const [imageData, setImageData] = useState(""); // To store image data URL
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/mymovie"); // Navigate to "/mymovie" on cancel button click
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setMovieImage(selectedFile);

    const reader = new FileReader();
    reader.onload = () => {
      setImageData(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleTitleChange = (e) => {
    setMovieName(e.target.value);
  };

  const handleYearChange = (e) => {
    setMovieYear(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (movieImage) {
      const imagePath = `../images/${movieImage.name}`;
      const newMovie = {
        name: movieName,
        year: movieYear,
        image: imagePath,
      };
      const storedMovies = JSON.parse(localStorage.getItem("movies")) || [];
      const updatedMovies = [...storedMovies, newMovie];
      localStorage.setItem("movies", JSON.stringify(updatedMovies));
      setImageData(imagePath);
      navigate("/mymovie");
    } else {
      console.log("Please select an image.");
    }
  };

  return (
    <div className="maincontainer">
      <div className="wrapper">
        <div className="headcontainer">
          <h1>Create a New Movie</h1>
        </div>
        <div className="inputbox">
          <div className="imagebox">
            {/* Input for uploading image */}
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={handleFileChange}
            />
          </div>
          <div className="inputFeilds">
            <input
              type="text"
              placeholder="Title"
              value={movieName}
              class
              onChange={handleTitleChange}
            />

            <input
              type="number"
              placeholder="Publishing Year"
              value={movieYear}
              onChange={handleYearChange}
            />
            <div className="buttonwrapper">
              <button className="buttonscancel" onClick={handleCancel}>Cancel</button>
              <button className="buttonssubmit" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateMovie;
