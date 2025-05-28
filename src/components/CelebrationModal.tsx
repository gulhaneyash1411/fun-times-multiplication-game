
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface CelebrationModalProps {
  isOpen: boolean;
  level: number;
  score: number;
  onNextLevel: () => void;
  onClose: () => void;
}

const CelebrationModal = ({ isOpen, level, score, onNextLevel, onClose }: CelebrationModalProps) => {
  const celebrationEmojis = ['🎊', '🎉', '🌟', '🏆', '🎈', '🎯', '🦜', '🐒', '🍌', '🌴'];
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg mx-auto bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 rounded-3xl border-4 border-white shadow-2xl">
        <div className="text-center p-8">
          <div className="flex justify-center gap-3 mb-8 flex-wrap">
            {celebrationEmojis.map((emoji, index) => (
              <span 
                key={index}
                className="text-5xl animate-bounce"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {emoji}
              </span>
            ))}
          </div>
          
          <h2 className="text-5xl font-bold text-white mb-6 drop-shadow-lg font-comic">
            Level {level} Complete! 🏆
          </h2>
          
          <div className="bg-gradient-to-br from-white to-yellow-100 rounded-3xl p-8 mb-8 shadow-xl border-4 border-yellow-300">
            <p className="text-3xl font-bold text-emerald-700 mb-3">Jungle Champion! 🦸‍♀️</p>
            <p className="text-2xl text-gray-700 font-bold">You collected {score} bananas! 🍌</p>
            <div className="flex justify-center gap-2 mt-4">
              {Array.from({ length: Math.min(5, Math.floor(score / 10)) }, (_, i) => (
                <span key={i} className="text-3xl animate-spin" style={{ animationDuration: '3s', animationDelay: `${i * 0.2}s` }}>🍌</span>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center gap-6 mb-8">
            <div className="bg-gradient-to-br from-emerald-100 to-green-200 rounded-full p-6 shadow-xl border-4 border-emerald-300 animate-bounce">
              <span className="text-4xl">🏆</span>
            </div>
            <div className="bg-gradient-to-br from-yellow-100 to-orange-200 rounded-full p-6 shadow-xl border-4 border-yellow-300 animate-bounce" style={{ animationDelay: '0.2s' }}>
              <span className="text-4xl">⭐</span>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-pink-200 rounded-full p-6 shadow-xl border-4 border-purple-300 animate-bounce" style={{ animationDelay: '0.4s' }}>
              <span className="text-4xl">🎯</span>
            </div>
          </div>
          
          <Button
            onClick={onNextLevel}
            className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-10 py-5 rounded-full text-2xl font-bold transform transition hover:scale-110 shadow-xl border-4 border-white"
          >
            Next Jungle Level {level + 1}! 🚀
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CelebrationModal;
