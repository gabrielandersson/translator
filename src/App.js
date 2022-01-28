import './App.css';
import Login from "./components/Login"
import Translator from "./components/Translator";
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import UserProvider from "./components/Context/UserContext"

function App() {
  return (
    <UserProvider>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/translator" element={<Translator />}></Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
