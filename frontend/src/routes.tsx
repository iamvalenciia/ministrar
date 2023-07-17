import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import React from 'react';
import DashBoard from './pages/DashBoard';

const token = localStorage.getItem('token');

function App() {
    const navigate = useNavigate();

    React.useEffect(() => {
        if (token) {
            navigate('/dashboard');
        } else {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/dashboard" element={<DashBoard />} />
            </Routes>
        </div>
    );
}

export default App;
