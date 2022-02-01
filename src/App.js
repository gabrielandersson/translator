import './App.css';
import Login from "./components/Login/Login"
import Translator from "./components/Translator/Translator";
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import UserProvider from "./contexts/UserContext"
import WordsProvider from "./contexts/WordsContext"
import Profile from './components/Profile/Profile';

//Here we wrap the different Route paths to make different aspects of application-state accessible to the wrapped react components
function App() {
  return (
    <UserProvider>
      <WordsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/translator" element={<Translator />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>
      </WordsProvider>
    </UserProvider>
  );
}

export default App;
