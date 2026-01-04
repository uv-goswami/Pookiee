import React from 'react';

const SummaryContainer = ({ answers }) => {
  return (
    <div>
      <p>Thank you for answering! Here's a summary of your responses:</p>
      <ul>
        {Object.entries(answers).map(([key, value]) => (
          <li key={key}>
            {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}: {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SummaryContainer;
