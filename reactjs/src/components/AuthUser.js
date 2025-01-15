import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthUser() {
    const navigate = useNavigate();

    // Helper functions to get token and user from sessionStorage
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        return JSON.parse(tokenString);
    };

    const getUser = () => {
        const userString = sessionStorage.getItem('user');
        return JSON.parse(userString);
    };

    // States for token, user, loading, error, and data
    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    // Save token and user information to sessionStorage
    const saveToken = (user, token) => {
        sessionStorage.setItem('token', JSON.stringify(token));
        sessionStorage.setItem('user', JSON.stringify(user));

        setToken(token);
        setUser(user);
        navigate('/dashboard');
    };

    // Logout and clear sessionStorage
    const logout = () => {
        sessionStorage.clear();
        setToken(null);
        setUser(null);
        navigate('/login');
    };

    // Axios instance with dynamic token injection
    const http = axios.create({
        baseURL: "http://localhost:8000/api",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    // Fetch data dynamically with error and loading states
    const fetchData = async (url, options = {}) => {
        setLoading(true);
        setError(null); // Reset error state
        setData(null);  // Reset data state
        try {
            const response = await http({
                url,
                ...options,
            });
            setData(response.data); // Set API response data
        } catch (err) {
            setError(err.response ? err.response.data : err.message); // Capture error details
        } finally {
            setLoading(false); // Stop the loading state
        }
    };

    return {
        setToken: saveToken,
        token,
        user,
        getToken,
        http,
        logout,
        loading,
        error,
        data,
        fetchData, // Expose fetchData to components
    };
}
