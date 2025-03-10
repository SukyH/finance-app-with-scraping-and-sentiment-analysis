import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CuratedInfoPage = () => {
  const [financialNews, setFinancialNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://t4fr7o4ks7.execute-api.us-east-2.amazonaws.com/analyze')
      .then(response => {
        setFinancialNews(response.data);  
        setLoading(false);
      })
      .catch(err => {
        console.error("API Error:", err);  
        setError('Error fetching financial news');
        setLoading(false);
      });
  }, []);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Financial Literacy Resources</h2>
      <p>Here, you will find curated articles, videos, and other resources to help you improve your financial knowledge.</p>

      <div>
        <h3>Latest Financial News</h3>
        {financialNews.length > 0 ? (
          <ul>
            {financialNews.map((article, index) => (
              <li key={index}>
                <a href={article.link} target="_blank" rel="noopener noreferrer">{article.title}</a>
                <p>Published on: {article.published_date}</p>
                <p>Sentiment: {article.sentiment.compound > 0 ? 'Positive' : article.sentiment.compound < 0 ? 'Negative' : 'Neutral'}</p>
                {/* Display image with responsive style */}
                <img 
                  src={article.image_url} 
                  alt={article.title} 
                  style={{ width: '100%', maxWidth: '400px', height: 'auto', marginBottom: '20px' }} 
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>No news available.</p>
        )}
      </div>
    </div>
  );
};

export default CuratedInfoPage;
