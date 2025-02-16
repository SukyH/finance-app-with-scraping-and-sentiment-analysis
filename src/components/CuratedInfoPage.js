import React from 'react';
import { Link } from 'react-router-dom';
import { auth, firestore } from '../firebase';



const CuratedInfoPage = () => {
  return (
    <div>
      <h2>Financial Literacy Resources</h2>
      <p>Here, you will find curated articles, videos, and other resources to help you improve your financial knowledge.</p>
    </div>
  );
};

export default CuratedInfoPage;
