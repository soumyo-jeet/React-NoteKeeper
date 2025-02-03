import './App.css';
import { BrowserRouter, Routes, Route } from "react-router";
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import Login from './components/Login';
import Signin from './components/Signin';
import NoteState from './contexts/NoteState';
import UserState from './contexts/UserState';
import Logout from './components/Logout';





function App() {
  return (
    <>
      <BrowserRouter>
        <NoteState>
          <UserState>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Signin" element={<Signin />} />
              <Route path='/Logout' element={<Logout />} />
              <Route path='/About' element={<About />}></Route>
            </Routes>
          </UserState>
        </NoteState>
      </BrowserRouter>

    </>
  );
}

export default App;
