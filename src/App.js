// Griffin Parker
// 3/17/2023
// Social Media Dashboard
// This React Application is designed to look like a design document that we were given.
// It is designed to be responsivess on screen sizes '1440' and '375'

import React, { useEffect, useState } from 'react';
import Desktop from './Components/desktop';
import Mobile from './Components/mobile';
import './App.css';

function App() {
  const isMobile = window.matchMedia('(max-width: 400px)').matches;
  const [debouncedIsMobile, setDebouncedIsMobile] = useState(isMobile);

  useEffect(() => {
    const handleResize = () => {
      setDebouncedIsMobile(window.matchMedia('(max-width: 400px)').matches);
    };

    const debouncedHandleResize = debounce(handleResize, 500);

    window.addEventListener('resize', debouncedHandleResize);

    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, []);

  useEffect(() => {
    if (debouncedIsMobile !== isMobile) {
      window.location.reload();
    }
  }, [debouncedIsMobile]);

  return (
    <>
      {isMobile ? <Mobile /> : <Desktop />}
    </>
  );
}

export default App;

function debounce(func, wait) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

