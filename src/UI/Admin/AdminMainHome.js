import React from 'react';
import Sidebar from './Adminhome';

export default function AdminMainHome() {
  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div style={{ flex: 1, padding: '30px', backgroundColor: '#f8f9fa', overflowY: 'auto' }}>
        <h1 style={{ textAlign: 'center', color: '#343a40', marginBottom: '20px' }}>
          Welcome to Admin ERP Dashboard
        </h1>
        <p style={{ textAlign: 'center', color: '#6c757d', fontSize: '1.2rem', marginBottom: '40px' }}>
          Manage and oversee operations effectively from this centralized dashboard.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img
            src="https://t4.ftcdn.net/jpg/04/56/87/41/240_F_456874124_HJ5vNIZEWSgKnCii6uxYuuYYSRJHNK9d.jpg"
            alt="ERP Dashboard"
            style={{
                marginRight: "5%",
                paddingLeft: "18%",
              width: '100%',          // Ensure the image covers the full width of the container
              height: '100%',         // Make the image height fill the container
              objectFit: 'cover',     // Scale the image while maintaining its aspect ratio
              borderRadius: '15px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
