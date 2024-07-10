import React, { useState, useEffect } from 'react';
import Carousel from './components/Carousel';

const App = () => {
  const [pageSize, setPageSize] = useState(getPageSize(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function getPageSize(width) {
    if (width > 1200) return 5;
    if (width > 992) return 4;
    if (width > 768) return 3;
    if (width > 576) return 2;
    return 1;
  }

  return (
    <div className="App">
      <h1>Carousel Example</h1>
      <Carousel pageSize={pageSize} />
    </div>
  );
};

export default App;
