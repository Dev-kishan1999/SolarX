/**
 * @author: Radhey Rupapara - B00910695
 */
import React from 'react';
import './index.css';
import Billprediction from './billprediction';
import Costprediction from './costprediction';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import './App.css';

function PackagePrediction() {
    return (
        <div className="App">
            <Router>
                <Routes>

                    <Route path="/costprediction" element={<Costprediction />}></Route>
                    <Route path="/billprediction" element={<Billprediction />}></Route>
                </Routes>
            </Router>
        </div>
    );
}

export default PackagePrediction;


