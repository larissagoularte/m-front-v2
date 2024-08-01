import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const apiUrl = process.env.REACT_APP_API_URL

const Home = () => {
    const [listings, setListings] = useState([]);
    const [error, setError] = useState('');
    const { setIsAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await fetch(`https://m-back-v2.onrender.com/api/listings/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if(response.ok) {
                    const data = await response.json();
                    setListings(data);
                } else {
                    setError('Failed to fetch listings')
                }
            } catch (err) {
                setError('An error occurred');
            }
        };

        fetchListings();
    }, []);

    return (
        <div>
        <h2>Home Page</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <ul>
            {listings.map(listing => (
                <li key={listing._id}>
                    <div>{listing.basicInfo.title}</div>
                </li>
            ))}
        </ul>
    </div>

    )
}

export default Home;