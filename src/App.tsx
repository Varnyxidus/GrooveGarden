import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Pop from "./pages/Pop";
import Hiphop from "./pages/Hiphop";
import Rnb from "./pages/Rnb";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pop" element={<Pop />} />
      <Route path="/hiphop" element={<Hiphop />} />
      <Route path="/rnb" element={<Rnb />} />
    </Routes>
  )
}

export default App
