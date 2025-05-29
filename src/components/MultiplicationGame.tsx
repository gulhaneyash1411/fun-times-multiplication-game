import React, { useState, useEffect } from 'react';
import QuestionDisplay from './QuestionDisplay';
import AnswerOptions from './AnswerOptions';
import ScoreBoard from './ScoreBoard';
import CelebrationModal from './CelebrationModal';
import FeedbackModal from './FeedbackModal';
import { Button } from '@/components/ui/button';
import { Volume2 } from 'lucide-react';

interface Question {
  num1: number;
  num2: number;
  answer: number;
  options: number[];
}

const MultiplicationGame = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [usedQuestions, setUsedQuestions] = useState<Set<string>>(new Set());

  const generateQuestion = () => {
    const maxNum = Math.min(currentLevel + 1, 5);
    let num1, num2, questionKey;
    
    do {
      num1 = Math.floor(Math.random() * maxNum) + 1;
      num2 = Math.floor(Math.random() * maxNum) + 1;
      questionKey = `${num1}-${num2}`;
    } while (usedQuestions.has(questionKey) && usedQuestions.size < maxNum * maxNum);
    
    setUsedQuestions(prev => new Set(prev).add(questionKey));
    
    const answer = num1 * num2;
    const options = [answer];
    while (options.length < 4) {
      const wrongAnswer = Math.floor(Math.random() * 20) + 1;
      if (!options.includes(wrongAnswer)) {
        options.push(wrongAnswer);
      }
    }
    
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    
    setCurrentQuestion({ num1, num2, answer, options });
  };

  const handleAnswer = (selectedAnswer: number) => {
    if (!currentQuestion) return;
    
    const correct = selectedAnswer === currentQuestion.answer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 10);
      playSound('correct');
    } else {
      playSound('incorrect');
    }
    
    setShowFeedback(true);
    setQuestionsAnswered(questionsAnswered + 1);
  };

  const playSound = (type: 'correct' | 'incorrect' | 'celebration') => {
    if (!soundEnabled) return;
    
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    if (type === 'correct') {
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2);
    } else if (type === 'incorrect') {
      oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(196, audioContext.currentTime + 0.2);
    } else {
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2);
      oscillator.frequency.setValueAtTime(1046.5, audioContext.currentTime + 0.3);
    }
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const nextQuestion = () => {
    setShowFeedback(false);
    
    if (questionsAnswered >= 5) {
      setShowCelebration(true);
      playSound('celebration');
    } else {
      generateQuestion();
    }
  };

  const nextLevel = () => {
    setCurrentLevel(currentLevel + 1);
    setQuestionsAnswered(0);
    setUsedQuestions(new Set());
    setShowCelebration(false);
    generateQuestion();
  };

  const startGame = () => {
    setGameStarted(true);
    generateQuestion();
  };

  useEffect(() => {
    if (gameStarted && !currentQuestion) {
      generateQuestion();
    }
  }, [gameStarted]);

  if (!gameStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl max-w-md mx-4 border-4 border-yellow-300">
          <div className="text-6xl mb-4 animate-bounce">🐵</div>
          <h1 className="text-4xl font-bold text-green-700 mb-4">Jungle Math Adventure!</h1>
          <p className="text-lg text-gray-600 mb-6">Help the jungle animals solve multiplication problems!</p>
          <Button 
            onClick={startGame}
            className="bg-green-500 hover:bg-green-600 text-white text-xl px-8 py-4 rounded-full transform transition hover:scale-105"
          >
            Start Adventure! 🌟
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <ScoreBoard score={score} level={currentLevel} />
        <Button
          variant="ghost"
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="text-white hover:bg-white/20 bg-white/10 backdrop-blur-sm"
        >
          <Volume2 className={`h-6 w-6 ${soundEnabled ? 'text-white' : 'text-gray-400'}`} />
        </Button>
      </div>

      {/* Game Content */}
      {currentQuestion && (
        <div className="max-w-4xl mx-auto">
          <QuestionDisplay 
            num1={currentQuestion.num1} 
            num2={currentQuestion.num2} 
          />
          <AnswerOptions 
            options={currentQuestion.options}
            onAnswer={handleAnswer}
          />
        </div>
      )}

      {/* Modals */}
      <FeedbackModal 
        isOpen={showFeedback}
        isCorrect={isCorrect}
        onNext={nextQuestion}
      />
      
      <CelebrationModal 
        isOpen={showCelebration}
        level={currentLevel}
        score={score}
        onNextLevel={nextLevel}
      />
    </div>
  );
};

export default MultiplicationGame;
