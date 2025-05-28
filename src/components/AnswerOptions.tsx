
import React from 'react';
import { Button } from '@/components/ui/button';

interface AnswerOptionsProps {
  options: number[];
  onAnswer: (answer: number) => void;
}

const AnswerOptions = ({ options, onAnswer }: AnswerOptionsProps) => {
  const animals = ['🦜', '🐸', '🦋', '🐛'];
  
  return (
    <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
      {options.map((option, index) => (
        <Button
          key={index}
          onClick={() => onAnswer(option)}
          className="bg-gradient-to-br from-white to-pink-50 hover:from-pink-100 hover:to-purple-100 text-gray-800 border-4 border-pink-300 hover:border-purple-400 rounded-2xl p-8 h-auto transform transition hover:scale-105 active:scale-95 shadow-lg"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="text-6xl animate-bounce" style={{ animationDelay: `${index * 0.1}s` }}>
              {animals[index]}
            </div>
            <div className="text-3xl font-bold text-purple-700">{option}</div>
          </div>
        </Button>
      ))}
    </div>
  );
};

export default AnswerOptions;
