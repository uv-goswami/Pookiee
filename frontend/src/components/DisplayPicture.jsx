import React from 'react';
import dpImage from '../assets/images/dp.jpg'; 

const DisplayPicture = ({ onClick }) => {
  return (
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <img
        src={dpImage} 
        alt="Display Picture"
        onClick={onClick} 
        style={{
          borderRadius: '50%',
          cursor: 'pointer',
          width: '150px',
          height: '150px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        }}
      />
      <p>Click on the DP to reveal a confession...</p>
    </div>
  );
};

export default DisplayPicture;
