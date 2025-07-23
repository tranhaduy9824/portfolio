import Hero from "./sections/Hero";
import Navbar from "./sections/Navbar";
import AirplaneFollow from "./components/AirplaneFollow";
import "@fortawesome/fontawesome-free/css/all.css";
import SuggestScroll from "./components/SuggestScroll";
import { useAppStore } from "./store/useAppStore";
import ProjectList from "./components/ProjectList";

function App() {
  const { isLampOn, isLoaded } = useAppStore();

  return (
    <main
      className="mx-auto"
      style={isLampOn ? { background: "#010a10" } : { background: "#e0f2fe" }}
    >
      {isLoaded && <Navbar />}
      <div className="hero-container">
        <Hero />
        {isLoaded && (
          <>
            <AirplaneFollow />
            <SuggestScroll />
            <ProjectList />
          </>
        )}
      </div>
    </main>
  );
}

export default App;
