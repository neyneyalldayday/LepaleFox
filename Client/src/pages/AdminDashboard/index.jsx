import React, { useState, useEffect } from 'react'
import { getAdminDashboard } from '../../utils/Api'
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');


    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
               const data = getAdminDashboard();
               setMessage(data.message) 
            } catch (err) {
                console.error(err);
                setError('you dont have access to this page')
                
            }
        };
        fetchDashboardData();
    }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <ul>
        <li>
            <Link to='/blog-input'>make a post</Link>
        </li>
        <li>
            <Link to='editpost' >edit/delete post</Link>
        </li>
        <li>
            <Link to='admin-post' >view posts</Link>
        </li>
        </ul>
       
      </div>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <p>{message}</p>
      )}
    </div>
  )
}

export default Dashboard