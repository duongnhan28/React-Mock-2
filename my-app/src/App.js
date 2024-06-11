import React, { useEffect } from 'react';
import './App.css';
import Login from './views/pages/Login';
import Poll from './views/pages/Poll';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './views/pages/Dashboard';
import Leaderboard from './views/pages/Leaderboard';
import CreateNewPoll from './views/pages/CreateNewPoll';
import Wrapper from './views/pages/Wrapper';
import { useDispatch } from 'react-redux';
import { getAllPolls } from './redux/pollSlice';
import { getAllUsers } from './redux/userSlice';
import NotFoundPage from './views/pages/NotFoundPage';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPolls());
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Wrapper />}>
            <Route index element={<Dashboard />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="add" element={<CreateNewPoll />} />
            <Route path="questions/:id" element={<Poll />} />
            <Route path="/404" element={<NotFoundPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
