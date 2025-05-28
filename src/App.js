import React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import OrderPage from './pages/OrderPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import AdminPage from './pages/AdminPage';
import HomePage from './pages/HomePage'; 
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import { fetchCrackers, createCracker, updateCracker, deleteCracker } from './api/crackerApi';
import CrackerForm from './components/CrackerForm';
import CrackerList from './components/CrackerList';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './pages/Header';
import Footer from './pages/Footer';


function App() {
  const [crackers, setCrackers] = useState([]);
  const [editCracker, setEditCracker] = useState(null);

  const loadCrackers = async () => {
    const res = await fetchCrackers();
    setCrackers(res.data);
  };

  useEffect(() => {
    loadCrackers();
  }, []);

  const addOrEdit = async (cracker) => {
    if (cracker._id) {
      await updateCracker(cracker._id, cracker);
    } else {
      await createCracker(cracker);
    }
    setEditCracker(null);
    loadCrackers();
  };

  const handleDelete = async (cracker) => {
    try {
      await deleteCracker(cracker._id);
      loadCrackers();
    } catch (err) {
      console.error('Delete error:', err);
      alert('Delete failed');
    }
  };

  return (
    <Router>
        
      <Header />
  
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/admin-orders" element={<AdminOrdersPage />} />
        <Route path="/admin" element={<AdminPage/>}/>
          <Route path="/about" element={<AboutPage/>}/>
           <Route path="/gallery" element={<GalleryPage/>}/>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />    

        <Route
          path="/about"
          element={
            <div className="container mt-4">
              <h2 className="mb-4 text-center">About page</h2>
            </div>
          }
        />
        <Route
          path="/gallery"
          element={
            <div className="container mt-4">
              <h2 className="mb-4 text-center">Gallery page</h2>
            </div>
          }
        />
        <Route
          path="/add-cracker"
          element={
            <div className="container mt-4">
              <h2 className="mb-4 text-center">Add / Edit Cracker Stock</h2>
              <CrackerForm addOrEdit={addOrEdit} currentCracker={editCracker} />
            </div>
          }
        />
            <Route
          path="/add-cracker"
          element={
            <div className="container mt-4">
              <h2 className="mb-4 text-center">Add / Edit Cracker Stock</h2>
              <CrackerForm addOrEdit={addOrEdit} currentCracker={editCracker} />
            </div>
          }
        />
        
        <Route
          path="/cracker-list"
          element={
            <div className="container mt-4">
              <h2 className="mb-4 text-center">Cracker Stock List</h2>
              <CrackerList crackers={crackers} onEdit={setEditCracker} onDelete={handleDelete} />
            </div>
          }
        />
<Route
          path="/admin-orders"
          element={
            <div className="container mt-4">
              <h2 className="mb-4 text-center">admin view orders</h2>
              
            </div>
          }
        />
        <Route
          path="/admin"
          element={
            <div className="container mt-4">
              <h2 className="mb-4 text-center">admin page</h2>
            </div>
          }
        />
        <Route
          path="/cart"
          element={
            <div className="container mt-4">
              <h2 className="mb-4 text-center">Cart page</h2>
            </div>
          }
        />
        <Route
          path="/checkout"
          element={
            <div className="container mt-4">
              <h2 className="mb-4 text-center">Checkout page</h2>
            </div>
          }
        />

      </Routes>
         <Footer />
    </Router>
  );
}

export default App;
