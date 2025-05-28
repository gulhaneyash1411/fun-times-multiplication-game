
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface CelebrationModalProps {
  isOpen: boolean;
  level: number;
  score: number;
  onNextLevel: () => void;
}

const CelebrationModal = ({ isOpen, level, score, onNextLevel }: CelebrationModalProps) => {
  const celebrationEmojis = ['🎊', '🎉', '🌟', '🏆', '🎈', '🎯'];
  
  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-lg mx-auto bg-gradient-to-b from-yellow-300 to-orange-300 rounded-3xl border-0 shadow-2xl">
        <div className="text-center p-8">
          <div className="flex justify-center gap-2 mb-6">
            {celebrationEmojis.map((emoji, index) => (
              <span 
                key={index}
                className="text-4xl animate-bounce"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {emoji}
              </span>
            ))}
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            Level {level} Complete!
          </h2>
          
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
            <p className="text-2xl font-bold text-gray-700 mb-2">Amazing Work!</p>
            <p className="text-lg text-gray-600">You scored {score} points!</p>
          </div>
          
          <div className="flex justify-center gap-4 mb-6">
            <div className="bg-white rounded-full p-4 shadow-lg animate-spin-slow">
              <span className="text-3xl">🏆</span>
            </div>
            <div className="bg-white rounded-full p-4 shadow-lg animate-bounce">
              <span className="text-3xl">⭐</span>
            </div>
            <div className="bg-white rounded-full p-4 shadow-lg animate-pulse">
              <span className="text-3xl">🎯</span>
            </div>
          </div>
          
          <Button
            onClick={onNextLevel}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-xl font-bold transform transition hover:scale-105 shadow-lg"
          >
            Continue to Level {level + 1}! 🚀
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CelebrationModal;
