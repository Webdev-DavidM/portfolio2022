import React, { useEffect, useState } from 'react';
import Header from './Header/Header';
import GlobalStyles from './Global/CSS';
import Nav from './Nav/Nav';
import About from './About/About';
import Experience from './Experience/Experience';
import Projects from './Projects/Projects';
import Contact from './Contact/Contact';
import Intro from './Intro/Intro';
import SplashPage from './SplashPage/SplashPage';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const hideSplash = () => {
    setShowSplash(false);
  };

  useEffect(() => {
    setTimeout(() => {
      hideSplash();
    }, 13000);
  }, []);

  return (
    <div>
      <GlobalStyles />
      <SplashPage showSplash={showSplash} skipIntro={hideSplash} />
      <Header />
      {!showSplash && (
        <>
          <Nav />
          <Intro />
          <About />
          <Experience />
          <Projects />
          <Contact />
        </>
      )}
    </div>
  );
}

export default App;
