// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import  ItemTable from "./components/ItemTable" // Optional if you want to add navigation
import './App.css';
import Homepage from './components/HomePage.js';
import Loder from './components/Loder.js';
import { useEffect, useState } from 'react';
import Footer from './components/Footer.js';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 15000); // Simulate a 5-second loading period
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loder />;
  }

  return (
    <Router>
      <div className="App">

        <Routes>
          <Route path= "/" element={<Homepage/>}/>
          <Route path="/table" element={<ItemTable />} />
          {/* You can add more routes here for other components */}
        </Routes>
         <Footer/>
      </div>
    </Router>
  );
};

export default App;
