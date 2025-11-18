import { useState } from 'react';

export default function TestPage() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testAPI = async () => {
    setLoading(true);
    setResult('Loading...');
    
    try {
      const response = await fetch('/api/contract/0xdAC17F958D2ee523a2206206994597C13D831ec7');
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      setResult('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', background: '#1a1a1a', color: 'white', minHeight: '100vh' }}>
      <h1>API Test Page</h1>
      <button 
        onClick={testAPI} 
        disabled={loading}
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        Test API
      </button>
      <pre style={{ marginTop: '20px', background: '#2a2a2a', padding: '20px', overflow: 'auto' }}>
        {result}
      </pre>
    </div>
  );
}