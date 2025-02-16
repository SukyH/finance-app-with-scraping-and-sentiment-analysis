import React, { useState, useEffect } from 'react';
import { firestore, auth } from '../firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [schoolPartners, setSchoolPartners] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate('/login');
        return;
      }

      const userRef = doc(firestore, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists() && userSnap.data().role === 'admin') {
        setIsAdmin(true);
      } else {
        navigate('/home');
      }
    };

    checkAdmin();
  }, [navigate]);

  useEffect(() => {
    if (!isAdmin) return;

    const fetchData = async () => {
      try {
        const usersCollection = await getDocs(collection(firestore, "users"));
        setUsers(usersCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const feedbackCollection = await getDocs(collection(firestore, "feedback"));
        setFeedback(feedbackCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const schoolPartnersCollection = await getDocs(collection(firestore, "school_partners"));
        setSchoolPartners(schoolPartnersCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const volunteersCollection = await getDocs(collection(firestore, "volunteers"));
        setVolunteers(volunteersCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [isAdmin]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  if (!isAdmin) {
    return <p>Checking admin status...</p>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>

      {loading ? <p>Loading data...</p> : (
        <>
          <h3>Registered Users</h3>
          <table border="1">
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>User Feedback</h3>
          <table border="1">
            <thead>
              <tr>
                <th>User</th>
                <th>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {feedback.map(item => (
                <tr key={item.id}>
                  <td>{item.userEmail}</td>
                  <td>{item.feedback}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>School Partnerships</h3>
          <table border="1">
            <thead>
              <tr>
                <th>School Name</th>
                <th>Contact Email</th>
              </tr>
            </thead>
            <tbody>
              {schoolPartners.map(item => (
                <tr key={item.id}>
                  <td>{item.schoolName}</td>
                  <td>{item.contactEmail}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Volunteers</h3>
          <table border="1">
            <thead>
              <tr>
                <th>Volunteer Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {volunteers.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
