
import React from 'react';

interface ScoreBoardProps {
  score: number;
  level: number;
}

const ScoreBoard = ({ score, level }: ScoreBoardProps) => {
  return (
    <div className="bg-gradient-to-br from-white to-yellow-100 rounded-3xl p-6 shadow-2xl border-4 border-yellow-300">
      <div className="flex items-center gap-8">
        <div className="text-center">
          <div className="text-3xl font-bold text-emerald-700 bg-emerald-100 rounded-full px-4 py-2 border-2 border-emerald-300">
            {score}
          </div>
          <div className="text-sm text-gray-600 font-bold mt-1">🍌 Bananas</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-700 bg-blue-100 rounded-full px-4 py-2 border-2 border-blue-300">
            {level}
          </div>
          <div className="text-sm text-gray-600 font-bold mt-1">🌴 Level</div>
        </div>
        <div className="text-5xl animate-bounce">🏆</div>
      </div>
    </div>
  );
};

export default ScoreBoard;
