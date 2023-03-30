import './App.css';
import React from 'react';
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/homePage";
import SearchAdvance from './pages/SearchAdvancePage/searchAdvance';
import TestPage from './pages/TestPage/testPage';
import FindSimilarPage from './pages/FindSimilarPage/findSimilarPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchAdvance />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="/findSimilar" element={<FindSimilarPage />} />

      {/* <Route path="/class">
              <Route path=":id">
                  <Route path="documents" element={<Documents />} />
                  <Route path="assignments" element={<Assignments />} />
                  <Route path="classList" element={<ClassList />} />
                  <Route path="posts" element={<Posts />} />
              </Route>
          </Route>
          <Route path="/admin">
              <Route path="reports" element={<AdminReports />} />
              <Route path="class" element={<AdminClasses />} />
          </Route> */}

    </Routes>
  );
}

export default App;
