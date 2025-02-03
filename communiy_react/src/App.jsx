import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './mainpage/Navbar';
import Footer from './mainpage/Footer';
import Home from './mainpage/Home';
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          {/*메인페이지-신하윤*/}
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
