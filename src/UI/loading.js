import React from 'react';

const Loader = ({ loading }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      {loading && (
        <div style={spinnerWrapperStyle}>
          <div style={spinnerStyle}></div>
        </div>
      )}
    </div>
  );
};

// Styles for the spinner and animation
const spinnerWrapperStyle = {
  position: 'relative',
  width: '50px',
  height: '50px',
};

const spinnerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  border: '6px solid transparent',
  borderTopColor: '#FF5733', // Red color for top part
  borderRightColor: '#4CAF50', // Green color for right part
  borderBottomColor: '#2196F3', // Blue color for bottom part
  borderLeftColor: '#FFEB3B', // Yellow color for left part
  animation: 'spin 1.5s linear infinite', // Animation for spinning
};

const spinnerAnimation = `
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`;

// Inject the keyframe animation to the page
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(spinnerAnimation, styleSheet.cssRules.length);

export default Loader;
