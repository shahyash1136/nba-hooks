import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import Layout from './Pages/Layout';

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
