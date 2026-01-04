import { useState } from 'react';

const useQuestions = () => {
  const questions = [
    { question: "What’s your nickname?", key: "userNickname", placeholder: "e.g., kittu, Bittu" }, 
    { question: "What’s your favorite color?", key: "favoriteColor", placeholder: "Pick a color" },
    { question: "What’s your hobby?", key: "hobby", placeholder: "e.g., Kalesh Karna, Dancing" },
    { question: "What’s your dream destination?", key: "dreamDestination", placeholder: "e.g., cold/warmer places" },
    { question: "What’s your favorite movie?", key: "favoriteMovie", placeholder: "......" },
    { question: "What’s your favorite food?", key: "favoriteFood", placeholder: "e.g., sweet/spicy" },
    { question: "What’s your favorite song?", key: "favoriteSong", placeholder: "e.g., Love Story" },
    { question: "What’s your most treasured memory?", key: "mostTreasuredMemory", placeholder: "Describe your memory" },
    { question: "Do you prefer cats, dogs, or neither?", key: "petPreference", placeholder: "e.g., Cats/Dogs" },
    { question: "What’s your favorite season?", key: "favoriteSeason", placeholder: "e.g., Winter, Summer" },
    { question: "What has been your happiest moment so far?", key: "happiestMoment", placeholder: "Describe your happiest moment" },
    { question: "What’s your dream job?", key: "dreamJob", placeholder: "e.g., CEO" },
    { question: "What’s your favorite time of day?", key: "favoriteTimeOfDay", placeholder: "e.g., Morning, Evening" },
    { question: "What’s your favorite sport?", key: "favoriteSport", placeholder: "e.g., BGMI, Ludo" },
    { question: "What does your ideal weekend look like?", key: "idealWeekend", placeholder: "Describe your weekend" },
    { question: "What’s your favorite animal?", key: "favoriteAnimal", placeholder: "e.g., Me or You" },
    { question: "What’s a quote that inspires you?", key: "favoriteQuote", placeholder: "Type your favorite quote" },
    { question: "What’s one item on your bucket list?", key: "bucketListItem", placeholder: "Describe your bucket list item" },
    { question: "What’s your favorite childhood game?", key: "favoriteChildhoodGame", placeholder: "e.g., Ghar Ghar" },
    { question: "What’s your mobile number?", key: "mobileNumber", placeholder: "e.g., 9876543210" },
    { question: "What nickname will you give me?", key: "givenNickname", placeholder: "e.g., timepass" },
  ];

  const [answers, setAnswers] = useState(
    Object.fromEntries(questions.map((q) => [q.key, ""]))
  );

  const handleAnswersChange = (newAnswer) =>
    setAnswers((prev) => ({ ...prev, ...newAnswer }));

  return { questions, answers, handleAnswersChange };
};

export default useQuestions;
