/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { ProductList } from './pages/ProductList';
import AddEditProduct from './pages/AddEditProduct';
import ProductDetail from './pages/ProductDetail';
import './App.css';

const App = () => {
    // Utility function to check if a user is logged in
    const isAuthenticated = () => {
        const currentUser = localStorage.getItem('currentUser');
        return !!currentUser; // Returns true if a user is logged in
    };

    return (
        <Router>
            <div className="app-container">
                <div className="header">
                    <div className="logo">Car Management</div>
                    <div className="nav-buttons">
                        <button onClick={() => window.location.href = '/login'}>Login</button>
                        <button onClick={() => window.location.href = '/register'}>Sign Up</button>
                    </div>
                </div>
                <div className="main">
                    <Routes>
                        {/* Set the default route to open "Your Cars" */}
                        <Route
                            path="/"
                            element={<ProductList />}
                        />
                        
                        <Route
                            path="/login"
                            element={isAuthenticated() ? <Navigate to="/products" /> : <Login />}
                        />
                        <Route
                            path="/register"
                            element={isAuthenticated() ? <Navigate to="/products" /> : <Register />}
                        />
                        <Route
                            path="/products"
                            element={<ProductList />}
                        />
                        <Route
                            path="/add"
                            element={<AddEditProduct />}
                        />
                        <Route
                            path="/products/:id"
                            element={<ProductDetail />}
                        />
                        {/* Catch-all route redirects to "Your Cars" */}
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
                <div className="footer">
                    <p>&copy; 2023 Car Management Application. All rights reserved.</p>
                </div>
            </div>
        </Router>
    );
};

export default App;
