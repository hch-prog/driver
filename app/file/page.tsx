'use client'

import React, { useState } from 'react';

const FileViewer = ({ fileUrl }: { fileUrl: string }) => {
  return (
    <div className="file-viewer">
      <h2>File Preview</h2>
      {fileUrl.endsWith('.pdf') ? (
        <iframe src={fileUrl} title="File Preview" width="100%" height="600px"></iframe>
      ) : (
        <img src={fileUrl} alt="File Preview" style={{ maxWidth: '100%', height: 'auto' }} />
      )}
    </div>
  );
};

export default function App() {
  const [fileId, setFileId] = useState('');
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const handleFetchFile = () => {
    if (fileId) {
      const baseUrl = process.env.NEXT_PUBLIC_CLOUDFLARE_BASE_URL;
      if (!baseUrl) {
        alert("Base URL is not define");
        return;
      }
      const url = `${baseUrl}/get-file/${fileId}`;
      setFileUrl(url);
      window.open(url, '_blank');
    } else {
      alert('Please enter a file ID.');
    }
  };

  return (
    <div className="App">
      <h1>Dynamic File Viewer</h1>
      <div>
        <label>
          Enter File ID:
          <input
            type="text"
            value={fileId}
            onChange={(e) => setFileId(e.target.value)}
            placeholder="Enter File ID"
            style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
          />
        </label>
        <button onClick={handleFetchFile} style={{ marginLeft: '10px', padding: '5px 10px' }}>
          Fetch File
        </button>
      </div>

      {fileUrl && (
        <div style={{ marginTop: '20px' }}>
          <FileViewer fileUrl={fileUrl} />
        </div>
      )}
    </div>
  );
}
