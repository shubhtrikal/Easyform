import React from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Dashboard = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(false);
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (token) {
        }
        else
            navigate('/');
      }, []);
    return (
      <div>
            <Navbar/>
            <h1>Dashboard</h1>
        </div>
    )
}

export default Dashboard