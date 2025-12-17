import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

/**
 * Authentication Context
 * Manages user authentication state and API calls
 */

const AuthContext = createContext(null);

// API configuration
export const api = axios.create({
    baseURL: 'http://127.0.0.1:5001'
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check for existing token on mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            api.get('/api/v1/auth/me')
                .then(res => setUser(res.data.user))
                .catch(() => {
                    localStorage.removeItem('token');
                    delete api.defaults.headers.common['Authorization'];
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    /**
     * Login user
     * @param {Object} data - { email, password }
     */
    const login = async (data) => {
        const res = await api.post('/api/v1/auth/login', data);
        localStorage.setItem('token', res.data.token);
        api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        setUser(res.data.user);
        toast.success('Welcome back!');
    };

    /**
     * Register new user
     * @param {Object} data - { name, email, password }
     */
    const register = async (data) => {
        await api.post('/api/v1/auth/register', data);
        toast.success('Registration successful! Please login.');
    };

    /**
     * Logout user
     */
    const logout = () => {
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
        setUser(null);
        toast.success('Logged out successfully');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * Hook to use authentication context
 * Usage: const { user, login, register, logout, loading } = useAuth();
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
