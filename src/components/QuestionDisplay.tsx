
import React from 'react';

interface QuestionDisplayProps {
  num1: number;
  num2: number;
}

const QuestionDisplay = ({ num1, num2 }: QuestionDisplayProps) => {
  const renderAnimals = (count: number, emoji: string) => {
    return Array.from({ length: count }, (_, i) => (
      <div 
        key={i} 
        className="text-5xl animate-bounce hover:scale-110 transition-transform cursor-pointer"
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
    <div className="bg-gradient-to-br from-white to-yellow-50 rounded-3xl p-8 shadow-2xl mb-8 mx-auto max-w-4xl border-4 border-yellow-300 relative">
      {/* Decorative corner elements */}
      <div className="absolute top-2 left-2 text-2xl animate-spin" style={{ animationDuration: '4s' }}>🌸</div>
      <div className="absolute top-2 right-2 text-2xl animate-spin" style={{ animationDuration: '4s', animationDelay: '1s' }}>🌸</div>
      
      <h2 className="text-4xl font-bold text-center mb-8 text-emerald-700 font-comic">
        What is {num1} × {num2}? 🤔
      </h2>
      
      <div className="flex items-center justify-center gap-12 mb-8">
        {/* Left group */}
        <div className="bg-gradient-to-br from-green-100 to-emerald-200 rounded-3xl p-8 min-w-48 border-4 border-green-300 shadow-lg transform hover:scale-105 transition-transform">
          <div className="grid grid-cols-2 gap-6 justify-items-center mb-4">
            {renderAnimals(num1, '🐵')}
          </div>
          <p className="text-center text-xl font-bold text-emerald-800 bg-white rounded-full py-2 px-4 shadow-md">
            {num1} Monkey{num1 !== 1 ? 's' : ''} 🐵
          </p>
        </div>
        
        {/* Multiplication sign */}
        <div className="flex flex-col items-center">
          <div className="text-8xl font-bold text-orange-500 animate-pulse mb-2">×</div>
          <div className="text-lg font-bold text-orange-600 bg-white rounded-full px-4 py-2 shadow-md">times</div>
        </div>
        
        {/* Right group */}
        <div className="bg-gradient-to-br from-yellow-100 to-orange-200 rounded-3xl p-8 min-w-48 border-4 border-yellow-300 shadow-lg transform hover:scale-105 transition-transform">
          <div className="grid grid-cols-2 gap-6 justify-items-center mb-4">
            {renderAnimals(num2, '🍌')}
          </div>
          <p className="text-center text-xl font-bold text-orange-800 bg-white rounded-full py-2 px-4 shadow-md">
            {num2} Banana{num2 !== 1 ? 's' : ''} each 🍌
          </p>
        </div>
      </div>
      
      <div className="text-center bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-4 border-2 border-purple-300">
        <p className="text-2xl text-purple-800 font-bold">How many bananas in total? 🤔</p>
        <div className="flex justify-center gap-2 mt-2">
          <span className="text-2xl animate-bounce" style={{ animationDelay: '0s' }}>🍌</span>
          <span className="text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>🍌</span>
          <span className="text-2xl animate-bounce" style={{ animationDelay: '0.4s' }}>🍌</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionDisplay;
