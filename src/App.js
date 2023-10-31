import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./component/Home"
import Signup from './component/Signup';
import Login from './component/Login';
import { auth } from "./Firebase"
import { useEffect, useState } from 'react';

function App() {
  const [userName, setUsername] = useState("")

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUsername(user.displayName);
      }
      else setUsername("");
    });
  })
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home name={userName} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
