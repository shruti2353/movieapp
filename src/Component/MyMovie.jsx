import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/MyMovie.css";
import CardLayout from "./CardLayout";
import { FaPlus, FaSignOutAlt } from "react-icons/fa";

function MyMovie() {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (!isLoggedIn) {
      navigate("/");
    }

    const storedMovies = JSON.parse(localStorage.getItem("movies")) || [];
    setMovies(storedMovies);
  }, [navigate]);

  const cardsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(movies.length / cardsPerPage);

  const renderCardsForPage = () => {
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const slicedMovies = movies.slice(startIndex, endIndex);

    return slicedMovies.map((movie, index) => (
      <CardLayout key={index} movie={movie} />
    ));
  };

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/");
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleAddMovie = () => {
    navigate("/createmovie"); // Redirect to "/createmovie" when the button is clicked
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => changePage(i)}
          className={currentPage === i ? "active" : ""}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  if (movies.length === 0) {
    navigate("/Empty");
    return null;
  }

  return (
    <div className="maincontainer">
      <div className="headerdiv">
        <div className="hc">
          <h1 className="h1mymovie">My Movies</h1>
          <button onClick={handleAddMovie} className="button-icon">
            <FaPlus />
          </button>
        </div>
        <div className="logout">
          <button onClick={handleLogout} className="button-icon">
            <FaSignOutAlt />
          </button>
        </div>
      </div>
      <div id="maincontent">{renderCardsForPage()}</div>
      <div className="footer">
        <div className="pagenumber">
          <button onClick={handlePrevPage}>PREV</button>
          {renderPageNumbers()}
          <button onClick={handleNextPage}>NEXT</button>
        </div>
      </div>
    </div>
  );
}

export default MyMovie;
