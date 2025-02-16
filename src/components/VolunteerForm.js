import React, { useState } from 'react';
import { auth, firestore } from '../firebase';
import { Link } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';

const VolunteerForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [availability, setAvailability] = useState('');
  const [success, setSuccess] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(firestore, "volunteers"), {
        name,
        email,
        availability,
        message,
        timestamp: new Date()
      });
      setSuccess('Thank you for signing up as a volunteer!');
      setName('');
      setEmail('');
      setAvailability('');
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  };

  return (
    <div>
      <h2>Volunteer Sign-Up</h2>
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <textarea placeholder="Availability" value={availability} onChange={(e) => setAvailability(e.target.value)} required />
        <textarea placeholder="Any additional information?" value={message} onChange={(e) => setMessage(e.target.value)} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default VolunteerForm;

