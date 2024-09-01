'use client'
import React, { useState } from 'react';

const FileUploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !name || !email || !password) {
      alert('Please fill in all fields and select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);

    try {
      const uploadUrl = process.env.NEXT_PUBLIC_CLOUDFLARE_UPLOAD_URL;
      if (!uploadUrl) {
        throw new Error("Upload URL is not defined in the environment variables");
      }

      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.text();
        setUploadStatus(`Upload successful! File URL: ${data}`);
      } else {
        setUploadStatus('Upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during upload:', error);
      setUploadStatus('An error occurred during the upload.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black p-4">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Upload a File and User Data</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">File</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-1 p-2 w-full border rounded"
            accept="application/pdf,image/*"
          />
        </div>

        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
        >
          Upload
        </button>

        {uploadStatus && (
          <div className="mt-4 p-4 bg-gray-200 rounded">
            <p>{uploadStatus}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadForm;
