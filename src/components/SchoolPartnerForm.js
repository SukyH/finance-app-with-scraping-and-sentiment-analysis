import React, { useState } from 'react';
import { auth,firestore } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const SchoolPartnerForm = () => {
  const [schoolName, setSchoolName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(firestore, "school_partners"), {
        schoolName,
        contactEmail,
        message,
        timestamp: new Date()
      });
      setSuccess('Your request has been submitted!');
      setSchoolName('');
      setContactEmail('');
      setMessage('');
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  };

  return (
    <div>
      <h2>Become a School Partner</h2>
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="School Name" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} required />
        <input type="email" placeholder="Contact Email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} required />
        <textarea placeholder="Any additional information?" value={message} onChange={(e) => setMessage(e.target.value)} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SchoolPartnerForm;
