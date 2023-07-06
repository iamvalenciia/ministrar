import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/homePage";
import Dashboard from "./pages/dashBoard";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
