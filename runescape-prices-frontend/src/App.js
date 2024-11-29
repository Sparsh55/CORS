// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import  ItemTable from "./components/ItemTable"
import NavBar from './components/Navbar'; // Optional if you want to add navigation
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <NavBar /> {/* Optional navigation bar */}
        <Routes>
          <Route path="/" element={<ItemTable />} />
          {/* You can add more routes here for other components */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
