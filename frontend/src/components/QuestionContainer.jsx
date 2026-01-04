import React from 'react';

const QuestionContainer = ({ step, questions, answers, onNext, onAnswerChange }) => {
  const currentQuestion = questions[step - 1]; 

  const handleInputChange = (event) => {
    const { value } = event.target;
    onAnswerChange({ [currentQuestion.key]: value }); 
  };

  return (
    <div
      style={{
        textAlign: 'center',
        margin: '20px auto',
        padding: '30px 20px', 
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        width: '80%',
        maxWidth: '500px', 
      }}
    >
      <h2 style={{ color: '#333', marginBottom: '20px' }}>{currentQuestion.question}</h2>
      <input
        type="text"
        value={answers[currentQuestion.key]}
        onChange={handleInputChange}
        placeholder={currentQuestion.placeholder}
        style={{
          width: '90%', 
          padding: '12px',
          margin: '0 auto 20px auto', 
          border: '2px solid #ff9a9e',
          borderRadius: '5px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          fontSize: '1rem',
        }}
      />
      <button
        onClick={onNext}
        style={{
          padding: '10px 20px',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          color: '#fff',
          backgroundColor: '#6fbae7',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        Next
      </button>
    </div>
  );
};

export default QuestionContainer;
