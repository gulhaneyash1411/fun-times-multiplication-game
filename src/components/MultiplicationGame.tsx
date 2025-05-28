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
    const maxNum = Math.min(currentLevel + 1, 5); // Gradually increase difficulty
    let num1, num2, questionKey;
    
    // Generate unique questions for this level
    do {
      num1 = Math.floor(Math.random() * maxNum) + 1;
      num2 = Math.floor(Math.random() * maxNum) + 1;
      questionKey = `${num1}-${num2}-${currentLevel}`;
    } while (usedQuestions.has(questionKey));
    
    setUsedQuestions(prev => new Set(prev).add(questionKey));
    
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
    setUsedQuestions(new Set()); // Reset used questions for new level
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 relative overflow-hidden">
        {/* Floating jungle elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 text-6xl animate-bounce" style={{ animationDelay: '0s' }}>🌴</div>
          <div className="absolute top-20 right-20 text-5xl animate-bounce" style={{ animationDelay: '0.5s' }}>🦜</div>
          <div className="absolute bottom-20 left-20 text-4xl animate-bounce" style={{ animationDelay: '1s' }}>🐒</div>
          <div className="absolute bottom-32 right-32 text-5xl animate-bounce" style={{ animationDelay: '1.5s' }}>🦋</div>
          <div className="absolute top-1/2 left-5 text-3xl animate-pulse">🌺</div>
          <div className="absolute top-1/3 right-10 text-4xl animate-pulse">🌿</div>
        </div>
        
        <div className="text-center bg-white rounded-3xl p-8 shadow-2xl max-w-md mx-4 border-4 border-yellow-300 relative z-10">
          <div className="text-8xl mb-4 animate-bounce">🐵</div>
          <h1 className="text-5xl font-bold text-emerald-700 mb-4 font-comic">Jungle Math Adventure!</h1>
          <p className="text-xl text-gray-700 mb-6 font-medium">Help the jungle animals solve multiplication problems and collect bananas!</p>
          <div className="flex justify-center gap-2 mb-6">
            <span className="text-3xl animate-spin" style={{ animationDuration: '3s' }}>🍌</span>
            <span className="text-3xl animate-spin" style={{ animationDuration: '3s', animationDelay: '0.5s' }}>🥥</span>
            <span className="text-3xl animate-spin" style={{ animationDuration: '3s', animationDelay: '1s' }}>🍌</span>
          </div>
          <Button 
            onClick={startGame}
            className="bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 text-white text-xl px-8 py-4 rounded-full transform transition hover:scale-110 shadow-lg border-4 border-white font-bold"
          >
            Start Adventure! 🌟
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 p-4 relative overflow-hidden">
      {/* Floating jungle elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-5 left-5 text-4xl animate-bounce" style={{ animationDelay: '0s' }}>🌴</div>
        <div className="absolute top-10 right-10 text-3xl animate-bounce" style={{ animationDelay: '0.5s' }}>🦜</div>
        <div className="absolute bottom-10 left-10 text-3xl animate-bounce" style={{ animationDelay: '1s' }}>🐸</div>
        <div className="absolute bottom-20 right-20 text-4xl animate-bounce" style={{ animationDelay: '1.5s' }}>🦋</div>
        <div className="absolute top-1/2 left-3 text-2xl animate-pulse">🌺</div>
        <div className="absolute top-1/3 right-5 text-3xl animate-pulse">🌿</div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6 relative z-10">
        <ScoreBoard score={score} level={currentLevel} />
        <Button
          variant="ghost"
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="text-white hover:bg-white/20 border-2 border-white rounded-full p-3"
        >
          <Volume2 className={`h-6 w-6 ${soundEnabled ? 'text-white' : 'text-gray-400'}`} />
        </Button>
      </div>

      {/* Game Content */}
      {currentQuestion && (
        <div className="max-w-4xl mx-auto relative z-10">
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
        onClose={() => setShowFeedback(false)}
      />
      
      <CelebrationModal 
        isOpen={showCelebration}
        level={currentLevel}
        score={score}
        onNextLevel={nextLevel}
        onClose={() => setShowCelebration(false)}
      />
    </div>
  );
};

export default MultiplicationGame;
