import { useState } from "react";
import Hero from "./sections/Hero"
import Navbar from "./sections/Navbar"
import AirplaneFollow from "./components/AirplaneFollow";
import '@fortawesome/fontawesome-free/css/all.css';

function App() {
  const [sound, setSound] = useState(true);
  const [mouseSelected, setMouseSelected] = useState(false);

  return (
    <main className="mx-auto"> 
      <Navbar sound={sound} setSound={() => setSound(!sound)} />
      <div className="hero-container">
        <Hero sound={sound} setMouseSelected={setMouseSelected} />
        <AirplaneFollow mouseSelected={mouseSelected} setMouseSelected={setMouseSelected} />
      </div>
    </main>
  )
}

export default App
