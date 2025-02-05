import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes } from 'react-router';
import { Route } from 'react-router';
import GroupList from './group/GroupList';
import GroupDetail from './group/GroupDetail';
import GroupRegist from './group/GroupRegist';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* 모임페이지-해원 */}
          <Route path="/group/detail" element={<GroupDetail />} />
          <Route path="/group/list" element={<GroupList />} />
          <Route path="/group/regist" element={<GroupRegist />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
