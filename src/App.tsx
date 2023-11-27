import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './content/SearchPage';
import DetailsPage from './content/DetailsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/details/" element={<DetailsPage />} />
        <Route path="/details/:seriesId" element={<DetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
