import { useEffect, useState } from "react";
import Hero from "./sections/Hero";
import Navbar from "./sections/Navbar";
import AirplaneFollow from "./components/AirplaneFollow";
import "@fortawesome/fontawesome-free/css/all.css";
import SuggestScroll from "./components/SuggestScroll";

function App() {
  const [sound, setSound] = useState(true);
  const [mouseSelected, setMouseSelected] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLampOn, setIsLampOn] = useState(false);

  const toggleLamp = () => {
    setIsLampOn(!isLampOn);
  };

  return (
    <main
      className="mx-auto"
      style={isLampOn ? { background: "#010a10" } : { background: "#e0f2fe" }}
    >
      {isLoaded && <Navbar sound={sound} setSound={() => setSound(!sound)} isLampOn={isLampOn} />}
      <div className="hero-container">
        <Hero
          sound={sound}
          setMouseSelected={setMouseSelected}
          setIsLoaded={setIsLoaded}
          isLampOn={isLampOn}
          toggleLamp={toggleLamp}
        />
        {isLoaded && (
          <>
            <AirplaneFollow
              mouseSelected={mouseSelected}
              setMouseSelected={setMouseSelected}
            />
            <SuggestScroll isLampOn={isLampOn} />
          </>
        )}
      </div>
    </main>
  );
}

export default App;
