
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'; 
import { auth, firestore } from './firebase';
import { doc, setDoc,getDoc } from 'firebase/firestore'; 
import './App.css';  


import { Link } from 'react-router-dom';

import HomePage from './components/HomePage';
import SignUpForm from './components/SignUpForm';
import FeedbackForm from './components/FeedbackForm';
import VolunteerForm from './components/VolunteerForm';
import SchoolPartnerForm from './components/SchoolPartnerForm';
import CuratedInfoPage from './components/CuratedInfoPage';
import ForgotPassword from './components/ForgotPassword';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute'; 
 



const App = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDoc = await getDoc(doc(firestore, 'users', user.uid));
        if (userDoc.exists()) {
          setRole(userDoc.data().role);
        }
      } else {
        setUser(null);
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <nav>
        <Link to="/" className="nav-link">Home</Link>
        {user ? (
          <> 
          {role === 'admin' && <Link to="/admin-dashboard">Admin Dashboard</Link>}
          <button onClick={() => signOut(auth)}>Sign Out</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/sign-up" className="nav-link">Sign Up</Link>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/volunteer" element={<VolunteerForm />} />
        <Route path="/school-partner" element={<SchoolPartnerForm />} />
        <Route path="/curated-info" element={<CuratedInfoPage />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      {/* Protected Route - Admin only can access */}
      <Route
        path="/admin-dashboard"
        element={<ProtectedRoute element={<AdminDashboard />} />}
      />
      </Routes>

    </Router>
  );
};



export default App;
