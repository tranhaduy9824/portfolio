import { useState } from "react";
import Hero from "./sections/Hero";
import Navbar from "./sections/Navbar";
import AirplaneFollow from "./components/AirplaneFollow";
import "@fortawesome/fontawesome-free/css/all.css";
import SuggestScroll from "./components/SuggestScroll";

function App() {
  const [sound, setSound] = useState(true);
  const [mouseSelected, setMouseSelected] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLampOn, setIsLampOn] = useState(() => {
    return localStorage.getItem("isLampOn") === "true";
  });

  const toggleLamp = () => {
    setIsLampOn((prev) => {
      const newState = !prev;
      localStorage.setItem("isLampOn", String(newState));
      return newState;
    });
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
              isLampOn={isLampOn}
            />
            <SuggestScroll isLampOn={isLampOn} />
          </>
        )}
      </div>
    </main>
  );
}

export default App;
