
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

  const generateQuestion = () => {
    const maxNum = Math.min(currentLevel + 1, 5); // Gradually increase difficulty
    const num1 = Math.floor(Math.random() * maxNum) + 1;
    const num2 = Math.floor(Math.random() * maxNum) + 1;
    const answer = num1 * num2;
    
    const options = [answer];
    while (options.length < 4) {
      const wrongAnswer = Math.floor(Math.random() * 20) + 1;
      if (!options.includes(wrongAnswer)) {
        options.push(wrongAnswer);
      }
    }
    
    // Shuffle options
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
    
    // Create audio context for sound effects
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    if (type === 'correct') {
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
      oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
      oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
    } else if (type === 'incorrect') {
      oscillator.frequency.setValueAtTime(220, audioContext.currentTime); // A3
      oscillator.frequency.setValueAtTime(196, audioContext.currentTime + 0.2); // G3
    } else {
      // Celebration sound
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-400 via-teal-300 to-blue-400">
        <div className="text-center bg-white rounded-3xl p-8 shadow-2xl max-w-md mx-4 border-4 border-yellow-300">
          <div className="text-6xl mb-4 animate-bounce">🐵</div>
          <h1 className="text-4xl font-bold text-emerald-700 mb-4">Jungle Math Adventure!</h1>
          <p className="text-lg text-gray-700 mb-6">Help the jungle animals solve multiplication problems!</p>
          <div className="flex justify-center gap-2 mb-6">
            <span className="text-3xl animate-bounce">🌴</span>
            <span className="text-3xl animate-bounce" style={{ animationDelay: '0.2s' }}>🦋</span>
            <span className="text-3xl animate-bounce" style={{ animationDelay: '0.4s' }}>🐸</span>
          </div>
          <Button 
            onClick={startGame}
            className="bg-emerald-500 hover:bg-emerald-600 text-white text-xl px-8 py-4 rounded-full transform transition hover:scale-105 shadow-lg"
          >
            Start Adventure! 🌟
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-300 to-blue-400 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <ScoreBoard score={score} level={currentLevel} />
        <Button
          variant="ghost"
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="text-white hover:bg-white/20 rounded-full p-3"
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
