
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface FeedbackModalProps {
  isOpen: boolean;
  isCorrect: boolean;
  onNext: () => void;
  onClose: () => void;
}

const FeedbackModal = ({ isOpen, isCorrect, onNext, onClose }: FeedbackModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-gradient-to-br from-white to-yellow-50 rounded-3xl border-4 border-yellow-300 shadow-2xl">
        <div className="text-center p-8">
          {isCorrect ? (
            <>
              <div className="text-9xl mb-6 animate-bounce">🎉</div>
              <h2 className="text-4xl font-bold text-emerald-600 mb-4 font-comic">Amazing!</h2>
              <p className="text-xl text-gray-700 mb-6 font-medium">You're a jungle math hero! 🦸‍♀️</p>
              <div className="flex justify-center gap-3 mb-6">
                <span className="text-4xl animate-spin" style={{ animationDuration: '2s' }}>⭐</span>
                <span className="text-4xl animate-spin" style={{ animationDuration: '2s', animationDelay: '0.3s' }}>⭐</span>
                <span className="text-4xl animate-spin" style={{ animationDuration: '2s', animationDelay: '0.6s' }}>⭐</span>
              </div>
              <div className="flex justify-center gap-2 mb-6">
                <span className="text-3xl animate-bounce" style={{ animationDelay: '0s' }}>🍌</span>
                <span className="text-3xl animate-bounce" style={{ animationDelay: '0.2s' }}>🍌</span>
                <span className="text-3xl animate-bounce" style={{ animationDelay: '0.4s' }}>🍌</span>
              </div>
            </>
          ) : (
            <>
              <div className="text-9xl mb-6 animate-bounce">🤔</div>
              <h2 className="text-4xl font-bold text-orange-600 mb-4 font-comic">Oops!</h2>
              <p className="text-xl text-gray-700 mb-6 font-medium">Don't worry! Even jungle explorers make mistakes! 🌿</p>
              <div className="text-5xl mb-6 animate-pulse">💪</div>
            </>
          )}
          
          <Button
            onClick={onNext}
            className={`${
              isCorrect 
                ? 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600' 
                : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
            } text-white px-8 py-4 rounded-full text-xl font-bold transform transition hover:scale-110 shadow-lg border-4 border-white`}
          >
            {isCorrect ? 'Next Adventure! 🚀' : 'Try Again! 💪'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;
