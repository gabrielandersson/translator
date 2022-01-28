import './App.css';
import Login from "./components/Login"
import Translator from "./components/Translator";
import { Route, Routes, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/translator" element={<Translator />}></Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
