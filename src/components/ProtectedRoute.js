import { Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth, firestore } from '../firebase';  // Firebase import

const ProtectedRoute = ({ element, ...rest }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkRole = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await firestore.collection('users').doc(user.uid).get();
        setIsAdmin(userDoc.data().role === 'admin'); // Check if user has 'admin' role
      }
      setLoading(false);
    };
    checkRole();
  }, []);

  if (loading) return <div>Loading...</div>;

  // If the user is an admin, show the element, otherwise redirect
  return isAdmin ? element : <Navigate to="/" state={{ from: location }} />;
};

export default ProtectedRoute;


