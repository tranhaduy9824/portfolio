import { useState } from "react";
import Hero from "./sections/Hero"
import Navbar from "./sections/Navbar"

function App() {
  const [sound, setSound] = useState(true);

  return (
    <main className="mx-auto"> 
      <Navbar sound={sound} setSound={() => setSound(!sound)} />
      <Hero sound={sound} />
    </main>
  )
}

export default App
