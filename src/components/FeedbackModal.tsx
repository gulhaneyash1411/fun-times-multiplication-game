
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface FeedbackModalProps {
  isOpen: boolean;
  isCorrect: boolean;
  onNext: () => void;
}

const FeedbackModal = ({ isOpen, isCorrect, onNext }: FeedbackModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-md mx-auto bg-white rounded-3xl border-0 shadow-2xl">
        <div className="text-center p-6">
          {isCorrect ? (
            <>
              <div className="text-8xl mb-4 animate-bounce">🎉</div>
              <h2 className="text-3xl font-bold text-green-600 mb-4">Fantastic!</h2>
              <p className="text-lg text-gray-600 mb-6">You got it right! Well done!</p>
              <div className="flex justify-center gap-2 mb-4">
                <span className="text-2xl animate-pulse">⭐</span>
                <span className="text-2xl animate-pulse" style={{ animationDelay: '0.2s' }}>⭐</span>
                <span className="text-2xl animate-pulse" style={{ animationDelay: '0.4s' }}>⭐</span>
              </div>
            </>
          ) : (
            <>
              <div className="text-8xl mb-4 animate-bounce">🤔</div>
              <h2 className="text-3xl font-bold text-orange-600 mb-4">Oops!</h2>
              <p className="text-lg text-gray-600 mb-6">That's not quite right. Try again!</p>
              <div className="text-2xl mb-4">💪</div>
            </>
          )}
          
          <Button
            onClick={onNext}
            className={`${
              isCorrect 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-orange-500 hover:bg-orange-600'
            } text-white px-8 py-3 rounded-full text-lg transform transition hover:scale-105`}
          >
            {isCorrect ? 'Next Question! 🚀' : 'Try Again! 💪'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;
