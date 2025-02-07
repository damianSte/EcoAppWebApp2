import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './home-page/HomePage';
import LoginForm from './login-form/LoginForm';
import CartPage from './purchase-page/CartPage';
import MapComp from './home-page/MapComonent';
import RegisterFieldsComponent from './register-page/RegisterFiledsComponent';
import MatchMe from './tinderComponent/MatchMe';
import ShoppingPage from './ShoppingPage/ShoppingPage';
import AddProductPage from './addProduct-page';
<<<<<<< HEAD
import ApiProvider from './apiContext';

function App() {
  return (
    <ApiProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home-page" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/tinder" element={<MatchMe />} />
        <Route path="/drop-point" element={<MapComp />} />
        <Route path="/match-finder" element={<MatchMe />} />
        <Route path="/register" element={<RegisterFieldsComponent />} />
        <Route path="/shop-page" element={<ShoppingPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </ApiProvider>
=======
import AccountPage from './account-page/AccountPage';

function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <ApiProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home-page" element={<HomePage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/add-product" element={<AddProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/tinder" element={<MatchMe />} />
            <Route path="/drop-point" element={<MapComp />} />
            <Route path="/match-finder" element={<MatchMe />} />
            <Route path="/register" element={<RegisterFieldsComponent />} />
            <Route path="/shop-page" element={<ShoppingPage />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </ApiProvider>
      </AuthProvider>
    </React.StrictMode>
>>>>>>> ee92269173d0e3fb3a846e7b3f7a27231a311af5
  );
}

export default App;
