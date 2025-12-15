'use client';

import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [agentId, setAgentId] = useState('');

  useEffect(() => {
    const id = localStorage.getItem('agentId');
    if (!id) {
      window.location.href = '/login';
      return;
    }
    setAgentId(id);
  }, []);

  if (!agentId) return <div className="p-8 text-center">Loading...</div>;

  const embedCode = `<script src="https://aiestatedubai.com/widget.js" data-agent-id="${agentId}"></script>`;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Agent Dashboard</h1>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold mb-6">Your Chatbot Embed Code</h2>
          <p className="text-gray-600 mb-6">
            Copy and paste this code into your website (just before the closing <code className="bg-gray-200 px-2 rounded">&lt;/body&gt;</code> tag).
          </p>
          <pre className="bg-gray-900 text-green-400 p-6 rounded-lg overflow-x-auto text-sm">
            {embedCode}
          </pre>
          <button
            onClick={() => navigator.clipboard.writeText(embedCode)}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Copy to Clipboard
          </button>
        </div>

        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold mb-4">Live Preview</h2>
          <p className="text-gray-600 mb-6">Your chatbot will appear like this on your site:</p>
          <iframe
            src={`/widget?agentId=${agentId}`}
            className="w-full h-96 border rounded-lg"
            title="Preview"
          />
        </div>
      </div>
    </div>
  );
}