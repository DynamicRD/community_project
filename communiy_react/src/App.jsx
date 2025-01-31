import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* 예시
          기초문법-길동팀원
          <Route path="/test" element={<Syntax />} />*/}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
