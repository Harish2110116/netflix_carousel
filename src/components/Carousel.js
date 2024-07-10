import React, { useState, useEffect } from 'react';
import './Carousel.css';
import axios from 'axios';

const Carousel = ({ pageSize }) => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:5000/api/carousel?page=${currentPage}&pageSize=${pageSize}`);
      setItems(response.data.items);
      setTotalPages(response.data.totalPages);
    };
    fetchData();
  }, [currentPage, pageSize]);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleDotClick = (page) => {
    setCurrentPage(page);
  };

  const renderDots = () => {
    return Array.from({ length: totalPages }, (_, index) => (
      <span
        key={index}
        className={`carousel-dot ${currentPage === index + 1 ? 'active' : ''}`}
        onClick={() => handleDotClick(index + 1)}
      ></span>
    ));
  };

  return (
    <div className="carousel">
      <button
        className="carousel-control prev"
        onClick={handlePrev}
        disabled={currentPage === 1} // Disable if on the first page
      >
        &lt;
      </button>
      <div className="carousel-items">
        {items.map((item, index) => (
          <div className="carousel-item" key={index}>
            <img src={item.image} alt={`Item ${index}`} />
          </div>
        ))}
      </div>
      <button
        className="carousel-control next"
        onClick={handleNext}
        disabled={currentPage === totalPages} // Disable if on the last page
      >
        &gt;
      </button>
      <div className="carousel-dots">
        {renderDots()}
      </div>
    </div>
  );
};

export default Carousel;
