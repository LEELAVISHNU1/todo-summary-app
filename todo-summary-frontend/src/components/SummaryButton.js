import React, { useState } from 'react';
import { summarizeTodos } from '../services/api';

const SummaryButton = () => {
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const response = await summarizeTodos();
      alert(`✅ Success!\n\n${response.data}`);
    } catch (error) {
      alert(`❌ Error!\n\n${error.response?.data || 'Failed to send summary to Slack'}`);
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
        {loading ? 'Sending Summary...' : '📤 Generate & Send Summary to Slack'}
      </button>
    </div>
  );
};

export default SummaryButton;
