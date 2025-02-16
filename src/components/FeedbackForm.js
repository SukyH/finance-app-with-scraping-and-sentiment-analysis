import React, { useState } from 'react';
import { firestore } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(firestore, "feedback"), {
        feedback,
        timestamp: new Date()
      });
      setSuccess("Thank you for providing us feedback!");
      setFeedback('');
    } catch (error) {
      console.error("Error submitting feedback: ", error);
    }
  };

  return (
    <div>
      <h2>Submit Feedback</h2>
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Your feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
