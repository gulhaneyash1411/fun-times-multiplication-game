
import React from 'react';
import { Button } from '@/components/ui/button';

interface AnswerOptionsProps {
  options: number[];
  onAnswer: (answer: number) => void;
}

const AnswerOptions = ({ options, onAnswer }: AnswerOptionsProps) => {
  const animals = ['🦜', '🐸', '🦋', '🐛'];
  const colors = [
    'from-red-400 to-pink-400 border-red-300',
    'from-blue-400 to-cyan-400 border-blue-300', 
    'from-green-400 to-emerald-400 border-green-300',
    'from-purple-400 to-violet-400 border-purple-300'
  ];
  
  return (
    <div className="grid grid-cols-2 gap-8 max-w-3xl mx-auto">
      {options.map((option, index) => (
        <Button
          key={index}
          onClick={() => onAnswer(option)}
          className={`bg-gradient-to-br ${colors[index]} hover:scale-110 text-white border-4 rounded-3xl p-8 h-auto transform transition-all duration-200 active:scale-95 shadow-2xl hover:shadow-3xl`}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="text-8xl animate-bounce hover:animate-spin transition-all" style={{ animationDelay: `${index * 0.1}s` }}>
              {animals[index]}
            </div>
            <div className="text-4xl font-bold bg-white text-gray-800 rounded-full px-6 py-3 shadow-lg border-2 border-gray-200">
              {option}
            </div>
          </div>
        </Button>
      ))}
    </div>
  );
};

export default AnswerOptions;
