import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import BookForm from './components/BookForm/BookForm';
import BookList from './components/BookList/BookList';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar/>
        <Routes>
          <Route path="/list" element={<BookList />} />
          <Route path="/add" element={<BookForm />} />
          {/* Add more routes if needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
