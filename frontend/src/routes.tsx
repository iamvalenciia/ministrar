import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage";
import Dashboard from "./pages/dashboard";

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
