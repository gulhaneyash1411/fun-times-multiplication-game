
import React from 'react';

interface QuestionDisplayProps {
  num1: number;
  num2: number;
}

const QuestionDisplay = ({ num1, num2 }: QuestionDisplayProps) => {
  const renderAnimals = (count: number, emoji: string, side: 'left' | 'right') => {
    return Array.from({ length: count }, (_, i) => (
      <div 
        key={i} 
        className={`text-4xl animate-bounce`}
        style={{
          animationDelay: `${i * 0.2}s`,
          animationDuration: '2s'
        }}
      >
        {emoji}
      </div>
    ));
  };

  return (
    <div className="bg-gradient-to-br from-white to-yellow-50 rounded-3xl p-8 shadow-2xl mb-8 mx-auto max-w-3xl border-4 border-yellow-300">
      <h2 className="text-3xl font-bold text-center mb-8 text-emerald-700">
        What is {num1} × {num2} ?
      </h2>
      
      <div className="flex items-center justify-center gap-8 mb-6">
        {/* Left group */}
        <div className="bg-gradient-to-br from-green-200 to-emerald-200 rounded-2xl p-6 min-w-32 border-4 border-green-300">
          <div className="grid grid-cols-2 gap-4 justify-items-center">
            {renderAnimals(num1, '🐵', 'left')}
          </div>
          <p className="text-center mt-4 font-bold text-emerald-700">{num1} monkeys</p>
        </div>
        
        {/* Multiplication sign */}
        <div className="text-6xl font-bold text-emerald-600 animate-pulse">×</div>
        
        {/* Right group */}
        <div className="bg-gradient-to-br from-yellow-200 to-orange-200 rounded-2xl p-6 min-w-32 border-4 border-yellow-300">
          <div className="grid grid-cols-2 gap-4 justify-items-center">
            {renderAnimals(num2, '🍌', 'right')}
          </div>
          <p className="text-center mt-4 font-bold text-orange-700">{num2} bananas each</p>
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-lg text-gray-700 font-semibold">How many bananas in total? 🤔</p>
      </div>
    </div>
  );
};

export default QuestionDisplay;
