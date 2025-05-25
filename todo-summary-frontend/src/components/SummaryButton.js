import React, { useState } from 'react';
import { summarizeTodos } from '../services/api';

const SummaryButton = () => {
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await summarizeTodos();
      setMessage(response.data);
      setIsError(false);
    } catch (error) {
      setMessage(error.response?.data || 'Failed to send summary to Slack');
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="summary-section">
      <button
        onClick={handleSummarize}
        className="summary-button"
        disabled={loading}
      >
        {loading ? 'Sending Summary...' : 'Generate and Send Summary to Slack'}
      </button>
      
      {loading && (
        <div className="loader" style={{ marginTop: '10px' }}>
          Loading...
        </div>
      )}

      {message && (
        <div className={`message ${isError ? 'error' : 'success'}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default SummaryButton;
