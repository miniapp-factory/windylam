"use client";

import { useState } from "react";
import QuizResult from "./quiz-result";

const shuffle = (array: any[]) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const questions = [
  {
    question: "What is your favorite activity?",
    options: [
      { text: "Chasing mice", animal: "cat" },
      { text: "Playing fetch", animal: "dog" },
      { text: "Hunting in the woods", animal: "fox" },
      { text: "Nibbling on seeds", animal: "hamster" },
      { text: "Galloping in fields", animal: "horse" },
    ],
  },
  {
    question: "Which environment do you prefer?",
    options: [
      { text: "Cozy indoors", animal: "cat" },
      { text: "Open parks", animal: "dog" },
      { text: "Forest trails", animal: "fox" },
      { text: "Small cages", animal: "hamster" },
      { text: "Wide open pastures", animal: "horse" },
    ],
  },
  {
    question: "What’s your energy level?",
    options: [
      { text: "Low and relaxed", animal: "cat" },
      { text: "High and playful", animal: "dog" },
      { text: "Stealthy and curious", animal: "fox" },
      { text: "Tiny but energetic", animal: "hamster" },
      { text: "Strong and steady", animal: "horse" },
    ],
  },
  {
    question: "How do you handle social situations?",
    options: [
      { text: "Independent", animal: "cat" },
      { text: "Friendly", animal: "dog" },
      { text: "Mysterious", animal: "fox" },
      { text: "Quiet but observant", animal: "hamster" },
      { text: "Loyal", animal: "horse" },
    ],
  },
  {
    question: "What’s your favorite snack?",
    options: [
      { text: "Fish", animal: "cat" },
      { text: "Bones", animal: "dog" },
      { text: "Berries", animal: "fox" },
      { text: "Seeds", animal: "hamster" },
      { text: "Hay", animal: "horse" },
    ],
  },
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({
    cat: 0,
    dog: 0,
    fox: 0,
    hamster: 0,
    horse: 0,
  });
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (animal: string) => {
    setScores((prev) => ({ ...prev, [animal]: prev[animal] + 1 }));
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrent(0);
    setScores({
      cat: 0,
      dog: 0,
      fox: 0,
      hamster: 0,
      horse: 0,
    });
    setShowResult(false);
  };

  if (showResult) {
    const maxAnimal = Object.entries(scores).reduce((a, b) =>
      a[1] >= b[1] ? a : b
    )[0];
    return <QuizResult animal={maxAnimal} onRetake={resetQuiz} />;
  }

  const { question, options } = questions[current];
  const shuffledOptions = shuffle(options);

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl">{question}</h2>
      <div className="flex flex-col gap-2">
        {shuffledOptions.map((opt, idx) => (
          <button
            key={idx}
            className="px-4 py-2 bg-primary text-primary-foreground rounded"
            onClick={() => handleAnswer(opt.animal)}
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
}
